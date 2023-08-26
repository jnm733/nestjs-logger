import { RequestContext } from 'nestjs-request-context';

export class AppRequestContext extends RequestContext {
  correlationId: string;
}

export class RequestContextService {
  public static setCorrelationId(id: string): void {
    const ctx = this.getContext();
    ctx.correlationId = id;
  }

  public static getCorrelationId(): string | undefined {
    return this.getContext()?.correlationId || undefined;
  }

  private static getContext(): AppRequestContext | undefined {
    const context = RequestContext.currentContext;
    if (!context) {
      return undefined;
    }
    return context.req;
  }
}
