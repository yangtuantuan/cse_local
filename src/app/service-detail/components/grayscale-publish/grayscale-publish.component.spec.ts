import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayscalePublishComponent } from './grayscale-publish.component';

describe('GrayscalePublishComponent', () => {
  let component: GrayscalePublishComponent;
  let fixture: ComponentFixture<GrayscalePublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrayscalePublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrayscalePublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
