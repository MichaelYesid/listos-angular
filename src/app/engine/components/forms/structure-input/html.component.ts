import { Input, OnChanges, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-html-forms',
  template: ` 
  <div [ngClass]="(input.visible)?'':'d-none'" [innerHTML]="input.value"></div>`,
  styles: [
  ]
})
export class HTMLFormsComponent implements OnChanges {

  @Input() title:any = '';
  @Input() input:any;
  @Input() submitted?:boolean;
  @Input() innerHTML?:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;

  ngOnChanges(): void {
    console.log(this.innerHTML);
  }
  
}
