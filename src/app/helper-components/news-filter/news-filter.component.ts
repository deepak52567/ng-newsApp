import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  // FormGroup to group data and to facilitate onChange emitter value getter
  filterForm = new FormGroup({
    language: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
    ]),
    category: new FormControl('', [
    ])
  });

  sourceFilter: SourcesRequest;
  // Input Data from Parent to show Selection fields
  @Input() filterObject: FilterObjectLayout;
  // Emitting data to Refresh array fo News Souces
  @Output() sourceEmitter: EventEmitter<SourcesRequest> = new EventEmitter();
  // Validated Select fields Emitting
  @Output() validationEmitter: EventEmitter<string> = new EventEmitter();

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

  // On Each value change, Emitting the selection Object to parent to refresh News Source Array
  filterChange(): void {
    this.filterForm.valueChanges.subscribe((val: SourcesRequest) => {
      this.sourceFilter = val;
      this.sourceFilter.language = this.filterForm.value.language;
      this.sourceFilter.country = this.filterForm.value.country;
      this.validationEmitter.emit(this.filterForm.status);
      this.sourceEmitter.emit(this.sourceFilter);
    });

  }
}
