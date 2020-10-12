import { Requerimientos, Requerimientosinfo } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Tallas, EmpList } from '../interfaces/interfaces';
import { URL_CONSULTA } from '../../config/url.servicios';
import { URL_TRANSAC } from './../../config/url.servicios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AproReqService {
  Reque: Requerimientos[];
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage,
              public loadingController: LoadingController) { }

  getListaRequerimientos(numero: string, inicio: string, fin: string, usuario: string, fresco: number, web: number) {
    let number = 0;
    let ini = '';
    let fini = '';
      if (numero === '')
      {
        number = null;
      }
      else {
        number = Number(numero);
      }
    
    if (inicio === '') {
      ini = null;
    }
    else {
      ini = inicio;
    }

    if (fin === '') {
      fini = null;
    }
    else {
      fini = fin;
    }

    console.log('hola',number,ini,fini)

    let data = {
                sp: 'sp_RequerimientosPendientesAprobar',
                 parameters : 'numero:' + number + ':Int|FechaInicio:' + ini
                 + ':Date|FechaFin:' + fini
                 + ':Date|Usuario:'+ usuario
                 + ':VARCHAR|SoloFresco:'+ fresco
                 + ':VARCHAR|EsPorWeb:'+ web
                 + ':VARCHAR|',
                 connection: 'DESAPRODUCCION'
       };
    return  this.http.post<Requerimientos[]>(URL_CONSULTA, data);
  }
  
  getInfoRequerimientos(requerimiento: number,web:number) {
    let data = {
                sp: 'sp_RequerimientoObtener',
                 parameters : 'Requerimiento:' + requerimiento + ':Int||EsPorWeb:'+ web
                 + ':VARCHAR|',
                 connection: 'DESAPRODUCCION'
       };
    return  this.http.post<Requerimientosinfo[]>(URL_CONSULTA, data);
  }
  

  guardarRequerimiento(xml: string, usuario: string) {
    const data = {
      sp: 'sp_RequerimientosAprobar',
      parameters : 'InfoXml:' + xml + ':xml|Usuario:' + usuario
      + ':Varchar|',
      connection: 'DESAPRODUCCION'
    };
    return this.http.post(URL_TRANSAC, data).pipe(map(async (resp: any) => {
      if (resp[0].error === 'true') {
        const alert = await this.alertController.create({
          header: 'Error!',
          message: resp[0].mensaje,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Guardado Exitoso!!',
          message: 'La transacción se ha realizado con exito.',
          buttons: ['OK']
        });
        await alert.present();
       }
    }));
  }
}

