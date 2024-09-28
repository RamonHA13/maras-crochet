import { Response } from 'express'
import { Observer } from './observer'

class AdminSSEObserver extends Observer<Response> {
  protected update<U>(observer: Response, data: U): void {
    observer.write(`data: ${JSON.stringify(data)}\n\n`)
  }
}

export default new AdminSSEObserver()
