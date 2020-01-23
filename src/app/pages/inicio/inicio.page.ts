import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuService } from '../../services/menu.service';
import { Componente } from '../../interfaces/interfaces';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
componentes: Componente[] = [];
  constructor(private menuCtrl: MenuController,
              private menServi: MenuService,
              private _login: LoginService,
              public navCtrl: NavController,
              public router: Router ) { }

  ngOnInit() {
    this.menServi.getAll();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  Cerrar(){ 
    this._login.cerrar_sesion();
    this.router.navigate(['/login']);
  }

}
