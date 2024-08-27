export default class WrongPasswordError extends Error {
  constructor() {
    super()
    this.name = 'Wrong password'
    this.message = 'The password provides was not equal to the password stored'
  }
}
