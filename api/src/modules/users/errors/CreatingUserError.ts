export default class CreatingUserError extends Error {
  constructor() {
    super()
    this.name = 'creating user error'
    this.message = 'Error creating the user'
  }
}
