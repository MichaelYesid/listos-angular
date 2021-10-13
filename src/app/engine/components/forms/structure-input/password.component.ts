import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-password',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
    *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
    <!-- Input -->
    <div  class="input-group input-group_password flex-nowrap"
        [ngClass]="{
          'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
          'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
      <input [formControlName]="input.key" [id]="input.key" [value]="input.value" [type]="fieldTextType ? 'text' : input.type"
        class="form-control"
        [ngClass]="{
          'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
          'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
      <div class="input-group-prepend" (click)="togglePassword()"
        [ngClass]="{
          'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
          'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
        <span class="input-group-text">
          <i class="bi text-lg" [ngClass]="{ 'bi-eye-fill': !fieldTextType, 'bi-eye-slash-fill': fieldTextType}"></i>
        </span>
      </div>
    </div>
    <!-- Message error -->
    <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>`,
  styles: [
  ]
})
export class PasswordComponent implements OnChanges {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  ngOnChanges(): void {
  }


  fieldTextType = false;

  togglePassword(){
    this.fieldTextType = !this.fieldTextType;
  }

}
