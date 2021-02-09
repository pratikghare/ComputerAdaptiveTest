import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptedReportComponent } from './attempted-report.component';

describe('AttemptedReportComponent', () => {
  let component: AttemptedReportComponent;
  let fixture: ComponentFixture<AttemptedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
