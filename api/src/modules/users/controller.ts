import { Router } from 'express'
import HttpStatus from '../../lib/enums/http-status'
import UserPrismaRepository from './repository/user-prisma.repository'
import UserService from './service'
import { uuid } from '../../lib/types'
import UserNotFoundError from '../../lib/errors/UserNotFoundError'
import { createUserRequest } from './model'
import validateAdmin from '../../middlewares/validateAdmin'
import { uuidValidator } from '../../lib/validators'
import Roles from '../../lib/enums/roles'

const router = Router()
export enum UserRoute {
  PREFIX = '/user',
  BY_ID = '/:id'
}

const repository = new UserPrismaRepository()
const service = new UserService(repository)

router.get('/', validateAdmin, async (req, res) => {
  const { role } = req.query
  const roles = typeof role === 'string' ? role.split(',') : undefined

  const [err, users] = await service.getAllUsers(roles as Roles[])

  if (err)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error: err })

  return res.status(HttpStatus.OK).json(users)
})

router.get(UserRoute.BY_ID, async (req, res) => {
  const { id } = req.params

  const result = await uuidValidator.safeParseAsync(id)
  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Wrong id format, must be an uuid' })

  const [err, userData] = await service.getUserById(id as uuid)
  if (err instanceof UserNotFoundError)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: 'User not registered yet' })

  return res.status(HttpStatus.OK).json(userData)
})

router.post('/', validateAdmin, async (req, res) => {
  const { password, email, role } = req.body

  const result = await createUserRequest.safeParseAsync({
    password,
    email,
    role
  })

  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request', error: result.error.errors })

  //Cambiar los tipos (evitar assertion)
  const [err, userCreated] = await service.createUser({
    password: result.data.password,
    email: result.data.email,
    role: role || ['CLIENT']
  })

  if (err)
    return res.status(HttpStatus.SERVER_ERROR).json({ message: 'Server error' })

  return res.status(HttpStatus.CREATED).json(userCreated)
})

export default router
