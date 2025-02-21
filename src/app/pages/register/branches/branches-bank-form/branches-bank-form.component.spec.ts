import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesBankFormComponent } from './branches-bank-form.component';

describe('BranchesBankFormComponent', () => {
  let component: BranchesBankFormComponent;
  let fixture: ComponentFixture<BranchesBankFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesBankFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesBankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
