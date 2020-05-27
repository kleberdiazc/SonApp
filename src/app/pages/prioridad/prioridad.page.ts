import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpList, Prioridad, Colum, Tallas } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ListaempService } from '../../services/listaemp.service';
import { DatosService } from '../../services/datos.service';
import { AlertController, LoadingController, NumericValueAccessor, IonInfiniteScroll } from '@ionic/angular';
import { PrioridadService } from '../../services/prioridad.service';
import { debug } from 'util';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.page.html',
  styleUrls: ['./prioridad.page.scss'],
})
export class PrioridadPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  Talla: string = '';
  Tallads: string = '';
  Columna: string = '';
  Prioridad: Prioridad[] = [];
  dataTallas: Tallas[] = [];
  textoBuscar: string = '';
  loading :any = this.loadingController.create();
  colums: Colum[] = [{id : 'A', descri: 'A'}, {id : 'B', descri: 'B'}, { id : 'C', descri: 'C'} ];
  keyword = 'descrip';
  valorList: number = 0;
  detTallas : Tallas[] = [];
  proclas01: string = '';
  proclas05: string = '';
  user: string = '';
  constructor(private _data: DatosService,
              private _prioridad: PrioridadService,
              public alertController: AlertController,
              public loadingController: LoadingController,
              public loginuser: LoginService) { }

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
    this._prioridad.getListaTallaPrioridad(this.Tallads, this.Columna, this.proclas01, this.proclas05)
      .subscribe((resp) => {
        this.Prioridad = resp;
        this.valorList = resp.length;
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
    this.user  = this.loginuser.getuser();
    if (this.user === '') {
      this.user = 'ADMINISTRA';
    }
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
    this._prioridad.guardarPrioridad(xml, this.user).subscribe(() => {
        this.loading.dismiss();
      });
  }

  //vieja busqueda
  BuscarTallasDes( talla: string) {
    this._prioridad.getTallas(talla).subscribe((resp) => {
      this.dataTallas = resp;
    });
    console.log(this.dataTallas);
  }

  //nueva busqueda tallas
  BuscarTallasOE( clas01, clas02) {
    this.loading = this.presentLoading('Cargando');
    this._prioridad.getTallasPrioridad(clas01, clas02).subscribe((resp) => {
      this.detTallas = resp;
      this.loading.dismiss();
    });
    console.log(this.detTallas);
  }

  limpiar2() {
    this.Prioridad = [];
    this.proclas01 = '';
    this.proclas05 = '';
    this.Tallads = '';
    this.Columna = '';
  }
  OnChangeRad(event) {
    this.limpiar2();
    const state: string =  event.target.value;
    this.generaValores(state);
  }
  generaValores(clas: string) {
    if (clas === 'CC') {
      this.proclas01 = 'CC';
      this.proclas05 = '';
      this.BuscarTallasOE('CC', '');
      this.colums = [{id : 'A', descri: 'A'}, {id : 'B', descri: 'B'}, { id : 'C', descri: 'C'} ];
    }
    if (clas === 'SC') {
      this.proclas01 = 'SC';
      this.proclas05 = '';
      this.BuscarTallasOE('SC', '');
      this.colums = [{id : 'A', descri: 'A'}, {id : 'B', descri: 'B'}];
    }
    if (clas === 'CVA') {
      this.proclas01 = 'CC';
      this.proclas05 = 'VA';
      this.BuscarTallasOE('CC', 'VA');
      this.colums = [{id : 'A', descri: 'A'}, {id : 'B', descri: 'B'}, { id : 'C', descri: 'C'} ];
    }
    if (clas === 'SVA') {
      this.proclas01 = 'CC';
      this.proclas05 = 'VA';
      this.BuscarTallasOE('SC', 'VA');
      this.colums = [{id : 'A', descri: 'A'}, {id : 'B', descri: 'B'}];
    }
  }

  /*hasta aqui sirve */

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    //console.log('Buscando ' + val);
    this.BuscarTallasDes(val);
  }
  onFocused(e){
    // do something when input is focused
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.Prioridad.length > this.valorList) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
