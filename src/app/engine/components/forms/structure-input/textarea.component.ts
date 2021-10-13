import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';

@Component({
  selector: 'app-textarea',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
    *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
    <!-- Input -->
    <textarea rows="5" [formControlName]="input.key" [id]="input.key" class="form-control" (change)="valueSet($event)" [attr.data-value]="finalValue" [value]="input.value" [email]="(input.type == 'email')? 'true':'false'"
      [ngClass]="{
        'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
        'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }"></textarea>
      <!-- Message error -->
      <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>`,
  styles: [
  ]
})
export class TextareaComponent extends AbstractValueSetter  implements OnChanges {

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
    this.setPreviousValue()
  }

  setPreviousValue = () => {
    if(this.oldValue){
      this.formcontrol.setValue(this.oldValue);
    }     
  }

}
