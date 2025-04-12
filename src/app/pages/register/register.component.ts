import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { BranchesFormComponent } from './branches/branches-form/branches-form.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { ArgoModulesDistributionInterface, ArgoModulesInterface, BranchesInterface, RegisterInterface } from './interfaces/register-interface';
import { BranchesWithPixOrTef, OtherInformationsFormComponent } from './other-informations-form/other-informations-form.component';
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
  public branchesWithTef: FormGroup;

  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);

  constructor() {
    this.branches = this.formBuilder.array<FormGroup<BranchesInterface>>([]);
    this.branchesWithTef = this.formBuilder.group<any>({});
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
      hasTef: this.formBuilder.control<boolean>(false),
      tefAdiquirente: this.formBuilder.control<string>(''),
      branchesWithTef: this.formBuilder.group<any>([]),
      hasPix: this.formBuilder.control<boolean>(false),
      branchesWithPix: this.formBuilder.group<any>([]),
      argoModules: this.formBuilder.group<ArgoModulesInterface>({
        argo360Custom: this.formBuilder.control<boolean>(false),
        argo360: this.formBuilder.control<boolean>(false),
        customerPortal: this.formBuilder.control<boolean>(false),
      }),
      argoModulesDistribution: this.formBuilder.group<ArgoModulesDistributionInterface>({
        ipirangaAmPm: this.formBuilder.control<boolean>(false),
        ipitangaPista: this.formBuilder.control<boolean>(false),
        ipirangaFrotas: this.formBuilder.control<boolean>(false),
        ipirangaJetOil: this.formBuilder.control<boolean>(false),
        vibraGasStaion: this.formBuilder.control<boolean>(false),
        vibraMania: this.formBuilder.control<boolean>(false),
        shellBox: this.formBuilder.control<boolean>(false),
        shellSelect: this.formBuilder.control<boolean>(false),
      }),
    });

    this.addBranch();
  }

  addBranch() {
    this.branches.push(this.formBuilder.group<BranchesInterface>({
      id: this.formBuilder.control<string>('', []),
      name: this.formBuilder.control<string>(''),
      branchNumber: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      branchCNPJ: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      branchName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchFantasy: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchCity: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      branchState: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      branchPhone: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      branchLaw: this.formBuilder.control<string>('Lucro Real'),
      branchType: this.formBuilder.control<string>('Posto'),
      branchTypeOthers: this.formBuilder.control<string>(''),
      branchContactEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      branchChargeEmail: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      branchSocialContract: this.formBuilder.control<boolean>(false),
      branchDigitalCertified: this.formBuilder.control<boolean>(false),
      branchLogotype: this.formBuilder.control<string>('Não'),

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
    content += 'Nome do Proprietário: ' + this.myform?.value?.propertyOwnerName + '\n';
    content += 'Telefone do Proprietário: ' + this.myform?.value?.propertyOwnerPhone + '\n';
    content += 'Email do Proprietário: ' + this.myform?.value?.propertyOwnerEmail + '\n';
    content += this.getTef() + '\n';
    content += this.getPix() + '\n';
    content += this.getArgoModules() + '\n';
    content += this.getArgoDistributionsModules() + '\n';
    content += 'OBS Distribuidora: ' + this.myform?.value?.otherInformations + '\n';



    this.registerService.downloadStringAsFile(content);
  }
  getArgoDistributionsModules() {
    let text = 'Módulos Distribuidora: ';
    const argoModulesDistribution = this.myform.get('argoModulesDistribution') as FormGroup<any>;
    Object.keys(argoModulesDistribution.value).forEach((key) => {
      if (argoModulesDistribution.value[key] === true) {
        if (text.length > 23) {
          text += ', ';
        }
        if (key === 'ipitangaPista') {
          text += 'Ipiranga Pista';
        } else if (key === 'ipirangaFrotas') {
          text += 'Ipiranga Frotas';
        } else if (key === 'ipirangaJetOil') {
          text += 'Ipiranga Jet Oil';
        } else if (key === 'shellBox') {
          text += 'Shell Box';
        } else if (key === 'shellSelect') {
          text += 'Shell Select';
        } else if (key === 'ipirangaAmPm') {
          text += 'Ipiranga Am/Pm';
        } else if (key === 'vibraGasStaion') {
          text += 'Vibra Posto';
        } else if (key === 'vibraMania') {
          text += 'Vibra Mania';
        }
      }
    });
    return text;
  }
  getArgoModules() {
    let text = 'Módulos Argo: ';
    const argoModules = this.myform.get('argoModules') as FormGroup<any>;
    Object.keys(argoModules.value).forEach((key) => {
      if (argoModules.value[key] === true) {
        if (text.length > 14) {
          text += ', ';
        }
        if (key === 'argo360Custom') {
          text += 'Argo 360 Customizado';
        } else if (key === 'customerPortal') {
          text += 'Portal do Cliente';
        } else if (key === 'argo360') {
          text += 'Argo 360';
        }
      }
    });
    return text;
  }
  getTef() {
    const hasTef = this.myform?.value?.hasTef === true;
    if (hasTef) {
      let text = `TEF: Sim - `;
      const branchesWithTef = this.myform.get('branchesWithTef') as FormGroup<any>;
      Object.keys(branchesWithTef.value).forEach((key) => {
        console.log(key, branchesWithTef.value[key]);
        if (branchesWithTef.value[key] === true) {
          const branch = this.branches?.controls[Number(key)];
          const branchNumber = branch.get('branchNumber')?.value;
          const number = branchNumber ? branchNumber : Number(key) + 1;
          if (text.length > 12) {
            text += ', ';
          }
          text += `F${number}`;
        }
      });
      text += '\n';
      text += `Adquirente: ${this.myform?.value?.tefAdiquirente}`;
      return text;
    }
    return 'TEF: Não';
  }
  getPix() {
    const hasPix = this.myform?.value?.hasPix === true;
    if (hasPix) {
      let text = `Pix Integrado: Sim - Verde Card - `;
      const branchesWithPix = this.myform.get('branchesWithPix') as FormGroup<any>;
      Object.keys(branchesWithPix.value).forEach((key) => {
        console.log(key, branchesWithPix.value[key]);
        if (branchesWithPix.value[key] === true) {
          const branch = this.branches?.controls[Number(key)];
          const branchNumber = branch.get('branchNumber')?.value;
          const number = branchNumber ? branchNumber : Number(key) + 1;
          if (text.length > 34) {
            text += ', ';
          }
          text += `F${number}`;
        }
      });
      return text;
    }
    return 'Pix Integrado: Não';
  }

  getSingleOuCentralized(): string {
    if (this.isSingleBranch()) {
      return 'Posto Simples';
    }

    let text = `Central com ${this.branches.length} unidades de negocio`;
    this.branches?.controls.forEach((branch) => {
      text += `\nF${branch.get('branchNumber')?.value} - ${branch.get('branchName')?.value}`;
    });
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
