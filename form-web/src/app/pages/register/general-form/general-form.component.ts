import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-general-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class GeneralFormComponent {
  private formBuilder = inject(FormBuilder);


  registerFormGroup = this.formBuilder.group({
    startDate: [new Date().toISOString(), [Validators.required]],
    systemConversion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    conversionData: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    databaseLink: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });

  // onSubmit() {
  //   console.log(this.registerFormGroup.value);
  //   console.log(this.registerFormGroup.get('startDate')?.value?.toString());
  //   //Arrumar a data para o formato correto
  //   const startDate = this.registerFormGroup.get('startDate')?.value ?? null;
  //   if (startDate === null) {
  //     console.log('startDate is null');
  //     return;
  //   }
  //   const starDateLocate = new Date(startDate);
  //   console.log(starDateLocate.toLocaleDateString());
  // }

}
