import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkrSettingCompanyInfoComponent } from './okr-setting-company-info.component';

describe('OkrSettingCompanyInfoComponent', () => {
  let component: OkrSettingCompanyInfoComponent;
  let fixture: ComponentFixture<OkrSettingCompanyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrSettingCompanyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrSettingCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
