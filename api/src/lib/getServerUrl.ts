import { Request } from 'express'
import url from 'node:url'

export default function getServerUrl(
  req: Request,
  showPathName: boolean = true
) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: showPathName ? req.originalUrl : '/'
  })
}
