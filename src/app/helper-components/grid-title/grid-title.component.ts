import {Component, Input, OnInit} from '@angular/core';
import {GridTitle} from '../../interfaces/grid-title';

@Component({
  selector: 'app-grid-title',
  templateUrl: './grid-title.component.html',
  styleUrls: ['./grid-title.component.scss']
})
export class GridTitleComponent implements OnInit {

  // Getting Title value from INPUT parent component
  @Input() titleData: GridTitle;

  constructor() {
    // Setting Default values
    this.titleData = {
      title: 'Enter Title',
      dialog: false,
      brief: 'Enter Brief'
    };
  }

  ngOnInit() {
  }

}
