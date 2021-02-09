import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostedQuizComponent } from './hosted-quiz.component';

describe('HostedQuizComponent', () => {
  let component: HostedQuizComponent;
  let fixture: ComponentFixture<HostedQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostedQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
