import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SignoVital } from 'src/app/_model/signoVital';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SignoService } from '../../_service/signo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalSignoComponent } from './modal-signo/modal-signo.component';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  displayedColumns = ['idSignoVital', 'paciente', 'fecha', 'pulso', 'ritmo', 'temperatura','acciones'];
  dataSource: MatTableDataSource<SignoVital>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private signoService: SignoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.signoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signoService.getSignoCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });
  }

  eliminar(Signo: SignoVital){
    this.signoService.eliminar(Signo.idSignoVital).pipe(switchMap(() => {
      return this.signoService.listar();
    })).subscribe(data => {
      this.signoService.setSignoCambio(data);
      this.signoService.setMensajeCambio('Se eliminó');
    });
  }

  abrirModal(operacion: String, data: SignoVital){
    let dataVacia : SignoVital = new SignoVital();
    let dialogRef = this.dialog.open(ModalSignoComponent, {
      disableClose: true,
      width: '750px',
      data: {
        operacion: operacion,
        signo: (operacion == 'CREAR')? dataVacia: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.operar(result.operacion, result.data);
      }
    });
  }

  operar(operacion:string, signoVital: SignoVital) {
    if (operacion !== 'CREAR') {
      //BUENA PRACTICA
      this.signoService.modificar(signoVital).pipe(switchMap(() => {
        return this.signoService.listar();
      })).subscribe(signo => {
        this.signoService.setSignoCambio(signo);
        this.signoService.setMensajeCambio("Se modificó");
      });

    } else {
      //PRACTICA COMUN
      this.signoService.registrar(signoVital).subscribe(data => {
        this.signoService.listar().subscribe(signo => {
          this.signoService.setSignoCambio(signo);
          this.signoService.setMensajeCambio("Se registró");
        });
      });
    }
  }

}
