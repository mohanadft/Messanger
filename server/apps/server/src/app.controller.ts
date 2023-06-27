import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {
    this.authService.connect();
  }

  @Get()
  async getUser() {
    return this.authService.send({ cmd: 'get-user' }, {});
  }
}
