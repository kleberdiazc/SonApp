import { Component, OnInit } from '@angular/core';
import { EmpList } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ListaempService } from '../../services/listaemp.service';
import { DatosService } from '../../services/datos.service';
import { AlertController, LoadingController, NumericValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-empaque-list',
  templateUrl: './empaque-list.page.html',
  styleUrls: ['./empaque-list.page.scss'],
})
export class EmpaqueListPage implements OnInit {
  producto: string = '';
  EmpList: EmpList[] = [];
  loading :any = this.loadingController.create();
  A: number = 0;
  B: number = 0;
  C: number = 0;
  chbox: number = 0;
  constructor(private _data: DatosService,
              private _list: ListaempService,
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
  OnBlur(event) {
    this.A = 0;
    this.B = 0;
    this.C = 0;
    this.loading = this.presentLoading('Cargando');
    const prd: string = event.target.value;
    this._list.getListaTalla(prd).subscribe((resp) => {
      this.EmpList = resp;
      this.ChangeValuesColumn();
      this.loading.dismiss();
    });
    this.chbox = 0;
  }
  OnChangeBox(event) {
    const state: boolean =  event.target.checked;
    for (let item of this.EmpList) {
      item.isChecked = state;
    }
  }

  OnChangeRad(event) {
    if (this.EmpList.length > 0) {
    const state: string =  event.target.value;
    this.ChangeValuesRadio(state);
    this.ChangeValuesRadioB(state);
    }
  }

   Grabar() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: '<strong>¿Está Seguro de Grabar?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.GuardarDatos();
          }
        }
      ]
    });

    await alert.present();
  }

  GuardarDatos() {
    this.loading = this.presentLoading('Guardando');
    let xml = '<?xml version=\'1.0\' standalone=\'yes\' ?>  \n';
    xml = xml + '<Tabla>  \n';
    for (let item of this.EmpList) {
      let agregado;
      let detA;
      let detB;
      let detC;
      if (item.isChecked === true) {
        agregado = 1;
      } else {
        agregado = 0;
      }
      if (item.isA === true) {
        detA = 1;
      } else {
        detA = 0;
      }
      if (item.isB === true) {
        detB = 1;
      } else {
        detB = 0;
      }
      if (item.isC === true) {
        detC = 1;
      } else {
        detC = 0;
      }
      xml = xml + '<detalle> \n';
      xml = xml + '<agregado>' + agregado + '</agregado> \n';
      xml = xml + '<planta>' + '1' + '</planta> \n';
      xml = xml + '<detpedido>' + item.sectab + '</detpedido> \n';
      xml = xml + '<producto>' + this.producto + '</producto> \n';
      xml = xml + '<codtalla>' + item.idtal + '</codtalla> \n';
      xml = xml + '<codtallavta>' + item.idtalv + '</codtallavta> \n';
      xml = xml + '<masters>' + item.Cantidad + '</masters> \n';
      xml = xml + '<Column_A>' + item.A + '</Column_A> \n';
      xml = xml + '<Column_B>' + item.B + '</Column_B> \n';
      xml = xml + '<Column_C>' + item.C + '</Column_C> \n';
      xml = xml + '</detalle> \n';

    }
    xml = xml + '</Tabla>';
    console.log(xml);
    this._list.guardarOe(xml, 'Administra').subscribe(() => {
        this.loading.dismiss();
        console.log('Grabado Exitoso');
      });
  }

  ChangeValuesColumn() {
    for(let item of this.EmpList) {
      if (item.A ===  0 && item.B === 0 && item.C === 0) {
          if (item.pro_clasepago === 'A') {
            item.A = 1;
          } else if (item.pro_clasepago === 'B') {
            item.B = 1;
          } else if (item.pro_clasepago === 'C') {
            item.C = 1;
          }
      }
    }
  }

  ChangeValuesRadio(valor) {
    for(let item of this.EmpList) {
          if (valor === 'A') {
            item.A = 1;
            item.B = 0;
            item.C = 0;
          } else if (valor === 'B') {
            item.B = 1;
            item.A = 0;
            item.C = 0;
          } else if (valor === 'C') {
            item.C = 1;
            item.B = 0;
            item.A = 0;
          } else {
            item.A = 0;
            item.B = 0;
            item.C = 0;
          }
    }
  }

  ChangeValuesRadioB(state) {
    if (state  === 'A') {
      this.A = 1;
      this.B = 0;
      this.C = 0;
    } else if (state  === 'B') {
      this.A = 0;
      this.B = 1;
      this.C = 0;
    } else if (state  === 'C') {
      this.A = 0;
      this.B = 0;
      this.C = 1;
    } else {
      this.A = 0;
      this.B = 0;
      this.C = 0;
    }
  }

  OnChangeRaitem(event, i) {
    const state: string =  event.target.value;
    for (let index = 0; index < this.EmpList.length; index++) {
      const element = this.EmpList[index];
      if (index === i) {
        if (state === 'A') {
          element.A = 1;
          element.B = 0;
          element.C = 0;
        } else if (state === 'B') {
          element.B = 1;
          element.A = 0;
          element.C = 0;
        } else if (state === 'C') {
          element.C = 1;
          element.B = 0;
          element.A = 0;
        } else {
          element.A = 0;
          element.B = 0;
          element.C = 0;
        }
      }
    }
  }

}


