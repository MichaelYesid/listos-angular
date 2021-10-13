import { Input, OnChanges, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-summary-text',
  template: ` 
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
      class="h6 text-bold" *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>

    <div class="w-100 m-0 m-0 p-0">
      <input type="hidden" [formControlName]="input.key" [id]="input.key" class="form-control" [value]="input.value" />
      <div>
        {{input.value}}
      </div>
    </div>

  </div>`,
  styles: [
  ]
})
export class SummaryTextComponent implements OnChanges {

  @Input() title:any = '';
  @Input() input:any;
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  // private _input: any;
  // @Input() set input({ key, value, }) {

  //   this._input = value;
  //   //console.log(key);

  //   this.form.get(this._input['key'])?.patchValue(this._input['value']);
  //   this.form.get(this._input['key'])?.valueChanges;
  //   //console.log('SET INPUT: ', this.form.get(this.input['key']))
  // }

  // get input(): any {
  //   return this._input;
  // }

  ngOnChanges(): void {
    if(this.formcontrol)
      this.formcontrol.setValue(this.oldValue)
  }
  
}
