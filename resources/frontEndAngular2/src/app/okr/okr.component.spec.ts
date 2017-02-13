/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OkrComponent } from './okr.component';

describe('OkrComponent', () => {
  let component: OkrComponent;
  let fixture: ComponentFixture<OkrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
