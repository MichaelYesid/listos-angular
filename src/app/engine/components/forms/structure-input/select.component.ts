import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { BaseSelfMadeList } from 'src/app/engine/context/classes/form-options-bylist-selfmade.classes';
import { ListContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { CiudadfetcherService } from 'src/app/engine/components/services/misc/ciudadfetcher.service';
import { FormOptionsFetcherService } from 'src/app/engine/services/form-connection/form-options-fetcher.service';
import { FormOptionsSelfmadeFetcherService } from 'src/app/engine/services/form-connection/form-options-selfmade-fetcher.service';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';
import { MultiOptionsBase } from './base/multioptions-base';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-select',
  template: `
  <div [formGroup]="form" [ngClass]="(input.visible)?'':'d-none'">
    <!-- Label -->
    <label
    *ngIf="!input?.params?.noMostrarLabel && input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
    [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
    <!-- Input -->
    <select autocomplete="off" (focus)="onFocus($event)" (change)="valueSet($event)" [attr.data-value]="finalValue" [formControlName]="input.key" [id]="input.key" class="form-control"  [value]="input.value"
      [ngClass]="{
        'is-valid': finalValue !== '' && formcontrol.touched, 
        'is-invalid': ( finalValue == '' && (submitted && formcontrol.errors ) ) || ( finalValue == '' && (formcontrol.dirty || formcontrol.touched) ) }">
      <option value="">Seleccionar...</option>
      <option *ngFor="let opt of options||[]; let i = index" [attr.data-index]="i" [value]="opt.key">{{opt.value}}</option>
    </select>
    <!-- Message error -->
    <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>`,
  styles: [
  ]
})
export class SelectComponent extends MultiOptionsBase implements OnInit {

  @Input() title:any = '';
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  constructor(
    protected ciudadfetcherService:CiudadfetcherService,
    protected formOptionsFetcherService:FormOptionsFetcherService,
  )
  {
    super(ciudadfetcherService,formOptionsFetcherService)
  }  
  
  onFocus = ($event:any) => {
    if(this.onFocusFunction){
      if(typeof this.onFocusFunction==="function"){
        this.onFocusFunction($event,this)
      }
    } 
  }

  showSeleccionar = () => {
    console.log('MOSTRAMOS SHOW SELECCIONAR' );
    if(this.options?.length)
      if(this.options[0].key==="---")
        return false
    return true
  }

  esVisible = () => {
    //console.log("esto deberia ejecutarse cuando cambie. ",this.input.key," => ",this.input.visible)
    return this.input.visible
  }

  async ngOnInit(): Promise<void> {
    (this.formcontrol as MyCustomFormControl).component=this
  }

  setPreviousSelectValue = async () => {
    if(this.oldValue && this.options){
    this.formcontrol.setValue(this.oldValue)
    this.ready=true
  }
  }
  
}
