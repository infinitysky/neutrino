import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalActivitiesComponent } from './goal-activities.component';

describe('GoalActivitiesComponent', () => {
  let component: GoalActivitiesComponent;
  let fixture: ComponentFixture<GoalActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
