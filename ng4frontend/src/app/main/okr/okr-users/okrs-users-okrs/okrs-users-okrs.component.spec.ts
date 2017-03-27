import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkrsUsersOkrsComponent } from './okrs-users-okrs.component';

describe('OkrsUsersOkrsComponent', () => {
  let component: OkrsUsersOkrsComponent;
  let fixture: ComponentFixture<OkrsUsersOkrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrsUsersOkrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrsUsersOkrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
