import App from './app'
import { PORT, VERSION, WEB_ORIGIN, ENV } from './lib/config'

const myApp = new App(Number(PORT), Number(VERSION), ENV, WEB_ORIGIN)

myApp.start()
