import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {TopNewsResponse} from '../../interfaces/top-news';
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

  // Getting Non-Personalised Top Headlines with language and country(if) specified by User
  public getTopNews(): Observable<TopNewsResponse> {
    const localTopHeadlins = this.auth.getValidUserRes();
    const language = localTopHeadlins.language;
    const country = localTopHeadlins.country;
    return this.http
      .get(this.auth.baseURL + 'top-headlines?language=' + language + '&country=' + country)
      .pipe(
        retry(3),
        tap((res: TopNewsResponse) => {
          if (res.totalResults === 0 || res.totalResults === null) {
            return res.articles = [];
          }
          // Filtering Null Values
          return res.articles = res.articles.filter(returnArticle => returnArticle.author !== null && returnArticle.urlToImage !== null);
        }),
        catchError(this.auth.handleError<any>('News Fetching Error'))
      );
  }

  // Getting Non-Personalised(Language Only) Categorised News of each Category
  public getCatgorisedTopNews(category: string): Observable<TopNewsResponse> {
    const localTopHeadlins = this.auth.getValidUserRes();
    const language = localTopHeadlins.language;
    return this.http
      .get(`${this.auth.baseURL}top-headlines?language=${language}&category=${category}`)
      .pipe(
        retry(3),
        tap((res: TopNewsResponse) => {
          if (res.totalResults === 0 || res.totalResults === null) {
            return res.articles = [];
          }
          // Filtering Null Values
          return res.articles = res.articles.filter(returnArticle => returnArticle.author !== null && returnArticle.urlToImage !== null);
        }),
        catchError(this.auth.handleError<any>('News Fetching Error'))
      );
  }

}
