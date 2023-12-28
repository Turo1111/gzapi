import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string): string => {
  const file = fileName.split('.').shift()
  return file ?? ''
}

readdirSync(PATH_ROUTER).map((fileName): string => {
  const cleanName = cleanFileName(fileName)

  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router)
    }).catch((e) => console.log('Ocurrio un error en la ruta', e))
  }
  return cleanName
})

export { router }
