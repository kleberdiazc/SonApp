import { Component, OnInit, ɵConsole } from '@angular/core';
import { Tallas } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { DatosService } from '../../services/datos.service';
import { LoadingController } from '@ionic/angular';


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
  loading :any = this.loadingController.create();
  constructor(private _data: DatosService,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return  this.loading.present();
  }
  OnBlur(event) {
    this.loading = this.presentLoading('Cargando');
    console.log(event.target.value);
    const prd: string = event.target.value;
    this.tallas = this._data.getTallasxProducto(prd);
    setTimeout(() => {
      this.loading.dismiss();
    }, 1500);
  }

  OnChange(event) {
    const id: number = event.target.value;
    this.tallasVentas = null;
    this.tallasVentas = this._data.getTallasxVenta(this.producto, id);
  }
  OnChangeVen(event) {
    this.loading = this.presentLoading('Cargando');
    const id: number = event.target.value;
    this._data.getSaldo( this.producto, id ).subscribe((data: Response) => {
      this.saldoActual = data[0].Saldo;
    });
    this._data.getClase( this.producto ).subscribe((data: Response) => {
      console.log('soy data:' +  data);
      if (data[0].clase != null) {
        this.clase = data[0].clase;
      } else {
        this.clase = '';
      }
      this.loading.dismiss();
    });


  }
  Guardar() {
    this.loading =  this.presentLoading('Guardando');
    console.log(this.producto, this.tallaVenta, this.tallaselec, this.cantidad);
    this._data.guardarOe(this.producto, this.tallaVenta, this.tallaselec, this.cantidad)
                        .subscribe(() => {
                          this.loading.dismiss();
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
