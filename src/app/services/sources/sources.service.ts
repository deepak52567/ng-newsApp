import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SourcesRequest, SourcesResponse} from '../../interfaces/sources';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SourcesService {

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {

  }

  private sourceObjParser(sourceObj: SourcesRequest) {
    let finalString = '';
    if (sourceObj.language) {
      finalString += `&language=${sourceObj.language}`;
    }
    if (sourceObj.country) {
      finalString += `&country=${sourceObj.country}`;
    }
    if (sourceObj.category) {
      finalString += `&category=${sourceObj.category}`;
    }
    return finalString;
  }

  public getSources(sourceObj?: SourcesRequest): Observable<SourcesResponse> {
    return this.http
      .get(this.auth.baseURL + 'sources?' + this.sourceObjParser(sourceObj))
      .pipe(
        retry(3),
        tap((res: SourcesResponse) => {}),
        catchError(this.auth.handleError<any>('Sources Fetching Error'))
      );
    }


}
