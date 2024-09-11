export class TokenMissingError extends Error {
  constructor() {
    super('Token is missing')
  }
}
