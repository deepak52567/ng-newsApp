import {Component, OnInit} from '@angular/core';
import {DailyFeedResponse} from '../../interfaces/daily-feed';
import {GridTitle} from '../../interfaces/grid-title';
import {ActivatedRoute} from '@angular/router';
import {TopNewsService} from '../../services/top-news/top-news.service';
import {TopNewsResponse} from '../../interfaces/top-news';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private newsArticles: DailyFeedResponse;
  private feedTitle: GridTitle;
  private catTitle: GridTitle;
  private categoryParam: '';
  // To Facilitate Preloader
  private fetchingData: boolean;

  constructor(
    private route: ActivatedRoute,
    private topNewsService: TopNewsService
  ) {
    // Setting Headline Component Data
    this.feedTitle = {
      brief: 'Here is the all news feed',
      title: 'News Feed',
      dialog: false
    };
    this.feedTitle = {
      brief: 'Here is the all news feed',
      title: 'Categorised News Feed',
      dialog: false
    };
    // Getting Params from Router to get the categorised news from services
    this.route.params.subscribe((res) => {
      this.categoryParam = res.category;
      this.getCategorisedNews();
    });
    this.fetchingData = true;
  }

  ngOnInit() {
  }

  // External Link Opening
  onNavigate(url: string) {
    window.open(url, '_blank');
  }

  // Fetching Categorised Top Headlines from services
  getCategorisedNews() {
    this.fetchingData = true;
    // Array[0] to clear data on each navigation
    this.newsArticles = {
      status: '',
      articles: [],
      totalResults: 0,
    };
    this.topNewsService.getCatgorisedTopNews(this.categoryParam).subscribe((res: TopNewsResponse) => {
      this.fetchingData = false;
      if (res.status) {
        this.newsArticles = res;
      } else {
        this.newsArticles = {
          status: '',
          articles: [],
          totalResults: 0,
        };
      }
    });
  }


}
