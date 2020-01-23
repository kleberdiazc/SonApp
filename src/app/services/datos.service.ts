import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Tallas } from '../interfaces/interfaces';
import { URL_CONSULTA } from '../../config/url.servicios';
import { URL_TRANSAC } from './../../config/url.servicios';


@Injectable({
  providedIn: 'root'
})
export class DatosService {
  saldo: number = 0;
  valido: string = 'true';
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage) { }
  getTallasxProducto(producto: string) {
    let data = {
       sp: 'sp_buscar_tallasxProd',
       parameters : 'produc:' + producto + ':Varchar|'
    };
    return  this.http.post<Tallas[]>(URL_CONSULTA, data);
    }


    getTallasxVenta(producto: string, talla: number) {
      let data = {
         sp: 'sp_buscar_tallasVenta',
         parameters : 'produc:' + producto + ':Varchar|talla:' + talla + ':NVarchar|'
      };
      return  this.http.post<Tallas[]>(URL_CONSULTA, data);
    }

    getSaldo(producto: string, tallav: number) {
      let data = {
         sp: 'sp_GetSaldo',
         parameters : 'produc:' + producto + ':Varchar|tallav:' + tallav + ':NVarchar|'
      };
      return this.http.post(URL_CONSULTA, data);
    }

    getClase(producto: string) {
      let data = {
         sp: 'sp_mostar_clase',
         parameters : 'produc:' + producto + ':Varchar|'
      };
      return this.http.post(URL_CONSULTA, data);
    }

    guardarOe(producto: string, tallav, talla, cantidad) {
      const estado = 'N';
      const data = {
        sp: 'sp_GuardarOE',
        parameters : 'produc:' + producto + ':Varchar|tallav:' + tallav
        + ':NVarchar|talla:' + talla + ':NVarchar|cantidad:'
        + cantidad + ':NVarchar|estado:' + estado + ':Varchar|'
      };
      return this.http.post(URL_TRANSAC, data).pipe(map(async (resp: any) => {
        console.log(resp);
        if (resp[0].error === 'true') {
            const alert = await this.alertController.create({
              header: 'Error!',
              message: resp[0].mensaje,
              buttons: ['OK']
            });
            this.valido = 'false';
            await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Guardado Exitoso!!',
            message: 'La transacción se ha realizado con exito.',
            buttons: ['OK']
          });
          this.valido = 'true';
          await alert.present();
         }
      }));

    }


}
