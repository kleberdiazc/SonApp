import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena:string = '';
  loading: any;
  constructor(public navCtrl: NavController,
              public router: Router,
              public _login: LoginService,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return  this.loading.present();
  }

  /*ionViewWillEnter() {
    if (this._login.activo()) {
      this.router.navigate(['/menu']);
    }
  }*/
    ingresar() {
    //this.loading = this.presentLoading('Autenticando');
    this._login.ingresar(this.usuario, this.contrasena)
              .subscribe(() => {
                if (this._login.activo()) {
                  this.router.navigate(['/menu/inicio']);
                }
              });
  }

}
