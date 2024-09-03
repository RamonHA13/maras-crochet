import fs from 'node:fs/promises'

export async function folderExists(dirPath: string): Promise<boolean | void> {
  try {
    const stats = await fs.stat(dirPath)
    return stats.isDirectory()
    /*eslint-disable-next-line*/
  } catch (e: any) {
    if (e.code === 'ENOENT') return false
  }
}

export async function createFolder(dirPath: string): Promise<void> {
  const exists = await folderExists(dirPath)
  if (!exists) {
    await fs.mkdir(dirPath, { recursive: true })
  }
}
