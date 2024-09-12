export class APIError extends Error {
  readonly status: number

  constructor(message: string, status: number = 500) {
    super(message)
    this.status = status
    this.name = "APIError"

    // This line is necessary for proper prototype chain setup in TypeScript
    Object.setPrototypeOf(this, APIError.prototype)
  }
}
