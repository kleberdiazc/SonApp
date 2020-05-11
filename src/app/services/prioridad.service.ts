import { Injectable } from '@angular/core';
import { Prioridad} from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { URL_CONSULTA } from '../../config/url.servicios';
import { URL_TRANSAC } from './../../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {
  Prioridad: Prioridad[];
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage,
              public loadingController: LoadingController) { }

  getListaTallaPrioridad(talla: string,columna: string) {
    let data = {
                sp: 'SPO_DetalleOrdenEmpaque_planta_nuevo',
                 // tslint:disable-next-line:max-line-length
                 parameters : 'TipOri:' + 'Det' + ':Varchar|pro_clas01:' + 'CC' + ':Varchar|pro_clas05:' + '' + ':Varchar|tal_descri:' + talla + ':Varchar|Planta:' + '1' + ':Varchar|MostrarTodo:' + 'N' + ':Varchar|@IsWeb:' + 'S' + ':Varchar|@clase:' + 'C' + ':Varchar|@tipoColumna:' + columna + ':Varchar|',
                 connection: 'DESAPRODUCCION'
       };
    return  this.http.post<Prioridad[]>(URL_CONSULTA, data);
    }

    guardarPrioridad(xml: string, usuario: string) {
      const data = {
        sp: 'spr_grabaPrioridadPlantaProcesoOE',
        parameters : 'xml:' + xml + ':xml|USER:' + usuario
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
