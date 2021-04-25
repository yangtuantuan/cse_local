import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvokedServiceComponent } from './invoked-service.component';

describe('InvokedServiceComponent', () => {
  let component: InvokedServiceComponent;
  let fixture: ComponentFixture<InvokedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvokedServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvokedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
