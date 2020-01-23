import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Componente } from '../../interfaces/interfaces';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent   {
  componentes: Observable<Componente[]>;
  constructor(private menServi: MenuService) { }



  ionViewWillEnter() {
    this.componentes = this.menServi.getAll();
    console.log(this.componentes);
  }
  ionViewDidEnter(){
    this.componentes = this.menServi.getAll();
    console.log(this.componentes);
  }

}
