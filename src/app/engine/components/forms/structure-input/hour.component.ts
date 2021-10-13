import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n,CustomDatepickerI18n, CustomDateParserFormatter, CustomAdapter, MyCustomFormControl } from '../classes/generic-form.classes';
import { FormGroup } from '@angular/forms';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';

@Component({
  selector: 'app-hour',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
    *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
    <!-- Input -->
    <div class="input-group input-group_datepicker"
      [ngClass]="{
                'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
                'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
      <ngb-timepicker [formControlName]="input.key" [meridian]="true" [spinners]="false"
        [ngClass]="{
                  'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
                  'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }"
                  ></ngb-timepicker>
      <div class="input-group-prepend"
        [ngClass]="{
                  'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
                  'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
      </div>
    </div>
    <!--<pre>Model: {{ model | json }}</pre>-->
    <input type="hidden" [id]="input.key" [value]="input.value" />
    
    <!-- Message error -->
    <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>`,
  styles: [
  ],
  providers: [
    I18n, 
    {provide:NgbDateAdapter,useClass:CustomAdapter},
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide:NgbDateParserFormatter, useClass:CustomDateParserFormatter},
  ]
})
export class HourComponent extends AbstractValueSetter implements OnChanges {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() formControls:any;
  @Input() submitted?:boolean;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  time = {hour: 13, minute: 30};

  ngOnChanges(): void {
    this.setPreviousDateValue()
  }
  
  setPreviousDateValue = () => {
    if(this.oldValue){
        const date = new Date(this.oldValue)
        const dateObject:any[] = [
          date.getUTCFullYear(),
          date.getUTCMonth() + 1, //months from 1-12
          date.getUTCDate(),
        ]
        this.formcontrol.setValue(dateObject.join("-"))
    }     
  }
  
}