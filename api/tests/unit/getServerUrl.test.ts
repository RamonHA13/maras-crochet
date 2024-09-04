import { describe, it, expect, vi } from 'vitest'
import getServerUrl from './../../src/lib/getServerUrl'
import { Request } from 'express'

describe('getServerUrl', () => {
  it('should return the correct server URL', () => {
    // Mock del objeto Request
    const mockRequest = {
      protocol: 'http',
      get: vi.fn().mockReturnValue('localhost:3000'),
      originalUrl: '/api/test'
    } as unknown as Request

    const result = getServerUrl(mockRequest)
    console.log(result)
    expect(result).toBe('http://localhost:3000/api/test')
  })

  it('should handle https protocol correctly', () => {
    const mockRequest = {
      protocol: 'https',
      get: vi.fn().mockReturnValue('example.com'),
      originalUrl: '/secure'
    } as unknown as Request

    const result = getServerUrl(mockRequest)
    expect(result).toBe('https://example.com/secure')
  })
})
