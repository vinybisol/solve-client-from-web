import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CNPJResponse } from '../Interfaces/CNPJ-response-interface';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private readonly URL = environment.apiUrl;
  httpClient = inject(HttpClient);

  loadBranchData(cnpj: string): Observable<CNPJResponse> {
    return this.httpClient.get<CNPJResponse>(`${this.URL}/cnpj/${cnpj}`);
  }
}