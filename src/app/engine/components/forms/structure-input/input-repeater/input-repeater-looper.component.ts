import { Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BaseFormTemplate } from '../../base-form.template';
import { StructureInput } from '../../classes/generic-input-base.classes';
import { FormProcessorComponent } from '../../structure-form/form-processor';

@Component({
  selector: 'app-input-repeater-looper',
  template: `
  <app-input-repeater-looper-structure *ngIf="conectorFormulario?.form"
    [conectorFormulario]="conectorFormulario" 
    [title]="title"
    [oldValues]="oldValues"
    [isUpdating]="false"
    [requiereValoresPrevios]="requiereValoresPrevios"
    ></app-input-repeater-looper-structure>
  `
})
export class InputRepeaterLooperComponent extends BaseFormTemplate implements OnInit {
  ngOnInit(): void {
  //console.log("Inicializado input looper")
    this.InitTaks(false);
  }


  protected SetOldValues(data: any): void {
    this.oldValues = data
  }
  protected setInput(inputs$: any): void {
    this.inputs$=inputs$
  //console.log("inputs$",inputs$)
  }
  protected HasAutoFetch(): boolean {
    return this.requiereValoresPrevios
  }
  protected GetFormInputs(): StructureInput<any>[] {
    return this.inputs
  }
  protected FetchData() {
    return this.initialOldValues
  }
  // ngOnInit(): void {
  //   this.ready=true;
  //   // console.error("RERENDERING LOOPER.INPOUTS",this.inputs)
  // }

  @Input() requiereValoresPrevios:boolean=false;
  @Input() submitted?:boolean;
  @Input() submitting:any;
  @Input() formControls:any;
  @Input() onChangeFunctions:any;
  @Input() onFocusFunctions:any;
  @Input() onBlurFunctions:any;
  @Input() title:any;
  @Input() initialOldValues:any;

  inputs$:any

  oldValues:any;
  
  @Input() inputs:any;
  // @Input() oldValues:any;
  @Input() loopKey:any
  // requiereValoresPrevios=false;
  
}
