import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignoVital } from '../../../_model/signoVital';
import { Paciente } from '../../../_model/paciente';
import { Observable } from 'rxjs';
import { PacienteService } from 'src/app/_service/paciente.service';

interface modalSigno {
  operacion: String,
  signo: SignoVital
}

@Component({
  selector: 'app-modal-signo',
  templateUrl: './modal-signo.component.html',
  styleUrls: ['./modal-signo.component.css']
})
export class ModalSignoComponent implements OnInit {
  form: FormGroup;
  signoVital: SignoVital;
  pacientes: Paciente[];
  paciente:Paciente;
  //pacientes$: Observable<Paciente[]>;

  constructor(
    public dialogRef: MatDialogRef<ModalSignoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: modalSigno,
    public pacienteService: PacienteService
  ) { 
    
  }

  ngOnInit(): void {
    this.listarPacientes();
    this.signoVital = {...this.data.signo};
    
    this.form = new FormGroup({
      'id': new FormControl(0),
      'paciente': new FormControl(''),
      'fecha': new FormControl(''),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl('')
    });

    if(this.data.operacion !== 'CREAR'){
      this.form.get("id").setValue(this.signoVital.idSignoVital);
      
      //this.form.get("paciente").setValue(this.signoVital.paciente);
      this.form.get("fecha").setValue(this.signoVital.fecha);
      this.form.get("temperatura").setValue(this.signoVital.temperatura);
      this.form.get("pulso").setValue(this.signoVital.pulso);
      this.form.get("ritmo").setValue(this.signoVital.ritmoRespiratorio);
    }
  }

  listarPacientes() {
    //this.pacientes$ = this.pacienteService.listar();
    this.pacienteService.listar().subscribe(result=>{
      this.pacientes = result;
      this.paciente = this.signoVital.paciente;
    });
  }

  compareObjects(object1: any, object2: any){
    return object1 && object2 && object1.idPaciente == object2.idPaciente;
  }

  enviar(){
    if(this.data.operacion == 'CREAR'){
      this.signoVital.idSignoVital = null;
    }else{
      this.signoVital.idSignoVital = this.form.get("id").value;
    }
    this.signoVital.paciente = this.form.get("paciente").value;
    this.signoVital.fecha = this.form.get("fecha").value;
    this.signoVital.temperatura = this.form.get("temperatura").value;
    this.signoVital.pulso = this.form.get("pulso").value;
    this.signoVital.ritmoRespiratorio = this.form.get("ritmo").value;

    this.dialogRef.close({operacion: this.data.operacion, data: this.signoVital});
  }

}
