import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Address } from './../models/address.model';

@Injectable()
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }

  //viacep.com.br/ws/01001000/json/
  getAddressByZipCode(zipcode: string): Observable<Address> {
    return this.httpClient.get<Address>(`https://viacep.com.br/ws/${zipcode}/json/`);
  }
  //viacep.com.br/ws/RS/Porto Alegre/Domingos/json/ 
  getAddressByName(uf,localidade,logradouro : string): Observable<Address> {
    return this.httpClient.get<Address>(`https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json/`);
  }

}

