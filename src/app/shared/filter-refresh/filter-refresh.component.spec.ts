import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRefreshComponent } from './filter-refresh.component';

describe('FilterRefreshComponent', () => {
  let component: FilterRefreshComponent;
  let fixture: ComponentFixture<FilterRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRefreshComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
