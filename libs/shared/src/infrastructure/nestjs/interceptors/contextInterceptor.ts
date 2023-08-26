import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { v4 } from 'uuid';
import { RequestContextService } from '@app/shared/infrastructure/nestjs/services/RequestContextService';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Setting a new correlation ID for each request or using the one provided
    let requestId;
    if (request?.headers?.['x-correlation-id']) {
      requestId = request.headers['x-correlation-id'];
    } else if (request?.body?.requestId) {
      requestId = request?.body?.requestId;
    } else {
      requestId = v4();
    }

    RequestContextService.setCorrelationId(requestId);

    return next.handle().pipe(
      tap(() => {
        // Perform cleaning if needed
      }),
    );
  }
}
