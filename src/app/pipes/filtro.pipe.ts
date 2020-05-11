import { Pipe, PipeTransform } from '@angular/core';
import { Prioridad } from '../interfaces/interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( prioridad: Prioridad[], texto: string): Prioridad[] {
    if (texto.length === 0) {return prioridad; }
    //texto = texto.toLowerCase();
    return prioridad.filter( prioridads => {
      return prioridads.pedido.toUpperCase().includes(texto);
    });
  }

}
