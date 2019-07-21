import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginLayout, SourceLocalData, SourcesRequest } from '../../interfaces/sources';
import { environment } from '../../../environments/environment';
// import {environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // This is the Base Url to hit an specific address
  public baseURL = environment.production ? 'https://newsapi.org/v2/' : 'https://localhost:3000';

  // Unique APIKey registered on NewsAPI.org to get authorised data
  public apiKey = 'e22149ae9c4d49398d95376645350a78';

  constructor() {

    // APIKey is being Stored on Browser LocalStorage to get data later from various services using this APIKey
    localStorage.setItem('apiKey', this.apiKey);
  }

  // Handling Error and returning error to console
  public handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);
      error.AppOperation = operation;

      if (typeof error !== 'string') {
        if (error.status === 401) {
          this.logout();
        }
      }
      return of(error as T);
    };
  }

  // Parsing a string to append in URL to get the sources result to Initialisation
  public sourceObjParser(sourceObj: SourcesRequest) {
    let finalString = '';
    if (sourceObj.language) {
      finalString += `language=${sourceObj.language}`;
    }
    if (sourceObj.country) {
      finalString += `&country=${sourceObj.country}`;
    }
    if (sourceObj.category) {
      finalString += `&category=${sourceObj.category}`;
    }
    return finalString;
  }

  // Parsing a string to append in URL to get the Daily Feed according to users preference
  public localObjParser(localObj: SourceLocalData) {
    let finalString = '';
    if (localObj.language) {
      finalString += `language=${localObj.language}`;
    }
    if (localObj.country) {
      finalString += `&country=${localObj.country}`;
    }
    if (localObj.sources.length) {
      finalString += '&sources=';
      localObj.sources.forEach((source) => {
        finalString += `${source},`;
      });
    }
    return finalString;
  }

  // Setting the userData which include sources, language, country to get Personalised Feed
  public login(loginObject: LoginLayout) {
    localStorage.setItem('userData', JSON.stringify(loginObject));
  }

  public loggedIn() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('userData') !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // Getting the userData and returning it to requesting function to further make Personalised API requests
  public getValidUserRes() {
    if (this.loggedIn()) {
      return JSON.parse(localStorage.getItem('userData'));
    } else {
      const userData: SourceLocalData = {
        language: '',
        sources: [],
        country: ''
      };
      return userData;
    }
  }

  // Logout by removing UserData from localstorage
  public logout() {
    localStorage.removeItem('userData');
    location.reload();
  }

}
