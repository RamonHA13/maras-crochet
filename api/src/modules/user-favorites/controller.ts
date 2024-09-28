import { Router } from 'express'
import UserFavoritePrismaRepository from './repository/userFavorites-prisma.repository'
import UserFavoriteService from './service'
import { uuidValidator } from '../../lib/validators'
import HttpStatus from '../../lib/enums/http-status'
import { uuid } from '../../lib/types'
import getServerUrl from '../../lib/getServerUrl'

const router = Router()

export enum UserFavoriteRoute {
  PREFIX = '/user-favorites',
  BY_ID = '/:id'
}

const repository = new UserFavoritePrismaRepository()
const service = new UserFavoriteService(repository)

router.get('/', async (req, res) => {
  const { id } = req.session.user!

  const resultId = await uuidValidator.safeParseAsync(id)
  if (!resultId.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Wrong id format, must be an uuid' })

  const [err, productsIds] = await service.getAllUserFavorites(id as uuid)
  if (err)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error: err })

  const serverUrl = getServerUrl(req, true).split('/').slice(0, -1).join('/')

  const productsUrls = productsIds!.map(x => `${serverUrl}/products/${x}`)
  return res.status(HttpStatus.OK).json(productsUrls)
})

router.delete(UserFavoriteRoute.BY_ID, async (req, res) => {
  const { id } = req.session.user!
  const { id: productId } = req.params

  const resultUserId = await uuidValidator.safeParseAsync(id)
  const resultProductId = await uuidValidator.safeParseAsync(productId)
  if (!resultUserId.success || !resultProductId.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Wrong id format, must be an uuid' })

  const [err] = await service.deleteUserFavoriteById(
    id as uuid,
    productId as uuid
  )

  if (err)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error: err })

  return res.status(HttpStatus.NO_CONTENT).send()
})

router.post('/', async (req, res) => {
  const { id } = req.session.user!
  const { productId } = req.body

  const resultUserId = await uuidValidator.safeParseAsync(id)
  const resultProductId = await uuidValidator.safeParseAsync(productId)
  if (!resultUserId.success || !resultProductId.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Wrong id format, must be an uuid' })

  const [err, productAddedId] = await service.createUserFavoriteById(
    id as uuid,
    productId as uuid
  )
  if (err)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error: err })

  const serverUrl = getServerUrl(req, true).split('/').slice(0, -1).join('/')
  return res.redirect(`${serverUrl}/products/${productAddedId}`)
})
export default router
