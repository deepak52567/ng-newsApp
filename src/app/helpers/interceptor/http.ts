import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()

export class Http implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        location.reload();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
