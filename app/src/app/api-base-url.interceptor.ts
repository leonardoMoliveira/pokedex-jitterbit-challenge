import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only prepend base URL if the request is relative (doesn't start with http)
    if (!/^https?:\/\//i.test(req.url)) {
      const apiReq = req.clone({ url: environment.apiBaseUrl + req.url });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
