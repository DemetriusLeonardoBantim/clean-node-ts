import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, unauthorized, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      const acessToken = await this.authentication.auth(email, password)
      if (!acessToken) return unauthorized()

      return ok({ acessToken })
    } catch (e) {
      console.log(e)
    }
  }
}
