import { Requerimientos } from './../../interfaces/interfaces';
import { AprobInfoPage } from './../aprob-info/aprob-info.page';
import { AproReqService } from './../../services/apro-req.service';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-aprob-req',
  templateUrl: './aprob-req.page.html',
  styleUrls: ['./aprob-req.page.scss'],
})
export class AprobReqPage implements OnInit {

  rows:Requerimientos[] = [];
  columns = [];
  selected = [];
  FechaInicio:string = '';
  FechaFin: string= '';
  producto: string = '';
  isChecked: boolean;
  user: string = '';
  loading: any = this.loadingController.create();
  Inicio: Date = new Date();
  Fin: Date = new Date();
  textoBuscar: string = '';
  temp: Requerimientos[] = [];
  buscar: string = '';
  
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  constructor(public _requerimientos: AproReqService
            , private datePipe: DatePipe
            , private modalCtrl: ModalController
            ,public alertController: AlertController
            ,public loadingController: LoadingController
            ,public loginuser: LoginService) {

    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      { prop: 'Requerimiento',name: 'Requerimiento'},
      { prop: 'factura', name:'factura' },
      /*{ prop: 'corigen', name: 'corigen' },*/
      {prop: 'Requerimiento', name: 'Actions'},
    ]


      /*this.rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' }
      ];*/
    //this.getreque();
  }

  getRowClass = (row) => {
    console.log('rowClass')
    return {
     'row-color': row.Excepcion === "R"
   };
  }
   
  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return this.loading.present();
  }

  getreque() {
    this._requerimientos.getListaRequerimientos(null,'2020-08-01','2020-09-30','ADMINISTRA',1,0).subscribe((resp) => {
      this.rows = resp;
    });
  }

  ngOnInit() {
  }
  onSelect(row) {
    console.log(row)
  }
  onClick( e ) {
    if ( e.type == "click" ) {
        console.log(e.row);
    }
  } 
  cambioFechaIni(event) {
    //console.log('ionchange', event.detail.value)
    this.FechaInicio = this.datePipe.transform(event.detail.value, 'yyyy-MM-dd'); 
    console.log('Inicio', this.FechaInicio)
  }
  cambioFechaFIn(event) {
    //console.log('ionchange', event.detail.value)
    this.FechaFin = this.datePipe.transform(event.detail.value, 'yyyy-MM-dd'); 
    console.log('fin', this.FechaFin)
    console.log('check', this.isChecked)
  }

  Buscar_Req() {
    this.loading = this.presentLoading('Cargando..');
    let fresco;
    if (this.isChecked === true) {
      fresco = 1;
    }
    else {
      fresco = 0;
    }
    this.disselect();
    this._requerimientos.getListaRequerimientos(this.producto,this.FechaInicio,this.FechaFin,'ADMINISTRA',fresco,0).subscribe((resp) => {
      this.rows = resp;
      this.temp = [...resp];
      console.log(this.rows);
      this.limpiar2();
      this.loading.dismiss();
    }); 
  }

  async onClickRow(row) {
    let requerimiento = row.Requerimiento;
    console.log('mi row',row.Requerimiento);
    const modal = await this.modalCtrl.create({
      component: AprobInfoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'requerimiento': requerimiento,
      }
    });
    return await modal.present();
  
  }



  GuardarDatos() {
    this.user  = this.loginuser.getuser();
    if (this.user === '') {
      this.user = 'ADMINISTRA';
    }
    
    let xml = '<?xml version=\'1.0\' standalone=\'yes\' ?>  \n';
    xml = xml + '<Tabla>  \n';
    for (let item of this.selected) {
      xml = xml + '<detalle> \n';
      xml = xml + '<Requerimiento>' + item.Requerimiento + '</Requerimiento> \n';
      xml = xml + '</detalle> \n';

    }
    xml = xml + '</Tabla>';
    this.loading = this.presentLoading('Guardando');
    console.log(xml);
    this._requerimientos.guardarRequerimiento(xml, this.user).subscribe(() => {
      this.loading.dismiss();
      this.limpiar();
      });
  }


  limpiar() {
    this.selected = [];
    this.rows = [];

    this.FechaInicio = '';
    this.FechaFin = '';
    this.producto = '';
    this.isChecked = false; 
    this.Inicio = null;
    this.Fin = null;
    this.limpiar2();
  }

  limpiar2() {
    this.buscar = '';
  }
  disselect() {
    this.selected = [];
  }

  updateFilter(event) {
    const val = event.target.value.toUpperCase();
    console.log('val',val)

    // filter our data
    const temp = this.temp.filter(function (d) {
      //return d.Requerimiento.indexOf(val) !== -1 || !val;

      return d.Requerimiento.includes(val)||d.factura.includes(val);

    });

    console.log(temp);
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  clearIni() {
    this.Inicio = null;
  }

  clearFin() {
    this.Fin = null;
  }


}
