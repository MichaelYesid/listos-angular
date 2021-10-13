import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseFormTemplate } from '../../base-form.template';
import { InputRepeaterProcessor, MyCustomFormControl } from '../../classes/generic-form.classes';
import { StructureInput } from '../../classes/generic-input-base.classes';
import { GenericItem } from '../../classes/generic-input.classes';
import { InputRepeaterLooperComponent } from './input-repeater-looper.component';

@Component({
  selector: 'app-input-repeater',
  template: ` 
  <app-loading-spinner  [ngClass]="(input.visible)?'':'d-none'" *ngIf="!ready"></app-loading-spinner> 
  <div class="row" *ngIf="ready" [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
  
    <div class="col-12 d-flex align-items-center mb-3">
      <!-- Label -->
      <label class="pt-2"
        *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
      [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
      
      <button type="button" class="ml-3 btn btn-iconAction btn-iconAction_edit" (click)="AnadirRegistro()">
        <i class="las la-plus"></i>
      </button>
    </div>

    <!-- Input -->
    <input autocomplete="off" [formControlName]="input.key" [id]="input.key" [value]="input.value" type="hidden"
    class="form-control" [placeholder]="input.placeholder" [email]="(input.type == 'email')? 'true':'false'"
      [ngClass]="{
      'is-valid': formcontrol.valid && (formcontrol.dirty || formcontrol.touched), 
      'is-invalid': (submitted && formcontrol.errors) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched)) }">
    
    <!-- Message error -->
    <div class="col-12">
      <div class="row form-row_repeaterItem d-flex mb-3" *ngFor="let myelement of elements">
          <app-input-repeater-looper class="col-12 col-lg-11"
            [loopKey]="myelement.key" 
            [initialOldValues]="myelement.oldValue" 
            [submitted]="submitted" 
            [submitting]="submitting"
            [title]="title" 
            [onFocusFunctions]="myelement.onFocusFunctions"
            [onChangeFunctions]="myelement.onChangeFunctions"
            [onBlurFunctions]="myelement.onBlurFunctions"
            [formControls]="formControls"
            [inputs]="myelement.inputs"></app-input-repeater-looper>
          <div clas="col">
            <button type="button" class="btn btn-iconAction btn-iconAction_delete" (click)="BorrarRegistro(myelement.key)">
              <i class="las la-lg la-trash-alt"></i>
            </button>
          </div>
      </div>
      <input type="hidden"  [id]="input.key" [value]="input.value" />
      <div class="row">
        <div class="col-lg-12 text-center" *ngIf="elements !== 'undefined' && elements.lenght >= 1">
          <button type="button" class="btn btn-iconAction btn-iconAction_edit" (click)="AnadirRegistro()">
            <i class="las la-lg la-plus"></i>
          </button>
        </div>
      </div>
    </div>

  </div>`,
  styles: [
  ],
  // providers: [InputRepeaterService]
})
export class InputRepeaterComponent implements OnInit, OnChanges,AfterViewInit {
  ngOnInit(): void {
  //console.log("Inicializado input repeater")
    this.SetModel()
  }

  inputRepeaterProcessor:InputRepeaterProcessor = new InputRepeaterProcessor()

  @Input() title:any = '';
  @Input() input:any;
  @Input() form:any = new FormGroup({});;
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;
  @Input() submitting:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  mappedOldValues:any;

  ready=false;

  ngAfterViewInit(): void {
 
  }

  ngOnChanges(changes: SimpleChanges): void {
  //console.log(changes)
    if( "input" in changes){
      if(this.input.options){
        // console.error('MOSTRAMOS CAMBIO: ', this.input)
        this.ready=true;
      }
    }
    if( "oldValue" in changes){
    //console.log("despues de inicio")
      if(this.input.options.inputs){
      //console.log("this.input",this.input)
        if(this.input.required===true){
          this.AnadirRegistro()
        }
      }
      // this.ready=false
      // await this.MapOldValues(this.oldValue,true).then(()=>this.ready=true)
    }
    
  }

  MapOldValues = async (oldValues:any,replace:boolean) => {
    if(replace===true)
      this.mappedOldValues=null

    if(oldValues){
      for(let loopKey in oldValues){
        const numLoopKey:number = loopKey as unknown as number
        if(!this.mappedOldValues)
          this.mappedOldValues=[]

        if(!this.mappedOldValues[numLoopKey])
          this.mappedOldValues[numLoopKey]={}

        for(let originalFieldName in oldValues){
          const oldData = oldValues[originalFieldName]
          const realFieldKey = this.inputRepeaterProcessor.RemapKeyToLoopKey(this.input.key,originalFieldName,loopKey)
          this.mappedOldValues[numLoopKey][realFieldKey] = oldData
        }
      }
    }else{
      this.mappedOldValues=null
    }
  }

  
  model:any[] = []

  SetModel = () => {
    this.formcontrol.setValue(this.model)
  }

  elements:any= []

  counter = 0;

  private GetInputs = () => {
    return this.input.options.inputs
  }

  ReMapObject = (obj:any,loopKey:any) => {
    let key:string 
    let newObj:any = {}
    for(key in obj){
      const item = obj[key]
      const newKey = this.RemapKeyToLoopKey(key,loopKey)
      newObj[newKey]= item
    }
    return newObj;
  }

  RemapKeyToLoopKey = (key:string,loopKey:any) => {
    return this.inputRepeaterProcessor.RemapKeyToLoopKey(this.input.key,loopKey,key)
  }

  GetOnChangeFunctions = (loopKey:any) => {
    const onChangeFoos = this.input.options.onChangeFunctions
    return this.ReMapObject(onChangeFoos,loopKey)
  }


  GetonFocusFunctions = (loopKey:any) => {
    const onFocusFoos = this.input.options.onFocusFunctions
    return this.ReMapObject(onFocusFoos,loopKey)
  }

  GetonBlurFunctions = (loopKey:any) => {
    const onBlurFoos = this.input.options.onBlurFunctions
    return this.ReMapObject(onBlurFoos,loopKey)
  }
  

  CloneElements = (key:any) => {
    return this.GetInputs().map((option:any)=>this.CloneObject(option,key))
  }
 

  CloneObject = (objInput:any,loopKey:any) => {
    // console.log(objInput,this.counter)
    // this.counter=this.counter+1
    // console.log("Clonando esto=>",event)
    // event =new GenericInput({key: 'REQ_N_POSICIONES',label: 'Número de posiciones:',type: 'text',value: '',required: true,classGrid: 'col-12 col-lg-2'}),
    const options = objInput.getOptions();
    let newEvent = new GenericItem(options)
    // console.error("options",options)
    newEvent.controlType = objInput.controlType
    const oldkey = options.key
    newEvent.key = this.input.key+"___"+loopKey+"___"+options.key
    // console.log("event",event)
    return newEvent
  }


  // ProcessControl = (control:MyCustomFormControl) => {
  //   // const foo = (val:any) => {return val}
  //   let valueChangesListener:Observable<any> = control.valueChanges;

  //   const sub:Subject<any> = new Subject()

  //   const res:Subscription = valueChangesListener.subscribe((val:any)=>{
  //     if(val)
  //     sub.next(val)
  //   });
  //   return sub
  // }


  GetOldValuesPerRow = (loopKey:any) => {
    let obj:any = null
    if(this.oldValue){
      const oldValuesPerRow = this.oldValue[loopKey]
      if(oldValuesPerRow){
        obj = {}
        let oldValuekey:string=''
        for(oldValuekey in oldValuesPerRow){
          const newKey=this.inputRepeaterProcessor.RemapKeyToLoopKey(this.input.key,oldValuekey,loopKey)
          obj[newKey] = oldValuesPerRow[oldValuekey]
        }
      }else{
      //console.error("loopkey " + loopKey + ": not found in oldValues: " + this.oldValue)
      }
    }
    return obj
  }


 
  AnadirRegistro = () => {
    const loopKey = this.counter
    const inputElements:any[] = this.CloneElements(loopKey)
    const onChangeFunctions = this.GetOnChangeFunctions(loopKey)
    const onFocusFunctions = this.GetonFocusFunctions(loopKey)
    const onBlurFunctions = this.GetonBlurFunctions(loopKey)
    const oldValues = this.GetOldValuesPerRow(loopKey)
    const event = {
      key:loopKey,
      inputs:inputElements,
      onChangeFunctions:onChangeFunctions,
      onFocusFunctions:onFocusFunctions,
      onBlurFunctions:onBlurFunctions,
      oldValue:oldValues,
    }
  //console.log(loopKey,this.input.options.onBlurFunctions,onBlurFunctions)
    this.counter=this.counter+1
    this.elements.push(event)
    const formKeys = this.GetFormRowFieldIds(inputElements)
    this.model=this.model.concat(formKeys)
    this.SetModel()
  }

  BorrarRegistro = (event:any) => {
    this.elements = this.elements.filter((item:any)=> {
      const keyx:any = item.key
      const res = (keyx !== event)
      const formKeys = this.GetFormRowFieldIds(item.inputs)
      this.model = this.model.filter((key:string)=>!(key in formKeys))
      this.SetModel()
      return res;
    })
  }


  GetFormRowFieldIds = (inputs:StructureInput<any>[]) => {
    let list:any[] = []
    let key:any
    for(key in inputs){
      const modelVal = (inputs[key] as StructureInput<any>).key
      list.push(modelVal)
    }
    return list;
  }

  SetRowOldValues = (loopKey:any,originalKeyNames:string[],data:any) => {

  }
  
}
