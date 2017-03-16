/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrUsersActionComponent } from './okr-users-action.component';

describe('OkrUsersActionComponent', () => {
  let component: OkrUsersActionComponent;
  let fixture: ComponentFixture<OkrUsersActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrUsersActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrUsersActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
