import { Component, OnInit, ɵConsole } from '@angular/core';
import { Tallas } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { DatosService } from '../../services/datos.service';


@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.page.html',
  styleUrls: ['./empaque.page.scss'],
})
export class EmpaquePage implements OnInit {
  producto: string = '';
  tallaselec: Number= 0;
  tallaVenta: Number = 0;
  tallas: Observable<Tallas[]>;
  tallasVentas: Observable<Tallas[]>;
  saldoActual: Number = 0;
  cantidad: Number;
  clase:string =  '';

  constructor(private _data: DatosService) { }

  ngOnInit() {
  }
  OnBlur(event) {
    console.log(event.target.value);
    const prd: string = event.target.value;
    this.tallas = this._data.getTallasxProducto(prd);
  }
  OnChange(event) {
    const id: number = event.target.value;
    this.tallasVentas = null;
    this.tallasVentas = this._data.getTallasxVenta(this.producto, id);
  }
  OnChangeVen(event) {
    const id: number = event.target.value;
    this._data.getSaldo( this.producto, id ).subscribe((data: Response) => {
      this.saldoActual = data[0].Saldo;
    });
    this._data.getClase( this.producto ).subscribe((data: Response) => {
      if (data[0].clase != null) {
        this.clase = data[0].clase;
      }
      else {
        this.clase = '';
      }
    });


  }
  Guardar() {
    console.log(this.producto, this.tallaVenta, this.tallaselec, this.cantidad);
    this._data.guardarOe(this.producto, this.tallaVenta, this.tallaselec, this.cantidad)
                        .subscribe(() => {
                          console.log(this._data.valido);
                          if (this._data.valido === 'true') {
                              this.limpiar();
                          }
                        });
  }

  limpiar() {
    this.producto = '';
    this.tallaselec = 0;
    this.tallaVenta = 0;
    this.tallas = null;
    this.tallasVentas = null;
    this.saldoActual = 0;
    this.cantidad = null;
    this.clase = '';


  }


}
