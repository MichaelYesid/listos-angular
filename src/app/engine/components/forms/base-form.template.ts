import { ConectorFormulario, ConectorInputForm, StructureInput } from 'src/app/engine/components/forms/classes/generic-input-base.classes';
import { FormFetcherService } from 'src/app/engine/services/form-connection/form-fetcher.service';
import { FormPusherService } from 'src/app/engine/services/form-connection/form-pusher.service';
import { PushContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { of, Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MyCustomFormControl } from 'src/app/engine/components/forms/classes/generic-form.classes';
import { SidebarStatusService } from 'src/app/components/dashboard-cv/services/sidebar-status.service';
import { Router } from '@angular/router';
import { NextFormService } from 'src/app/components/dashboard-cv/services/next-form.service';

@Component({
  selector: 'app-base-form',
  template: ``,
})
export abstract class BaseFormTemplate {

  protected abstract SetOldValues(data:any):void
  protected abstract setInput(inputs$:any):void
  protected abstract HasAutoFetch():boolean
  protected abstract GetFormInputs():StructureInput<any>[]
  protected abstract FetchData ():Promise<any>;

  protected PushDataProcessor = (data: any) => data;
  protected FetchDataProcessor = (data: any) => data;

  oldValuesCargados:boolean=false
  customButtons:any=undefined;


  protected InitTaks = async (isComponentTable:boolean) => {
    this.oldValuesCargados=false
    if(isComponentTable===false){
      this.FormTasks()
    }else{
      this.TableTasks()
    }
  }

  InputReferencer = async () => {
    let processedInputs:any[] = [];
    let params:any = {}
    this.GetFormInputs().forEach((item: StructureInput<any>) => {
      const key = item.key;
      params[key] = item;
      const referencedObject = params[key];

      processedInputs.push(referencedObject);
    });
    return processedInputs;
  }

  onChangeFunctions: any=null;
  onFocusFunctions: any=null;
  onBlurFunctions: any=null;

  FormTasks = () =>{
    if (this.HasAutoFetch()=== true) {
      this.FetchForm();
    }else{
      this.oldValuesCargados=true
    }
    this.InputReferencer().then(async (processedInputs:any)=>{
      if(processedInputs){
        // console.log(processedInputs);
        const input$ = this.getInputs(processedInputs) as unknown as StructureInput<any>[]
        this.setInput(input$)

        const onFocusFunctions = this.onFocusFunctions
        const onBlurFunctions = this.onBlurFunctions
        const onChangeFunctions = this.onChangeFunctions
        
        await this.CreateFormFromInputs(input$,onFocusFunctions,onBlurFunctions,onChangeFunctions).then((conectorFormulario:any)=>{
          this.conectorFormulario=conectorFormulario
          this.ready = true;
          // console.log(this.conectorFormulario);
        })
      }
    })
  }

  ready:boolean=false;
  conectorFormulario:ConectorFormulario=null!


  TableTasks = () =>{
    this.FetchData().then((data:any)=>{
      data = this.FetchDataProcessor(data);
      this.SetOldValues(data)
      this.oldValuesCargados=true
    })
    
  }

  // oldValuesObtained:Subject<any>=new Subject();

  protected getInputs(processedInputs:any[]) {
    return processedInputs
  }
  
  FetchForm = async () => {
    // console.log("fetchform")
    this.FetchData().then((data:any)=>{
      // console.log("sdsdsds")
      data = this.FetchDataProcessor(data);
      this.SetOldValues(data)
      this.oldValuesCargados=true
      // console.log("oldvalues",data)
      // this.oldValuesObtained.next()
    });
  };

  protected ArgProcessor = (form: FormGroup): any => {
    let data: any = form.getRawValue();
    const controls = form.controls;
    // console.error("controls=>",controls)
    for (let key in controls) {
      const args = (controls[key] as MyCustomFormControl).args;
      // console.error("args:",key,"=>",args)
      if (args) data[key] = args;
    }
    return data;
  };




  protected validadoresTipoLetrasFun = () => {
    let validadoresTipoLetras:any[] = [ // Validators.minLength(4), Validators.maxLength(6), Validators.email
      Validators.pattern("^[A-Za-zÀ-ú ]+$")
    ]
    return validadoresTipoLetras;
  }

  protected validadoresTipoNumerosFun = () => {
    let validadoresTipoNumeros:ValidatorFn[] = [
      Validators.pattern("^[0-9]*$")
    ]
    return validadoresTipoNumeros;
  }

  // protected validatorCamposI = () => {

  protected validadoresTipoEmailFun = () => {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    let validadoresTipoEmail:any[] = [
      Validators.email,
      Validators.pattern(regex)
    ]
    return validadoresTipoEmail;
  }

  protected validadoresTelCelFun = () => {
    let validadoresTelCel:ValidatorFn[] = [
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(6), 
      Validators.maxLength(10)
    ]
    return validadoresTelCel;
  }

  protected validadoresTipoMinMaxLenghtFun = (min:number,max:number) => {
    let validadoresTipoMinMaxLenght:any[]=[
      Validators.minLength(min), 
      Validators.maxLength(max)
    ]
    return validadoresTipoMinMaxLenght;
  }
  
  protected RetrieveDataToPush = async($event:any) => {
    // console.error("---->CANCELANDO EDICION")
    let data = this.ArgProcessor($event);
    data = this.PushDataProcessor(data);
    // console.log("intento enviar mis datos",$event)
    return data
  }

  CreateFormFromInputs = async (inputs:StructureInput<any>[],onFocusFunctions:any,onBlurFunctions:any,onChangeFunctions:any) => {
    const group: any = {};

    if(!onFocusFunctions){
      onFocusFunctions = {}
    }
    if(!onBlurFunctions){
      onBlurFunctions = {}
    }
    if(!onChangeFunctions){
      onChangeFunctions = {}
    }
    
    const conectorFormulario = new ConectorFormulario()

    inputs.forEach((input:StructureInput<any>) => {

      let validators:ValidatorFn[]= input.validators??[];
      if(input.required == true){
        validators.push(Validators.required)
      }


      let inputKey = input.key

      const conectorInputForm = new ConectorInputForm(input)

      conectorFormulario.conectoresInputForm.push(conectorInputForm)

      // console.log('Validators: ',validators, 'InputKey: ', inputKey);

      if(inputKey.length>0){  

        const mycontrol:MyCustomFormControl = new MyCustomFormControl(input.value || '', validators)

        if(inputKey in onBlurFunctions){
          const onBlurFunction = onBlurFunctions[inputKey]
          conectorInputForm.setonBlurFunction(onBlurFunction)
        }
        if(inputKey in onFocusFunctions){
          const onFocusFunction = onFocusFunctions[inputKey]
          conectorInputForm.setonFocusFunction(onFocusFunction)
        }
      
        conectorInputForm.setFormControl(mycontrol)
        mycontrol.setStructureInput(input)
        group[inputKey] = mycontrol
      }
    });
    const form = new FormGroup(group)
    const formControls = form.controls

    for(let inputKey in onChangeFunctions){
      if(inputKey in formControls){
        const onChangeFunction = onChangeFunctions[inputKey]
        const mycontrol =  formControls[inputKey]
        mycontrol.valueChanges.subscribe((val:any)=>{
          if(val || val===''){
            // console.log("Change funcion val",val)
            onChangeFunction(val,formControls)
          }
        });
      }
    }
    conectorFormulario.form = form
    return conectorFormulario
  }

  abstract oldValues:any;

}
