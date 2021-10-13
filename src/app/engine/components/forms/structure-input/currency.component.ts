import { Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';

@Component({
  selector: 'app-currency-input',
  template: ` 
    <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
      <!-- Label -->
      <label
        *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
      [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
      
      <!-- Input -->
      <p-inputNumber [(ngModel)]="model" 
        [minFractionDigits]="0" 
        [formControlName]="input.key" 
        mode="currency" 
        currency="COP" 
        locale="es-ES" 
        (onInput)="onInputEntered($event)" 
        [attr.data-value]="model"></p-inputNumber>

      <!-- Message error -->
      <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
    </div>
    
    <input type="hidden" [id]="input.key" [attr.data-value]="setJSONmodel()" />
  `,
  styles: [
  ]
})
export class CurrencyInputComponent implements OnInit, OnChanges {
  

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  model:any = '0';
  
  ngOnInit(): void {
    this.formcontrol.setValue(this.model);
  }
  
  ngOnChanges(): void {
    
  }

  setJSONmodel = () => {
    return JSON.stringify(this.model)
  }

  onInputEntered($event:any){
    console.log('MOSTRAMOS VALOR FINAL', $event);
    // this.formcontrol.setValue($event.value);
    this.model = $event.value;
    // if(this.onBlurFunction){
    //   if(typeof this.onBlurFunction==="function"){
    //     this.onBlurFunction($event,this)
    //   }
    // } 
  }
 
}