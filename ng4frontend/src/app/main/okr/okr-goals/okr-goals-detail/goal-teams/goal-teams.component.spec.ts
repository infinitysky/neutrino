import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTeamsComponent } from './goal-teams.component';

describe('GoalTeamsComponent', () => {
  let component: GoalTeamsComponent;
  let fixture: ComponentFixture<GoalTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
