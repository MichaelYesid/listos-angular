import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n,CustomDatepickerI18n, CustomDateParserFormatter, CustomAdapter, MyCustomFormControl } from '../classes/generic-form.classes';
import { FormGroup } from '@angular/forms';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';

@Component({
  selector: 'app-date',
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
      <input autocomplete="off" class="form-control" placeholder="Formato: 1990-02-27"
        ngbDatepicker #d="ngbDatepicker"  
        [maxDate]="maxDate" 
        [minDate]="minDate" 
        [startDate]="startDate"
        (change)="valueSet($event)" [attr.data-value]="finalValue"
        [formControlName]="input.key" 
        [ngClass]="{
                  'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
                  'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
      <div class="input-group-prepend"
        [ngClass]="{
                  'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
                  'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
        <span class="input-group-text btn calendar" (click)="d.toggle()">
          <i class="las la-calendar text-lg"></i>
        </span>
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
export class DateComponent extends AbstractValueSetter implements OnChanges {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() formControls:any;
  @Input() submitted?:boolean;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  
  maxDate ={year: new Date().getUTCFullYear(),month: 12, day: 31}
  minDate ={year: new Date().getUTCFullYear()-71,month: 12, day: 31}
  startDate={year: new Date().getUTCFullYear(),month: new Date().getMonth()+1 , day: new Date().getDate() }

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