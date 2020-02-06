import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFacilityDialogComponent } from './search-facility-dialog.component';

describe('SearchFacilityDialogComponent', () => {
  let component: SearchFacilityDialogComponent;
  let fixture: ComponentFixture<SearchFacilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFacilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFacilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
