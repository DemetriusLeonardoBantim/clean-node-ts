import {Controller,HttpResponse,HttRequest} from '../../presentation/protocols'

export class LogControllerDecorator implements Controller{
  private readonly controller:Controller

  constructor(controller: Controller){
    this.controller = controller
  }

  async handle(httpRequest: HttRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
