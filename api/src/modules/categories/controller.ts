import { Router } from 'express'
import { numberIdValidator } from '../../lib/validators'
import HttpStatus from '../../lib/enums/http-status'
import CategoriesPrismaRepository from './repository/categories-prisma.repository'
import CategoryService from './service'
import auth from '../../middlewares/auth'
import validateAdmin from '../../middlewares/validateAdmin'
import {
  CategoryResponseDto,
  createCategoryRequest,
  patchCategoryRequest
} from './model'
import media from '../../middlewares/media'
import getServerUrl from '../../lib/getServerUrl'

const router = Router()

export enum CategoriesRoute {
  PREFIX = '/category',
  ID = '/:id'
}

const repository = new CategoriesPrismaRepository()
const service = new CategoryService(repository)

router.get('/', async (req, res) => {
  const [error, serviceCategories] = await service.getAll()
  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ messge: 'Server error', error })

  const serverUrl = getServerUrl(req, false)
  const categories = serviceCategories!.map(x => ({
    ...x,
    imgUrls: x.imgUrls.map(y => `${serverUrl}${y}`)
  }))
  return res.status(HttpStatus.OK).json(categories)
})

router.get(CategoriesRoute.ID, async (req, res) => {
  const { id: categoryId } = req.params
  const resultId = await numberIdValidator.safeParseAsync(categoryId)
  if (!resultId.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request', error: resultId.error.errors })

  const [error, serviceCategory] = await service.getById(resultId.data)

  const serverUrl = getServerUrl(req, false)
  const category: CategoryResponseDto = {
    ...serviceCategory!,
    imgUrls: serviceCategory!.imgUrls.map(x => `${serverUrl}${x}`)
  }

  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error: (error as Error).message })

  return res.status(HttpStatus.OK).json(category)
})

router.post(
  '/',
  auth,
  validateAdmin,
  media('image', 'category'),
  async (req, res) => {
    const data = req.body
    const result = await createCategoryRequest.safeParseAsync(data)
    if (!result.success)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Bad request', error: result.error.errors })

    const [error, productCreated] = await service.create(result.data)
    if (error)
      return res
        .status(HttpStatus.SERVER_ERROR)
        .json({ message: 'Server error', error })

    return res.redirect(
      `/api/v1${CategoriesRoute.PREFIX}/${productCreated!.id}`
    )
  }
)

router.patch(
  CategoriesRoute.ID,
  auth,
  validateAdmin,
  media('image', 'category'),
  async (req, res) => {
    const { id: categoryId } = req.params
    const data = req.body

    const resultId = await numberIdValidator.safeParseAsync(categoryId)
    if (!resultId.success)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Bad request', error: resultId.error.errors })

    const result = await patchCategoryRequest.safeParseAsync(data)

    if (!result.success)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Bad request', error: result.error.errors })

    const [error, categoryUpdated] = await service.updateById(
      resultId.data,
      result.data
    )

    if (error)
      return res
        .status(HttpStatus.SERVER_ERROR)
        .json({ message: 'Server error', error })

    return res.redirect(`${CategoriesRoute.PREFIX}/${categoryUpdated?.id}`)
  }
)

router.delete(CategoriesRoute.ID, auth, validateAdmin, async (req, res) => {
  const { id: categoryId } = req.params
  const resultId = await numberIdValidator.safeParseAsync(categoryId)
  console.log(resultId)
  if (!resultId.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request', error: resultId.error.errors })

  const [error, productDeleted] = await service.deleteById(resultId.data)
  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.status(HttpStatus.OK).json(productDeleted)
})

export default router
