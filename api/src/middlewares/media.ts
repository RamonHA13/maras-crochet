import { RequestHandler } from 'express'
import MulterFile from '../lib/multer'

type MediaType = 'image' | 'file'

export default function media(
  mediaType: MediaType,
  imageType: 'product' | 'category'
): RequestHandler {
  return function (req, res, next) {
    const upload = new MulterFile(imageType).getUpload()

    return upload.array(mediaType)(req, res, err => {
      if (err) return next(err)
      if (Array.isArray(req.files) && req.files.length > 0) {
        req.body.imgUrls = (req.files as Express.Multer.File[]).map(file => {
          return `${req.protocol}://${req.get('host')}/uploads/${imageType}/${file.filename}`
        })

        return next()
      }

      return next()
    })
  }
}
