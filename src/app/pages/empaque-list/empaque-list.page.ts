import { Component, OnInit } from '@angular/core';
import { EmpList } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-empaque-list',
  templateUrl: './empaque-list.page.html',
  styleUrls: ['./empaque-list.page.scss'],
})
export class EmpaqueListPage implements OnInit {
  producto: string = '';
  EmpList: Observable<EmpList[]>;
  constructor(private _data: DatosService) { }

  ngOnInit() {
  }
  OnBlur(event) {
    console.log(event.target.value);
    const prd: string = event.target.value;
    this.EmpList = this._data.getListaTalla(prd);
  }

}
