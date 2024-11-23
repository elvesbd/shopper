import { Injectable } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private readonly httpService: NestHttpService) {}

  async get<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(this.httpService.get<T>(url));
      return response.data;
    } catch (error) {
      console.error('Erro na requisição HTTP:', error);
      throw new Error('Erro ao realizar a requisição HTTP GET.');
    }
  }

  async post<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<T>(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      console.error('Erro na requisição HTTP POST:', error);
      throw new Error('Erro ao realizar a requisição HTTP POST.');
    }
  }
}
