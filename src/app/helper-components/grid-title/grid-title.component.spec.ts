import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTitleComponent } from './grid-title.component';

describe('GridTitleComponent', () => {
  let component: GridTitleComponent;
  let fixture: ComponentFixture<GridTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
