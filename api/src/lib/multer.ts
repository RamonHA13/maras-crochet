import { join } from 'node:path'
import multer, { Multer, StorageEngine, diskStorage } from 'multer'
import { createFolder } from './folder'

export default class MulterFile {
  storage: StorageEngine
  upload: Multer

  constructor(folderName: string) {
    const uploadPath = join(__dirname, '../..', 'public', 'uploads', folderName)

    this.storage = diskStorage({
      destination: async function (_req, _file, cb) {
        try {
          await createFolder(uploadPath)
          cb(null, uploadPath)
        } catch (e) {
          cb(e as Error, uploadPath)
        }
      },
      filename: function (req, file, cb) {
        const { name } = req.body
        const uniqueSuffix = Date.now()

        const fileType = file.originalname.split('.').slice(-1)
        const imageName = `${name.replaceAll(' ', '-')}-${uniqueSuffix}.${fileType}`
        //req.file!.filename = imageName
        cb(null, imageName)
      }
    })
    this.upload = multer({ storage: this.storage })
  }

  setStorage(storage: StorageEngine) {
    this.storage = storage
  }

  getUpload(): Multer {
    return this.upload
  }
}
