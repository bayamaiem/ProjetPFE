// src/app/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByConteneurPipe } from './pipes/filter-by-conteneur.pipe'; // Assurez-vous que le chemin est correct

@NgModule({
  imports: [CommonModule,FilterByConteneurPipe],
  exports: [FilterByConteneurPipe] // Exporter le pipe
})
export class SharedModule {}
