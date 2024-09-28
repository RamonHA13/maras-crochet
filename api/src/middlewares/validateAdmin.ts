import { NextFunction, Request, Response } from 'express'
import HttpStatus from '../lib/enums/http-status'
import Roles from '../lib/enums/roles'

export default function validateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const { user } = req.session
  const canCreate = user!.role.find(
    x =>
      x.toLocaleUpperCase() === Roles.SUDO ||
      x.toLocaleUpperCase() === Roles.ADMIN
  )

  if (!canCreate)
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: "You don't have permission to create a resource" })

  next()
}
