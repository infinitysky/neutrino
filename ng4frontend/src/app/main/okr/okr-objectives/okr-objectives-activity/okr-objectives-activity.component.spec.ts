/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrObjectivesActivityComponent } from './okr-objectives-activity.component';

describe('OkrObjectivesActivityComponent', () => {
  let component: OkrObjectivesActivityComponent;
  let fixture: ComponentFixture<OkrObjectivesActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrObjectivesActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrObjectivesActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
