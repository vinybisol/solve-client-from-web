import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { BranchesFormComponent } from './branches/branches-form/branches-form.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import RegisterInterface from './interfaces/register-interface';
import { OtherInformationsFormComponent } from './other-informations-form/other-informations-form.component';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, GeneralFormComponent, AccountingFormComponent, MatCardModule, OtherInformationsFormComponent, MatButtonModule, BranchesFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: []
})
export class RegisterComponent {
  public isSingleBranch = signal<boolean>(true);
  public myform: FormGroup<RegisterInterface>;
  public branches: FormArray<FormGroup>;

  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);

  constructor() {
    this.branches = this.formBuilder.array(new Array<FormGroup>());
    this.myform = this.formBuilder.group<RegisterInterface>({
      //generalForm
      startDate: this.formBuilder.control<string>(new Date().toISOString(), [Validators.required]),
      saller: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      startType: this.formBuilder.control<string>(''),
      systemConversion: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      linkConversion: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      whatConverterClients: this.formBuilder.control<boolean>(false),
      whatConverterProducts: this.formBuilder.control<boolean>(false),
      whatConverterSuppliers: this.formBuilder.control<boolean>(false),
      conversionDataObservation: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      typeConversion: this.formBuilder.control<string>('true', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

      //branchesForm
      branches: this.branches,

      //accountingForm
      accountingName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      accountingCNPJ: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      accounterName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      accounterCPF: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      accounterCRC: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      accountingPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      accountingEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),

      //otherInformations Form
      propertyOwnerName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      propertyOwnerPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      propertyOwnerEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      otherInformations: this.formBuilder.control<string>(''),
    });

    this.addBranch();
  }

  addBranch() {
    this.branches.push(this.formBuilder.group({
      id: this.formBuilder.control<string>('', []),
      name: this.formBuilder.control<string>(''),
      branchNumber: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      branchCNPJ: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      branchName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchFantasy: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchCSCToken: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchCSCID: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
      branchPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      branchEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      branchLaw: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchROT: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

      //Bank Form
      bankNumber: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
      bankAgency: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      bankCheckingAccount: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      bankManagerName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      bankMangerPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)])
    }));
  }

  removeBranch(index: number) {
    this.branches.removeAt(index);
  }

  onChangeSingleBranchValue(isSingleBranch: boolean): void {
    this.isSingleBranch.set(isSingleBranch);
    this.replaceBranches();
  }

  replaceBranches() {
    this.branches.clear();
    this.addBranch();
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
    content += 'Conversão sistema: ' + this.myform?.value?.systemConversion + '\n';
    content += 'Importar dados: ' + this.getDataToConvert() + '\n';
    content += 'OBS Conversão: ' + this.myform?.value?.conversionDataObservation + '\n';
    content += 'Link base, ou dados para conversão: ' + this.myform?.value?.linkConversion + '\n';
    content += this.getSingleOuCentralized() + '\n';
    content += '----------------------------------------------------------------------------------------------------\n';
    content += 'Nome da Contabilidade: ' + this.myform?.value?.accounterName + '\n';
    content += 'CNPJ: ' + this.myform?.value?.accountingCNPJ + '\n';
    content += 'Nome Contador: ' + this.myform?.value?.accounterName + '\n';
    content += 'CPF: ' + this.myform?.value?.accounterCPF + '\n';
    content += 'CRC: ' + this.myform?.value?.accounterCRC + '\n';
    content += 'Telefone: ' + this.myform?.value?.accountingPhone + '\n';
    content += 'E-mail: ' + this.myform?.value?.accountingEmail + '\n';
    this.branches?.controls.forEach((branch, index) => {
      content += '----------------------------------------------------------------------------------------------------\n';
      content += `aqui vai aparecer a lista das filiaid: ${index} \n`;
      // content += 'Numero da Filial: ' + branch.branchNumber + '\n';
      // content += 'CNPJ: ' + branch.branchCNPJ + '\n';
      // content += 'Nome da Filial: ' + branch.branchName + '\n';
      // content += 'Fantasia: ' + branch.branchFantasy + '\n';
      // content += 'ID: ' + branch.branchCSCID + '\n';
      // content += 'Token: ' + branch.branchCSCToken + '\n';
      // content += 'Telefone: ' + branch.branchPhone + '\n';
      // content += 'E-mail: ' + branch.branchEmail + '\n';
      // content += 'Regime Tributário: ' + branch.branchLaw + '\n';
      // content += 'Posto é Participante do ROT: ' + branch.branchROT + '\n';
      // content += '----------------------------------------------------------------------------------------------------\n';
      // content += 'Agencia: ' + branch.bankAgency + '\n';
      // content += 'Conta: ' + branch.bankCheckingAccount + '\n';
      // content += 'Contato do Gerente: ' + branch.bankManagerName + '\n';
      // content += 'Nome do Gerente: ' + branch.bankManagerName + '\n';
    });
    content += '----------------------------------------------------------------------------------------------------\n';
    content += 'Logotipo\n';
    content += 'Contato do Proprietário: ' + this.myform?.value?.propertyOwnerPhone + '\n';
    content += 'Email: ' + this.myform?.value?.propertyOwnerEmail + '\n';

    this.registerService.downloadStringAsFile(content);
  }

  getSingleOuCentralized(): string {
    if (this.myform?.value?.typeConversion === 'posto') {
      return 'Posto Simples';
    }
    const numberOfBranches = 0;
    let text = `Central com ${numberOfBranches} unidades de negocio`;
    // this.branchesLists?.formControls.forEach((branch) => {
    //   text += `\nF${branch.branchNumber} - ${branch.branchCNPJ}`;
    // });
    return text;
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
