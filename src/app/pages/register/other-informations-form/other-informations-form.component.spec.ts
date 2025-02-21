import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInformationsFormComponent } from './other-informations-form.component';

describe('OtherInformationsFormComponent', () => {
  let component: OtherInformationsFormComponent;
  let fixture: ComponentFixture<OtherInformationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherInformationsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherInformationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
