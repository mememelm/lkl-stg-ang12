import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingActionComponent } from './pricing-action.component';

describe('PricingActionComponent', () => {
  let component: PricingActionComponent;
  let fixture: ComponentFixture<PricingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
