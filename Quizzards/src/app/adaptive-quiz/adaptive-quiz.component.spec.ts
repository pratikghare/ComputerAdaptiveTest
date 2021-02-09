import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptiveQuizComponent } from './adaptive-quiz.component';

describe('AdaptiveQuizComponent', () => {
  let component: AdaptiveQuizComponent;
  let fixture: ComponentFixture<AdaptiveQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptiveQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptiveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
