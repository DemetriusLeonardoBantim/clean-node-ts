import {Controller,HttpResponse,HttRequest} from '../../presentation/protocols'

export class LogControllerDecorator implements Controller{
  private readonly controller:Controller

  constructor(controller: Controller){
    this.controller = controller
  }

  async handle(httpRequest: HttRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(null))
  }
}
