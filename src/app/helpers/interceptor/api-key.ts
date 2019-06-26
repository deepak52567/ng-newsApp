import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class ApiKey implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with API token if available
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      // Appending Bearer APIkey to each request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${apiKey}`
        }
      });
    }
    return next.handle(request);
  }
}
