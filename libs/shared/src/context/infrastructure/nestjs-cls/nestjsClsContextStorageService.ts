import ContextStorageService from '@nestjs-logger/shared/context/domain/interfaces/contextStorageService';
import { ClsService } from 'nestjs-cls';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class NestjsClsContextStorageService
  implements ContextStorageService
{
  constructor(private readonly cls: ClsService) {}

  public get<T>(key: string): T | undefined {
    return this.cls.get(key);
  }

  public getContextId(): string | undefined {
    return this.cls.getId();
  }

  public set<T>(key: string, value: T): void {
    this.cls.set(key, value);
  }
}
