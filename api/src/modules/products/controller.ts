import { Router } from 'express'
import ProductPrismaRepository from './repository/products-prisma.repository'
import Productservice from './service'
import HttpStatus from '../../lib/enums/http-status'
import { createProductRequest, patchProductRequest } from './model'
import validateAdmin from '../../middlewares/validateAdmin'
import { uuidValidator } from '../../lib/validators'
import { uuid } from '../../lib/types'
import auth from '../../middlewares/auth'

const router = Router()

export enum ProductsRoute {
  PREFIX = '/product',
  ID = '/:id'
}

const repository = new ProductPrismaRepository()
const service = new Productservice(repository)

router.get('/', async (_req, res) => {
  const [error, products] = await service.getAllProducts()

  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.status(HttpStatus.OK).json(products)
})

router.get(ProductsRoute.ID, async (req, res) => {
  const { id: productId } = req.params
  const result = await uuidValidator.safeParseAsync(productId)
  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'The id must be an uuid' })

  const [error, data] = await service.getById(productId as uuid)
  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.status(HttpStatus.OK).json(data)
})

router.post('/', auth, validateAdmin, async (req, res) => {
  const product = req.body

  const result = await createProductRequest.safeParseAsync(product)

  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request', error: result.error.errors })

  const [error, data] = await service.createProduct(result.data)
  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ messge: 'Server error', error })

  return res.redirect(`${ProductsRoute.PREFIX}/${data!.id}`)
})

router.patch(ProductsRoute.ID, auth, validateAdmin, async (req, res) => {
  const { id: productId } = req.params
  const productToUpdate = req.body
  const idResult = await uuidValidator.safeParseAsync(productId)
  if (!idResult.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'The id must be an uuid', error: idResult.error.errors })

  const result = await patchProductRequest.safeParseAsync(productToUpdate)
  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request', error: result.error.errors })

  const [error, data] = await service.updateById(productId as uuid, result.data)

  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.redirect(`${ProductsRoute.PREFIX}/${data!.id}`)
})

router.delete(ProductsRoute.ID, auth, validateAdmin, async (req, res) => {
  const { id: productId } = req.params
  const result = await uuidValidator.safeParseAsync(productId)
  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'The id must be an uuid', error: result.error.errors })

  const [error, productDeleted] = await service.deleteById(productId as uuid)
  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.status(HttpStatus.OK).json(productDeleted)
})

export default router
