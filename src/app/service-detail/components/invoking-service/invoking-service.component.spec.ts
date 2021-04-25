import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvokingServiceComponent } from './invoking-service.component';

describe('InvokingServiceComponent', () => {
  let component: InvokingServiceComponent;
  let fixture: ComponentFixture<InvokingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvokingServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvokingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
