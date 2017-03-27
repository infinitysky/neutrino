/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrSettingObjectiveComponent } from './okr-setting-objective.component';

describe('OkrSettingObjectiveComponent', () => {
  let component: OkrSettingObjectiveComponent;
  let fixture: ComponentFixture<OkrSettingObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrSettingObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrSettingObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
