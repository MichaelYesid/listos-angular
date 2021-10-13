import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-helper',
  template: `
  <small *ngIf="pleaseaddletters" class="mt-1 text-s pl-1 py-2 text-muted">Escribe más letras</small>
  <small *ngIf="searching" class="mt-1 text-s pl-1 py-2 text-muted">Buscando...</small>
  <div class="text-danger mt-1 text-s pl-1 py-2" *ngIf="searchFailed && freeText == false">No se encontraron coincidencias.</div>
  <div class="text-muted mt-1 text-s pl-1 py-2" *ngIf="searchFailed && freeText == true && freeTextValid == true">No se encontraron coincidencias, pero puedes crear uno nuevo.</div>
  `,
})
export class AutocompleteHelperComponent implements OnChanges {

  constructor() { }

  @Input() pleaseaddletters:boolean=false
  @Input() searching:boolean=false
  @Input() searchFailed:boolean=false
  @Input() freeText?=false;
  @Input() freeTextValid?:any;

  ngOnChanges(): void {
  }

}