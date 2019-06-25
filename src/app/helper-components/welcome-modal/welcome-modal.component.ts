import {Component, OnInit} from '@angular/core';
import {GridTitle} from '../../interfaces/grid-title';
import {LoginLayout, SourcesRequest, SourcesResponse} from '../../interfaces/sources';
import {AuthService} from '../../services/auth/auth.service';
import {SourcesService} from '../../services/sources/sources.service';

interface FilterObjectLayout {
  language: string[];
  category: string[];
  country: string[];
}

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss']
})
export class WelcomeModalComponent implements OnInit {

  private selectedSources: string[];
  sectionTitle: GridTitle;
  private sources: SourcesResponse;
  private loginObject: LoginLayout;
  private sourceFilter: SourcesRequest;
  public filteredObject: FilterObjectLayout;

  constructor(
    private auth: AuthService,
    private sourcesService: SourcesService
  ) {
    this.sectionTitle = {
      title: 'Welcome! Prepare your personalised news',
      dialog: true,
      brief: 'Select language and your interest sources to get the latest news curated just for you'
    };
    this.sourceFilter = {
      country: '',
      category: '',
      language: ''
    };
    this.filteredObject = {
      category: [],
      country: [],
      language: []
    };
  }

  ngOnInit() {
    this.getInitalSources();
  }

  returnIcon(cat) {
    switch (cat) {
      case 'entertainment':
        return 'album';
        break;
      case 'business':
        return 'business_center';
        break;
      case 'general':
        return 'chrome_reader_mode';
        break;
      case 'health':
        return 'favorite';
        break;
      case 'science':
        return 'scatter_plot';
        break;
      case 'sports':
        return 'directions_bike';
        break;
      case 'technology':
        return 'cloud';
        break;
    }
  }

  getInitalSources(sourceFilterObj: SourcesRequest = this.sourceFilter) {
    this.sourcesService.getSources(sourceFilterObj).subscribe((res: SourcesResponse) => {
      if (res.status) {
        this.sources = res;

        const countryArray = res.sources.map(country => {
          return country.country;
        });
        const categoryArray = res.sources.map(category => {
          return category.category;
        });
        const languageArray = res.sources.map(language => {
          return language.language;
        });

        this.filteredObject.language = Array.from(new Set(languageArray));
        this.filteredObject.category = Array.from(new Set(categoryArray));
        this.filteredObject.country = Array.from(new Set(countryArray));

        console.log(this.filteredObject);
      }
    });
  }


  onSubmit(params) {
    this.selectedSources = params.selectedOptions.selected.map((value) => value._value);
    this.loginObject = {
      language: this.filteredObject.language,
      category: this.selectedSources,
      country: this.filteredObject.country
    };
    this.auth.login(this.loginObject);
  }

}
