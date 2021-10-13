import { Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';

@Component({
  selector: 'app-text',
  template: ` 
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
      *ngIf="!input?.params?.noMostrarLabel && input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
    <!-- Input -->
    <input autocomplete="off" [formControlName]="input.key" [id]="input.key" (blur)="onBlur($event)" (change)="valueSet($event)" [attr.data-value]="finalValue" [value]="input.value" [type]="input.type"
    class="form-control" [placeholder]="input.placeholder"
    [readonly]="input?.params?.estaDeshabilitado"
    [email]="isEmail"
    [ngClass]="obtenerClass()">
    <!-- Message error -->
    <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>`,
  styles: [
  ]
})
export class TextComponent extends AbstractValueSetter implements OnInit {
  ngOnInit(): void {
    (this.formcontrol as MyCustomFormControl).component=this

    if(this.input?.params?.estaDeshabilitado===true){
      this.form.get(this.input.key)?.disable();
    }


    if(this.input.type == 'email'){
      this.isEmail = true;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if("oldValue" in changes){
      this.formcontrol.setValue(this.oldValue)
    }
    
    // console.log("CAMBIOOOOS")
  }

  isEmail:boolean=false;

  obtenerClass = () => {
    return {
      'is-valid': this.formcontrol.valid && (this.formcontrol.dirty || this.formcontrol.touched), 
      'is-invalid': (this.submitted && this.formcontrol.errors) || ( this.formcontrol.invalid && (this.formcontrol.dirty || this.formcontrol.touched)) }
  }

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

  onBlur = ($event:any) => {
    // console.log("vscvsev",this.onBlurFunction)
    if(this.onBlurFunction){
      if(typeof this.onBlurFunction==="function"){
        this.onBlurFunction($event,this)
      }
    }
  }
 
}