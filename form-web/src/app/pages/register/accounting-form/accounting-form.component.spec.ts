import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingFormComponent } from './accounting-form.component';

describe('AccountingFormComponent', () => {
  let component: AccountingFormComponent;
  let fixture: ComponentFixture<AccountingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
