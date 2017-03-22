import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOkrsComponent } from './company-okrs.component';

describe('CompanyOkrsComponent', () => {
  let component: CompanyOkrsComponent;
  let fixture: ComponentFixture<CompanyOkrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOkrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOkrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
