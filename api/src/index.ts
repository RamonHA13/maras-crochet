import App from './app'
import { PORT, VERSION, WEB_ORIGIN } from './config'

const myApp = new App(Number(PORT), Number(VERSION), WEB_ORIGIN)

myApp.start()
