import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByConteneur',
  standalone: true
})
export class FilterByConteneurPipe implements PipeTransform {

  transform(demandes: any[], conteneurId: number): any[] {
    return demandes.filter(demande => demande.conteneur_id === conteneurId);
  }

}
