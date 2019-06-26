import {Component, OnInit} from '@angular/core';
import {TopNewsService} from '../../services/top-news/top-news.service';
import {TopNewsResponse} from '../../interfaces/top-news';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WelcomeModalComponent} from '../../helper-components/welcome-modal/welcome-modal.component';
import {GridTitle} from '../../interfaces/grid-title';
import {AuthService} from '../../services/auth/auth.service';
import {DailyFeedService} from '../../services/daily-feed/daily-feed.service';
import {DailyFeedResponse} from '../../interfaces/daily-feed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private topNewsarticles: TopNewsResponse;
  private dailyFeedsarticles: DailyFeedResponse;
  private topHeadlineTitle: GridTitle;
  private dailyFeedTitle: GridTitle;
  // To Facilitate Preloader
  private fetchingData: boolean;

  constructor(
    private topNewsService: TopNewsService,
    public dialog: MatDialog,
    private auth: AuthService,
    private dailyFeedService: DailyFeedService
  ) {
    // Array[0] to prevent length error on Construction
    this.topNewsarticles = {
      status: '',
      totalResults: 0,
      articles: []
    };
    this.dailyFeedsarticles = {
      status: '',
      totalResults: 0,
      articles: []
    };
    // Setting Headline Component Data
    this.topHeadlineTitle = {
      brief: 'Highlights from all over the world',
      title: 'Top Headlines',
      dialog: false
    };
    this.dailyFeedTitle = {
      brief: 'Your Daily Feed generated for you',
      title: 'Daily Feed',
      dialog: false
    };
  }

  ngOnInit() {
    // Checking if already LoggedIN, if Yes, then FetchNew and DailyFeed. If No, Then Open Personalisation dialog
    if (!this.auth.loggedIn()) {
      this.openDialog();
    } else {
      this.fetchTopNews();
      this.fetchDailyFeed();
    }
  }

  // External Link Opening
  onNavigate(url: string) {
    window.open(url, '_blank');
  }

  // Open Personalisation dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(WelcomeModalComponent, {
      width: '50vw',
      disableClose: true
    });
    // Fetch Result after Dialog Closing
    dialogRef.afterClosed().subscribe(result => {
      this.fetchDailyFeed();
      this.fetchTopNews();
    });
  }

  // Fetching Top Headlines from services
  fetchTopNews() {
    this.fetchingData = true;
    this.topNewsService.getTopNews().subscribe((res: TopNewsResponse) => {
      this.topNewsarticles = res;
      this.fetchingData = false;
    });
  }

  // Fetching Personalised Daily Feed from services
  fetchDailyFeed() {
    this.fetchingData = true;
    this.dailyFeedService.getDailyFeedNews().subscribe((res: DailyFeedResponse) => {
      if (res.status) {
        this.dailyFeedsarticles = res;
        this.fetchingData = false;
      } else {
        this.dailyFeedsarticles = {
          articles: [],
          status: '',
          totalResults: 0
        };
      }

    });
  }

}
