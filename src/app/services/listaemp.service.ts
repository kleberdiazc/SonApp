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
export class ListaempService {
  EmpList: EmpList[];
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage,
              public loadingController: LoadingController) { }

  getListaTalla(producto: string) {
    let data = {
                sp: 'sp_buscar_ListEm',
                 parameters : 'produc:' + producto + ':Varchar|'
       };
    return  this.http.post<EmpList[]>(URL_CONSULTA, data);
    }

    obenerLista() {
      return this.EmpList;
    }
    guardarOe(xml: string, usuario: string) {
      const data = {
        sp: 'spr_grabaInstrucGlobalesMovil',
        parameters : 'xml:' + xml + ':xml|USER:' + usuario
        + ':Varchar|'
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
