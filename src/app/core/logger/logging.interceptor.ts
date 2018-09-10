import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS,
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse, HttpClient, HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { finalize, tap } from 'rxjs/operators';
import { MessageLoggerService } from '../logger/message-logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  private urlEndpoint = '/sofeaService/api/messagestracker';

  constructor(private messenger: MessageLoggerService) {
    console.log('LoggingInterceptor');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {

          // definido a quantidade de requisições que são empilhadas para enviar
          // ao backend altere a quantidade caso queira agrupar uma quantidade maior para envio
          if ( this.messenger.get().length > 5 ) {
            // Caso queira loggar no backend os endpoints acessados. Tamanho da pilha de 5 urls
            // this.messenger.logErrors(this.urlEndpoint, JSON.stringify(this.messenger.get()).replace('\\', '') ).subscribe();
            this.messenger.clear();
          }

          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          this.messenger.add(msg);

        })
      );
  }
}

/** Http interceptor providers in outside-in order */
export const httpLogggerInterceptorProviders = [

  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },

];
