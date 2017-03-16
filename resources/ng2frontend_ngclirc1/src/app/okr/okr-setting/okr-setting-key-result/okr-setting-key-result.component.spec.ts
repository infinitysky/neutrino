/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrSettingKeyResultComponent } from './okr-setting-key-result.component';

describe('OkrSettingKeyResultComponent', () => {
  let component: OkrSettingKeyResultComponent;
  let fixture: ComponentFixture<OkrSettingKeyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrSettingKeyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrSettingKeyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
