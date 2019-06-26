import {Component, Input, OnInit} from '@angular/core';
import {SingleTopNewsResponse} from '../../interfaces/top-news';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input() article: SingleTopNewsResponse;

  constructor() {
    // Blank Data to prevent length error on Construction
    this.article = {
      publishedAt: '',
      author: '',
      url: '',
      title: '',
      description: '',
      urlToImage: '',
      content: '',
      source: {
        id: '',
        name: ''
      }
    };
  }

  ngOnInit() {
  }

}
