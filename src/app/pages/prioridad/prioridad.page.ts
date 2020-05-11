import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpList, Prioridad, Colum } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ListaempService } from '../../services/listaemp.service';
import { DatosService } from '../../services/datos.service';
import { AlertController, LoadingController, NumericValueAccessor, IonInfiniteScroll } from '@ionic/angular';
import { PrioridadService } from '../../services/prioridad.service';
import { debug } from 'util';



@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.page.html',
  styleUrls: ['./prioridad.page.scss'],
})
export class PrioridadPage implements OnInit {
  Talla: string = '';
  Columna: string = '';
  Prioridad: Prioridad[] = [];
  textoBuscar: string = '';
  loading :any = this.loadingController.create();
  colums: Colum[] = [{id : 'A', descri: 'A'}, {id : 'B', descri: 'B'},{ id : 'C', descri: 'C'} ];
  constructor(private _data: DatosService,
              private _prioridad: PrioridadService,
              public alertController: AlertController,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return  this.loading.present();
  }
  busquedaPrioridad() {
    this.loading = this.presentLoading('Cargando');
    this._prioridad.getListaTallaPrioridad(this.Talla, this.Columna).subscribe((resp) => {
      this.Prioridad = resp;
      this.loading.dismiss();
    });
    console.log(this.Prioridad);
  }

  BuscarFactura( event){
    const texto = event.target.value;
    this.textoBuscar = texto;
    console.log(texto);

  }

  GuardarDatos() {
    this.loading = this.presentLoading('Guardando');
    let xml = '<?xml version=\'1.0\' standalone=\'yes\' ?>  \n';
    xml = xml + '<Tabla>  \n';
    for (let item of this.Prioridad) {
      xml = xml + '<detalle> \n';
      xml = xml + '<dpp_codPP>' + item.Planta + '</dpp_codPP> \n';
      xml = xml + '<dpp_codpedido>' + item.CodPed + '</dpp_codpedido> \n';
      xml = xml + '<dpp_pedido>' + item.Ped + '</dpp_pedido> \n';
      xml = xml + '<dpp_coddetpedido>' + item.detpedido + '</dpp_coddetpedido> \n';
      xml = xml + '<dpp_codprod>' + item.CodProd + '</dpp_codprod> \n';
      xml = xml + '<dpp_codtalla>' + item.tal_codigo + '</dpp_codtalla> \n';
      xml = xml + '<dpp_columna>' + item.columna + '</dpp_columna> \n';
      xml = xml + '<dpp_prioridad>' + item.prioridad + '</dpp_prioridad> \n';
      xml = xml + '</detalle> \n';

    }
    xml = xml + '</Tabla>';
    console.log(xml);
    /*this._prioridad.guardarPrioridad(xml, 'Administra').subscribe(() => {
        this.loading.dismiss();
      });*/
  }

}
