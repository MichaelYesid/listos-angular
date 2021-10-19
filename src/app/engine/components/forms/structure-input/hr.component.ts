import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-hr',
  template: `
  <div [class]="input.classGrid"  [ngClass]="(input.visible)?'':'d-none'">
    <hr class="w-100 text-start m-0 p-0 mt-4 mb-4 pb-3" />
  </div>`,
  styles: [
  ]
})
export class HrComponent implements OnChanges {

  model!: any;

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  ngOnChanges(): void {
    //console.log("inicializando hr")
  }

}
