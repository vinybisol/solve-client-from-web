import { FormControl } from "@angular/forms";

export default interface RegisterInterface {
    startDate: FormControl<string | null>;
    saller: FormControl<string | null>;
    startType: FormControl<string | null>;
    systemConversion: FormControl<string | null>;
    whatConverterProducts: FormControl<boolean | null>;
    whatConverterClients: FormControl<boolean | null>;
    whatConverterSuppliers: FormControl<boolean | null>;
    conversionData: FormControl<string | null>;
    databaseLink: FormControl<string | null>;
    accountingName: FormControl<string | null>;
    accountingCNPJ: FormControl<string | null>;
    accounterName: FormControl<string | null>;
    accounterCPF: FormControl<string | null>;
    accounterCRC: FormControl<string | null>;
    accountingPhone: FormControl<string | null>;
    accountingEmail: FormControl<string | null>;
    digitalCertificate: FormControl<string | null>;
    digitalCertificatePassword: FormControl<string | null>;
    socialContract: FormControl<string | null>;
    propertyOwnerName: FormControl<string | null>;
    propertyOwnerPhone: FormControl<string | null>;
    propertyOwnerEmail: FormControl<string | null>;
    otherInformations: FormControl<string | null>;
}