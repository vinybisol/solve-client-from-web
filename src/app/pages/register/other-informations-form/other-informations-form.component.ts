import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-other-informations-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './other-informations-form.component.html',
  styleUrl: './other-informations-form.component.scss'
})
export class OtherInformationsFormComponent {
  private formBuilder = inject(FormBuilder);

  registerFormGroup = this.formBuilder.group({
    digitalCertificate: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    digitalCertificatePassword: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    socialContract: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    propertyOwnerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    propertyOwnerPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    propertyOwnerEmail: ['', [Validators.required, Validators.email]],
    otherInformations: [''],
  })
  
  get formControls() {
    return this.registerFormGroup.value;
  }
}
