import { describe, test, expect, vi } from 'vitest'
import Roles from '../../src/lib/enums/roles'
import { NextFunction, Request, Response } from 'express'
import validateAdmin from '../../src/middlewares/validateAdmin'
import HttpStatus from '../../src/lib/enums/http-status'

describe('validateAdmin middleware', () => {
  test('Should call next if user has ADMIN or SUDO role', () => {
    const req = {
      session: {
        user: {
          role: [Roles.ADMIN]
        }
      }
    } as unknown as Request

    const res = {} as Response
    const next = vi.fn() as NextFunction

    validateAdmin(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  test("Should return 403 if user doesn't have ADMIN or SUDO role", () => {
    const req = {
      session: {
        user: {
          role: [Roles.CLIENT]
        }
      }
    } as unknown as Request

    const jsonMock = vi.fn()

    const res = {
      status: vi.fn().mockReturnThis(),
      json: jsonMock
    } as unknown as Response

    const next = vi.fn() as NextFunction

    validateAdmin(req, res, next)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
    expect(jsonMock).toHaveBeenCalledWith({
      message: "You don't have permission to create a resource"
    })
    expect(next).not.toHaveBeenCalled()
  })
})
