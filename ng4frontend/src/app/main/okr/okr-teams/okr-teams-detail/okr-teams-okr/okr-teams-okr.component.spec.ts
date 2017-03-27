import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkrTeamsOkrComponent } from './okr-teams-okr.component';

describe('OkrTeamsOkrComponent', () => {
  let component: OkrTeamsOkrComponent;
  let fixture: ComponentFixture<OkrTeamsOkrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrTeamsOkrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrTeamsOkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
