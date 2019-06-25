import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {TopNewsRequest, TopNewsResponse} from '../../interfaces/top-news';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopNewsService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  public getTopNews(): Observable<TopNewsResponse> {
    return this.http
      .get(this.auth.baseURL + 'top-headlines?country=in')
      .pipe(
        retry(3),
        tap((res: TopNewsResponse) => {
          if (res.totalResults === 0 || res.totalResults === null) {
            return res.articles = [];
          }
          return res.articles = res.articles.filter(returnArticle => returnArticle.author !== null && returnArticle.urlToImage !== null);
        }),
        catchError(this.auth.handleError<any>('News Fetching Error'))
      );
  }

}
