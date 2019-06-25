import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginLayout} from '../../interfaces/sources';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseURL = 'https://newsapi.org/v2/';
  public apiKey = 'e22149ae9c4d49398d95376645350a78';

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor() {
    localStorage.setItem('apiKey', this.apiKey);
  }

  public handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);
      error.AppOperation = operation;

      if (typeof error !== 'string') {
        if (error.status === 401) {
          console.error(error.statusText);
        }
      }
      return of(error as T);
    };
  }

  public login(loginObject: LoginLayout) {
    if (loginObject.category && loginObject.country && loginObject.language) {
      localStorage.setItem('userData', JSON.stringify(loginObject));
    }
  }

  public logout() {
    localStorage.removeItem('userData');
  }

}
