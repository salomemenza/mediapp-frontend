import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { SignoVital } from '../_model/signoVital';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignoService extends GenericService<SignoVital> {

  private signoVitalCambio = new Subject<SignoVital[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signos-vitales`);
   }

  //get Subjects
  getSignoCambio() {
    return this.signoVitalCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setSignoCambio(signo: SignoVital[]) {
    this.signoVitalCambio.next(signo);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

}
