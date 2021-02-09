import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostedReportComponent } from './hosted-report.component';

describe('HostedReportComponent', () => {
  let component: HostedReportComponent;
  let fixture: ComponentFixture<HostedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
