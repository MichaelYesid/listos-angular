import { Input, OnChanges, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-input-hidden',
  template: ` 
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
      *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
    <!-- Input -->
    <input autocomplete="off" [formControlName]="input.key" [id]="input.key" [value]="input.value" type="hidden"
    class="form-control" [placeholder]="input.placeholder" [email]="(input.type == 'email')? 'true':'false'"
    [ngClass]="{
      'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
      'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
  </div>`,
  styles: [
  ]
})
export class InputHiddenComponent implements OnChanges {

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
    this.formcontrol.setValue(this.oldValue)
  }
  
}
