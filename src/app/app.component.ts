import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ViaCepService } from './services/via-cep.service';

import { Address } from './models/address.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  zipcodeModel = '';
  ufModel = '';
  localidadeModel = '';
  logradouroModel = '';
  zipcodeMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  searchAddress: Address;

  constructor(
    private toastr: ToastrService,
    private viaCepService: ViaCepService
  ) { }
  
  onClickUfcode(uf,localidade,logradouro: string){
    this.viaCepService.getAddressByName(uf,localidade,logradouro)
    .subscribe(

    )

  }
  onClickZipcode(zipcode: string) {
    zipcode = zipcode.replace('-', '');

    if (this.verifyZipcode(zipcode)) {
      this.viaCepService.getAddressByZipCode(zipcode)
        .subscribe(
          address => {
            if (address.erro === true) {
              this.searchAddress = undefined;
              this.toastr.warning('CEP não encontrado.', 'Ops...');
            } else {
              this.searchAddress = address;
            }
          },
          error => {
            this.toastr.error('Error: ${error.message}.', 'Ops...');
            this.searchAddress = undefined;
          }
        );
    } else {
      this.toastr.error('Entre com um CEP válido.', 'Ops...');
      this.searchAddress = undefined;
    }
  }

  verifyZipcode(zipcode: string): boolean {
    if (zipcode.length === 8) {
      return true;
    }

    return false;
  }

}
