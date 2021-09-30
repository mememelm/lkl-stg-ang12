import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencySelectListComponent } from './agency-select-list.component';

describe('AgencySelectListComponent', () => {
  let component: AgencySelectListComponent;
  let fixture: ComponentFixture<AgencySelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencySelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencySelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
