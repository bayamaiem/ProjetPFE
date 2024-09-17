import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Code } from '../models/code';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient) { }


  saveCode(inputData: any): Observable<any> {
    return this.httpClient.post(AUTH_API + '/storecode', inputData);
  }
  getCodes(userId: number): Observable<{ Codes: Code[] }> {
    return this.httpClient.get<{ Codes: Code[] }>(`${AUTH_API }/getCodes`);
  }

  getCode(CodeId: number): Observable<{ Codes: Code[] }> {
    return this.httpClient.get<{ Codes: Code[] }>(`${AUTH_API }/getCode/${CodeId}`);
  }

  deletCodes(CodeId: number): Observable<{ Codes: Code[] }> {
    return this.httpClient.delete<{ Codes: Code[] }>(`${AUTH_API }/code/${CodeId}/delete`);
}

checkCodeinContainerTransformer(inputData: any): Observable<any> {
  return this.httpClient.post(`${AUTH_API}/checkCodeinContainerTransformer`, inputData);
}
checkCodeinContainer(inputData: any): Observable<any> {
  return this.httpClient.post(`${AUTH_API}/checkCodeinContainer`, inputData);
}

updateCode(inputData: object, codeId: number): Observable<any> {
  return this.httpClient.put(`${AUTH_API}/code/${codeId}/edit`, inputData);
}

checkCode(inputData: object): Observable<any> {
  return this.httpClient.post(`${AUTH_API}/checkCode`, inputData);
}
}
