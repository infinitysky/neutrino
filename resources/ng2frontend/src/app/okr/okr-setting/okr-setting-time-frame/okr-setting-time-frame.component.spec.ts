/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component';

describe('OkrSettingTimeFrameComponent', () => {
  let component: OkrSettingTimeFrameComponent;
  let fixture: ComponentFixture<OkrSettingTimeFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrSettingTimeFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrSettingTimeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
