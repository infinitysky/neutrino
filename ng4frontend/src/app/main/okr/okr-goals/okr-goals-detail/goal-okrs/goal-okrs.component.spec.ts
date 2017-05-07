import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalOkrsComponent } from './goal-okrs.component';

describe('GoalOkrsComponent', () => {
  let component: GoalOkrsComponent;
  let fixture: ComponentFixture<GoalOkrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalOkrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalOkrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
