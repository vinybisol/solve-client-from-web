import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { BranchesListComponent } from './branches/branches-list/branches-list.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { OtherInformationsFormComponent } from './other-informations-form/other-informations-form.component';
import { RegisterService } from './service/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import RegisterInterface from './interfaces/register-interface';

@Component({
  selector: 'app-register',
  imports: [CommonModule, GeneralFormComponent, AccountingFormComponent, MatCardModule, BranchesListComponent, OtherInformationsFormComponent, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: []
})
export class RegisterComponent {
  @ViewChild(BranchesListComponent) branchesLists: BranchesListComponent | undefined;
  public myform!: FormGroup<RegisterInterface>;
  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);

  ngOnInit(): void {
    this.myform = this.formBuilder.group<RegisterInterface>({
      //generalForm
      startDate: this.formBuilder.control<string>(new Date().toISOString(), [Validators.required]),
      saller: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      startType: this.formBuilder.control<string>(''),
      systemConversion: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      whatConverterClients: this.formBuilder.control<boolean>(false),
      whatConverterProducts: this.formBuilder.control<boolean>(false),
      whatConverterSuppliers: this.formBuilder.control<boolean>(false),
      conversionData: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      databaseLink: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

      //branchesForm
      branchNumber: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),

      //accountingForm
      accountingName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      accountingCNPJ: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      accounterName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      accounterCPF: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      accounterCRC: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      accountingPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      accountingEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),

      //otherInformations Form
      digitalCertificate: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      digitalCertificatePassword: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      socialContract: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      propertyOwnerName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      propertyOwnerPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      propertyOwnerEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      otherInformations: this.formBuilder.control<string>(''),
    });

  }


  onReset() {
    window.location.reload();
  }

  onSave() {

    let localDateString = null;
    if (this.myform?.value?.startDate) {
      const localDate = new Date(this.myform?.value?.startDate);
      localDateString = localDate.toLocaleDateString('pt-BR')
    }


    let content = '';
    content += '----------------------------------------------------------------------------------------------------\n';
    content += 'Start Date: ' + localDateString + '\n';
    content += 'Vendedor: ' + this.myform?.value?.saller + '\n';
    content += 'Start: ' + this.myform?.value?.startType + '\n';
    content += 'Nome do sistema atual: ' + this.myform?.value?.systemConversion + '\n';
    content += 'Dados para converter: ' + this.getDataToConvert() + '\n';
    content += 'Link da base: ' + this.myform?.value?.databaseLink + '\n';
    content += '----------------------------------------------------------------------------------------------------\n';
    content += 'Nome da Contabilidade: ' + this.myform?.value?.accounterName + '\n';
    content += 'CNPJ: ' + this.myform?.value?.accountingCNPJ + '\n';
    content += 'Nome Contador: ' + this.myform?.value?.accounterName + '\n';
    content += 'CPF: ' + this.myform?.value?.accounterCPF + '\n';
    content += 'CRC: ' + this.myform?.value?.accounterCRC + '\n';
    content += 'Telefone: ' + this.myform?.value?.accountingPhone + '\n';
    content += 'E-mail: ' + this.myform?.value?.accountingEmail + '\n';
    this.branchesLists?.formControls.forEach((branch) => {
      content += '----------------------------------------------------------------------------------------------------\n';
      content += 'Numero da Filial: ' + branch.branchNumber + '\n';
      content += 'CNPJ: ' + branch.branchCNPJ + '\n';
      content += 'Nome da Filial: ' + branch.branchName + '\n';
      content += 'Fantasia: ' + branch.branchFantasy + '\n';
      content += 'ID: ' + branch.branchCSCID + '\n';
      content += 'Token: ' + branch.branchCSCToken + '\n';
      content += 'Telefone: ' + branch.branchPhone + '\n';
      content += 'E-mail: ' + branch.branchEmail + '\n';
      content += 'Regime Tributário: ' + branch.branchLaw + '\n';
      content += 'Posto é Participante do ROT: ' + branch.branchROT + '\n';
      content += '----------------------------------------------------------------------------------------------------\n';
      content += 'Agencia: ' + branch.bankAgency + '\n';
      content += 'Conta: ' + branch.bankCheckingAccount + '\n';
      content += 'Contato do Gerente: ' + branch.bankManagerName + '\n';
      content += 'Nome do Gerente: ' + branch.bankManagerName + '\n';
    });
    content += '----------------------------------------------------------------------------------------------------\n';
    content += 'Certificado Digital: ' + this.myform?.value?.digitalCertificate + '\n';
    content += 'Senha do Certificado Digital: ' + this.myform?.value?.digitalCertificatePassword + '\n';
    content += 'Contrato Social:' + this.myform?.value?.socialContract + '\n';
    content += 'Certificado Digital: ' + this.myform?.value?.digitalCertificate + '\n';
    content += '----------------------------------------------------------------------------------------------------\n';
    content += 'Logotipo\n';
    content += 'Contato do Proprietário: ' + this.myform?.value?.propertyOwnerPhone + '\n';
    content += 'Email: ' + this.myform?.value?.propertyOwnerEmail + '\n';

    this.registerService.downloadStringAsFile(content);
  }

  getDataToConvert(): string {
    const hasClients = this.myform?.value?.whatConverterClients === true ? 'Clientes' : '';
    const hasProducts = this.myform?.value?.whatConverterProducts === true ? 'Produtos' : '';
    const hasSuppliers = this.myform?.value?.whatConverterSuppliers === true ? 'Fornecedores' : '';

    let ret = '';
    if (hasClients) {
      ret += hasClients;
    }
    if (hasProducts) {
      ret += (ret.length > 0 ? ', ' : '') + hasProducts;
    }
    if (hasSuppliers) {
      ret += (ret.length > 0 ? ', ' : '') + hasSuppliers;
    }
    if (ret.length > 0) {
      return ret;
    }
    return '';
  }
}
