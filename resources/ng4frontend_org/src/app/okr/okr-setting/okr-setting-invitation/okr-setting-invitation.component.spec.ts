/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrSettingInvitationComponent } from './okr-setting-invitation.component';

describe('OkrSettingInvitationComponent', () => {
  let component: OkrSettingInvitationComponent;
  let fixture: ComponentFixture<OkrSettingInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrSettingInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrSettingInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
