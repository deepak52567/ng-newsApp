import {Component, OnInit} from '@angular/core';
import {LoginLayout, SourcesRequest, SourcesResponse} from '../../interfaces/sources';
import {SourcesService} from '../../services/sources/sources.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private sourceFilter: SourcesRequest;
  private sources: SourcesResponse;
  private categories: string[];

  constructor(
    private sourcesService: SourcesService,
    private auth: AuthService
  ) {
    // Array[0] and string to prevent length error on Construction
    this.sourceFilter = {
      country: '',
      category: '',
      language: ''
    };
    this.categories = [];
  }

  ngOnInit() {
    // Get Categories to show in header
    this.getInitalSources();
  }

  // Get Categories to show in header from services
  getInitalSources(sourceFilterObj: SourcesRequest = this.sourceFilter) {
    this.sourcesService.getSources(sourceFilterObj).subscribe((res: SourcesResponse) => {
      if (res.status) {
        this.sources = res;
        // Mapping and creating a new array by removing duplicates from response array
        const categoryArray = res.sources.map(category => {
          return category.category;
        });
        this.categories = Array.from(new Set(categoryArray));
      }
    });
  }


  // Logout services from AUTH
  logout() {
    this.auth.logout();
  }

}
