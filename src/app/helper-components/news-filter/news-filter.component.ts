import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SourcesRequest} from '../../interfaces/sources';

interface FilterObjectLayout {
  language: string[];
  category: string[];
  country: string[];
}

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss']
})
export class NewsFilterComponent implements OnInit {

  filterForm = new FormGroup({
    language: new FormControl(''),
    country: new FormControl(''),
    category: new FormControl('')
  });

  sourceFilter: SourcesRequest;
  @Input() filterObject: FilterObjectLayout;
  @Output() sourceEmitter: EventEmitter<SourcesRequest> = new EventEmitter();

  constructor() {
    this.sourceFilter = {
      country: '',
      category: '',
      language: ''
    };
  }

  ngOnInit() {
    this.filterChange();
  }

  filterChange(): void {
    this.filterForm.valueChanges.subscribe((val: SourcesRequest) => {
      this.sourceFilter = val;
      this.sourceEmitter.emit(this.sourceFilter);
    });
  }
}
