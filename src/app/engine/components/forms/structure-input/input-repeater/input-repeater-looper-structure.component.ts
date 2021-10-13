import { Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormProcessorComponent } from '../../structure-form/form-processor';

@Component({
  selector: 'app-input-repeater-looper-structure',
  template: `
    <div class="form-row" [formGroup]="conectorFormulario.form">
      <div *ngFor="let conectorInputForm of conectorFormulario.conectoresInputForm" class="form-group" [class]="conectorInputForm.input.classGrid">
        <app-structure-form-row [formcontrol]="conectorInputForm.control"
        [title]="title"
        [submitted]="submitted"
        [onFocusFunction]="conectorInputForm.onFocusFunction"
        [onBlurFunction]="conectorInputForm.onBlurFunction"              
        [submitting]="submitting"
        [form]="conectorFormulario.form"
        [input]="conectorInputForm.input" 
        [oldValue]="oldValues?oldValues[conectorInputForm.input.key]:''"></app-structure-form-row>
      </div>
    </div>
  `
})
export class InputRepeaterLooperStructureComponent extends FormProcessorComponent {

  @Input() isUpdating:boolean=false;
  @Input() submitted?:boolean;
  @Input() submitting:any;
  @Input() formControls:any;
  @Input() inputRepeater:any;
  @Input() loopKey:any
  @Input() form:any;
  requiereValoresPrevios=false;
  
}
