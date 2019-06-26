import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DailyFeedResponse} from '../../interfaces/daily-feed';
import {catchError, retry, tap} from 'rxjs/operators';
import {SourceLocalData} from '../../interfaces/sources';

@Injectable({
  providedIn: 'root'
})
export class DailyFeedService {

  // LocalData variable to get set layout of Daily Feed articles data
  private localUserObj: SourceLocalData;

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {
  }

  // Getting Daily feed with fetching and appending the localData object from LocalStorage to URL
  public getDailyFeedNews(): Observable<DailyFeedResponse> {
    this.localUserObj = this.auth.getValidUserRes();
    console.log(this.localUserObj);
    return this.http
      .get(`${this.auth.baseURL}everything?${this.auth.localObjParser(this.localUserObj)}`)
      .pipe(
        retry(3),
        tap((res: DailyFeedResponse) => {
          // If any result is 0 length or null, it will return array[0]
          if (res.totalResults === 0 || res.totalResults === null) {
            return res.articles = [];
          }
          // Filtering results by removing Null- Authors, Images from results array
          return res.articles = res.articles.filter(returnArticle => returnArticle.author !== null && returnArticle.urlToImage !== null);
        }),
        catchError(this.auth.handleError<any>('DailyFeed Fetching Error'))
      );
  }
}
