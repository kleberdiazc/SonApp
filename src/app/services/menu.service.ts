import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { map, filter } from 'rxjs/operators';
import { URL_SERVICIOS, URL_CONSULTA } from 'src/config/url.servicios';
import { Observable } from 'rxjs';
import { Componente } from '../interfaces/interfaces';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuRes: Observable<Componente[]>;
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public log: LoginService) { }


getAll() {
  let data = {
    sp: 'sp_menu_x_usuario',
    parameters : 'user:' + this.log.id_usuario + ':Varchar|'
  };
  //return this.http.post('https://localhost:44385/api/Consultas', data)
  const url = URL_CONSULTA;
  //const url = `${ URL_SERVICIOS }/tareas/obtener_tareas/${ this._us.token }/${ this._us.id_usuario }`;
  /*this.http.get<Componente[]>(url).subscribe((response: any) => {
    console.log(response);
    this.menuRes = response;
  });*/

  return  this.http.post<Componente[]>(url, data);
}
}
