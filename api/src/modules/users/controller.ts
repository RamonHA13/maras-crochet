import { Router } from 'express'
import HttpStatus from '../../lib/http-status'
import UserPrismaRepository from './repository/user-prisma.repository'
import UserService from './service'
import { uuid } from '../../lib/types'
import UserNotFoundError from '../../lib/errors/UserNotFoundError'
import { createUserRequest } from './model'
import { User } from '@prisma/client'
import { z } from 'zod'

const router = Router()
export enum UserRoute {
  PREFIX = '/users',
  BY_ID = '/:id'
}

const repository = new UserPrismaRepository()
const service = new UserService(repository)

router.get('/', async (req, res) => {
  const { user } = req.session

  const hasPermission = user!.role.find(
    x => x.toLocaleLowerCase() === 'sudo' || x.toLocaleLowerCase() === 'admin'
  )
  if (!hasPermission)
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: "You don't have permission to access this resource." })

  const [err, users] = await service.getAllUsers()

  if (err)
    return res.status(HttpStatus.SERVER_ERROR).json({ messge: 'Server error' })

  return res.status(HttpStatus.OK).json(users)
})

router.get(UserRoute.BY_ID, async (req, res) => {
  const { id } = req.params
  const result = await z
    .object({ id: z.string().uuid() })
    .safeParseAsync({ id })
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

router.post('/', async (req, res) => {
  const { user } = req.session
  const { password, email, role } = req.body

  const canCreate = user!.role.find(
    x => x.toLocaleLowerCase() === 'admin' || x.toLocaleLowerCase() === 'sudo'
  )

  if (!canCreate)
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: "You don't have permission to create a resource" })

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
  } as User)

  if (err)
    return res.status(HttpStatus.SERVER_ERROR).json({ message: 'Server error' })

  return res.status(HttpStatus.CREATED).json(userCreated)
})

export default router
