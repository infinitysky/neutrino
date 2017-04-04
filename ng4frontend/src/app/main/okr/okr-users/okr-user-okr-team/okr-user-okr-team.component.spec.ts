import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkrUserOkrTeamComponent } from './okr-user-okr-team.component';

describe('OkrUserOkrTeamComponent', () => {
  let component: OkrUserOkrTeamComponent;
  let fixture: ComponentFixture<OkrUserOkrTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrUserOkrTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrUserOkrTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
