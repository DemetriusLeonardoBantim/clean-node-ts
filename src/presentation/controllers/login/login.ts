import { unauthorized, ok, badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-protocols'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const acessToken = await this.authentication.auth(email, password)
      if (!acessToken) return unauthorized()

      return ok({ acessToken })
    } catch (e) {
      console.log(e)
    }
  }
}
