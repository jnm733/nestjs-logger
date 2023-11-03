import { Controller, Get } from '@nestjs/common';
import { ApiService } from './apiService';

@Controller()
export class ApiHttpController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.apiService.getHello();
  }
}
