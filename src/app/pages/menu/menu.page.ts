import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Componente } from '../../interfaces/interfaces';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath: string;
  componentes: Observable<Componente[]>;
  constructor(private menServi: MenuService,
              private router: Router) {
  this.router.events.subscribe((event: RouterEvent) => {
    this.selectedPath = event.url;
  });
 }

  ngOnInit() {
    this.componentes = this.menServi.getAll();
    console.log(this.componentes);
  }
  ionViewWillEnter() {
    this.componentes = this.menServi.getAll();
    console.log(this.componentes);
  }

}
