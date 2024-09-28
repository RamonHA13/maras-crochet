import fs from 'node:fs/promises'
import path from 'node:path'

export async function deleteFile(filePath: string) {
  const projectPath = path.join(__dirname, '../..', filePath)
  await fs.unlink(projectPath)
}
