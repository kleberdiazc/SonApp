import { LoadingController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { AproReqService } from 'src/app/services/apro-req.service';
import { Requerimientosinfo } from 'src/app/interfaces/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aprob-info',
  templateUrl: './aprob-info.page.html',
  styleUrls: ['./aprob-info.page.scss'],
})
export class AprobInfoPage implements OnInit {

  @Input() requerimiento;
  info: Requerimientosinfo[] = [];
  rows = [];
  columns = [];
  Req: string = '';
  observacion: string = '';
  fecha: string = '';
  origen: string = '';
  destino: string = '';
  loading: any = this.loadingController.create();
  constructor(private modalCtrl: ModalController,
    public _requerimientos: AproReqService,
    public loadingController: LoadingController,
    private datePipe: DatePipe
  ) {
    this.columns = [
      { prop: 'ProductoDes', name: 'Producto' },
      { prop: 'Tipo', name: 'Tipo' },
      { prop: 'Talla', name: 'Talla' }
    ]
  }

   
  
  ngOnInit() {
    this.cargarDatosInfo();
  }
 
  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return this.loading.present();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  cargarDatosInfo() {
    this.loading = this.presentLoading('Cargando..');
    this._requerimientos.getInfoRequerimientos(this.requerimiento, 0).subscribe((resp) => {
      this.info = resp;
      this.rows = resp;
      this.Req = resp[0].Req;
      this.observacion = resp[0].Observacion;
      this.origen = resp[0].Origen;
      this.destino = resp[0].Destino;
      this.fecha = this.datePipe.transform(resp[0].Fecha, 'yyyy-MM-dd h:mm:ss a'); 
      console.log(resp);
      this.loading.dismiss();
    });
   
  }
}
