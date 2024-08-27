export default class UserNotFoundError extends Error {
  constructor() {
    super()
    this.name = 'user not found'
    this.message = 'The user was not found'
  }
}
