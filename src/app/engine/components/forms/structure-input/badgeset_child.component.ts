import { EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import { KeyValuePair } from 'src/app/engine/context/classes/form-options-bylist.classes';


@Component({
  selector: 'app-badgeset-child',
  template: `
  <div class="container-flex">
    <ul class="form-row list-inline">
      <li *ngFor="let item of items" class="badge-skills list-inline-item" [attr.data-index]="item.key">
        <span class="badge-skills_title">{{item.value}}</span>
        <button type="button" class="btn badge-skills_closeBtn ml-3" (click)="removeItem(item.key)">
          <i class="las la-times"></i>
        </button>
      </li>
      <div *ngIf="!((items.length)>0)">
        <span *ngIf="required && submitted" class="text-danger">Es necesario que selecciones al menos un elemento<i class="ml-2 text-danger la la-exclamation-circle"></i></span>
        <span *ngIf="!(required && submitted)" class="text-muted">Selecciona uno o varios elementos a la izquierda</span>
      </div>
      
    </ul>
  </div>
  `,
})
export class BadgeSetChildComponent implements OnChanges {

  @Input() items:KeyValuePair[] = [];
  @Output() onRemoveItem: EventEmitter<any> = new EventEmitter();
  @Input() required:any;
  @Input() submitted:any;

  ngOnChanges(): void{
    // console.log(this.items);
  }


  removeItem(itemKey:any): void {
    this.onRemoveItem.emit(itemKey);
  }

  

}