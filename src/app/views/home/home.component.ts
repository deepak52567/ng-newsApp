import {Component, OnInit} from '@angular/core';
import {TopNewsService} from '../../services/top-news/top-news.service';
import {TopNewsResponse} from '../../interfaces/top-news';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WelcomeModalComponent} from '../../helper-components/welcome-modal/welcome-modal.component';
import {GridTitle} from '../../interfaces/grid-title';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private topNewsarticles: TopNewsResponse;
  private sectionTitle: GridTitle;

  constructor(
    private topNewsService: TopNewsService,
    public dialog: MatDialog
  ) {
    this.topNewsarticles = {
      status: '',
      totalResults: 0,
      articles: []
    };
    this.sectionTitle = {
      brief: 'Highlights from all over the world',
      title: 'Top Headlines',
      dialog: false
    };
  }

  ngOnInit() {
    this.openDialog();
    this.fetchTopNews();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WelcomeModalComponent, {
      width: '50vw',
      data: {name: 'sadfa'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  fetchTopNews() {
    this.topNewsService.getTopNews().subscribe((res: TopNewsResponse) => {
      this.topNewsarticles = res;
    });
  }

}
