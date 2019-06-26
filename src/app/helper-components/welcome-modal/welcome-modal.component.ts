import {Component, OnInit} from '@angular/core';
import {GridTitle} from '../../interfaces/grid-title';
import {LoginLayout, SourcesRequest, SourcesResponse} from '../../interfaces/sources';
import {AuthService} from '../../services/auth/auth.service';
import {SourcesService} from '../../services/sources/sources.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';

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
  sources: SourcesResponse;
  private loginObject: LoginLayout;
  private sourceFilter: SourcesRequest;
  public filteredObject: FilterObjectLayout;
  private userValidated: boolean;
  private catSelected: boolean;

  constructor(
    private auth: AuthService,
    private sourcesService: SourcesService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<WelcomeModalComponent>
  ) {
    // Setting Headline Component Data
    this.sectionTitle = {
      title: 'Welcome! Prepare your personalised news',
      dialog: true,
      brief: 'Select language and your interest sources to get the latest news curated just for you'
    };
    // Blank Data to prevent unusual result on Construction
    this.sourceFilter = {
      country: '',
      category: '',
      language: ''
    };
    // Array[0] to prevent length error on Construction
    this.filteredObject = {
      category: [],
      country: [],
      language: []
    };
    this.userValidated = false;
    this.catSelected = false;
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // Initial News Source Array/or updating the array with Event Emitter
  getInitalSources(sourceFilterObj: SourcesRequest = this.sourceFilter) {
    this.loginObject = {
      language: sourceFilterObj.language,
      sources: [''],
      country: sourceFilterObj.country
    };
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

      }
    });
  }

  // Checking the form Validation to Save Personalised Data
  formValidated(validationStatus: string) {
    if (validationStatus === 'VALID') {
      this.userValidated = true;
    } else if (validationStatus === 'INVALID') {
      this.userValidated = false;
    } else {
      this.userValidated = false;
    }
  }

  // Check Selected News Sources, Min 3
  checkSelection(params) {
    if (params.selectedOptions.selected.length >= 3) {
      this.catSelected = true;
    } else {
      this.catSelected = false;
    }
  }

  // CLose Dialog after validating
  closeDialog() {
    this.dialogRef.close({reload: true});
  }

  // On Submit, closing dialog and saving country(if), language and sources array to Localstorage using Auth Login Func
  onSubmit(params) {

    this.selectedSources = params.selectedOptions.selected.map((value) => value._value);

    this.loginObject.sources = this.selectedSources;

    if (this.userValidated && params.selectedOptions.selected.length >= 3) {
      this.auth.login(this.loginObject);
      this.openSnackBar('Success', 'Dismiss');
      this.closeDialog();
    } else if (params.selectedOptions.selected.length < 3) {
      this.openSnackBar('Select Minimum of 3 Sources', 'Dismiss');
    } else if (!this.userValidated) {
      this.openSnackBar('Select Language First', 'Dismiss');
    }
  }


}
