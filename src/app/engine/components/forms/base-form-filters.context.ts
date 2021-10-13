import { StructureInput } from 'src/app/engine/components/forms/classes/generic-input-base.classes';
import { FormFetcherService } from 'src/app/engine/services/form-connection/form-fetcher.service';
import { FormPusherService } from 'src/app/engine/services/form-connection/form-pusher.service';
import { FetchContext, UpdateContext } from '../../context/classes/form-options-bylist.classes';
import { PushContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { Observable, of, Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from 'src/app/engine/components/forms/classes/generic-form.classes';
import { SidebarStatusService } from 'src/app/components/dashboard-cv/services/sidebar-status.service';
import { Router } from '@angular/router';
import { BaseFormTemplate } from './base-form.template';
import { filter } from 'rxjs/operators';
import { FiltersService } from '../services/filters/filters.service';

@Component({
  selector: 'app-base-form',
  template: ``,
})
export abstract class BaseFormFiltersContext extends BaseFormTemplate {

  protected formPusherContext: PushContext = null!;
  protected fetchContext: FetchContext = null!;
  protected updateContext: UpdateContext = null!;
  
  constructor(
    protected formPusherService: FormPusherService,
    protected formFetcherService: FormFetcherService,
    protected sidebarStatusService: SidebarStatusService,
    protected router: Router,
    protected filtersService: FiltersService
  ) {
    super()
  }


  inputs$: any;

  setInput(inputs$:any){
    this.inputs$ = inputs$;
  }
  @Input() oldValues:any;

  @Output() oldValuesObtained = new EventEmitter<any>();
  
  SetOldValues = (data:any) => {
    this.oldValues=data;
    this.oldValuesObtained.emit(this.oldValues);
  }

  protected HasAutoFetch = () => {
    return this.fetchContext.autoFetch
  }

  protected GetFormInputs = () => {
    return this.inputs;
  }

  @Input() isUpdating:boolean=false;
  @Output() finishedLoading = new EventEmitter<any>();
  @Output() onCancelEditForm = new EventEmitter<any>();

  @Output() dataForm = new EventEmitter<any>();
  

  onChangeFunctions: any=null;
  onFocusFunctions: any=null;
  onBlurFunctions: any=null;

  protected onInit = async (
    formPusherContext: PushContext,
    fetchContext: FetchContext,
    isComponentTable:boolean=false,
    updatecontext?:UpdateContext,
  ) => {

    this.formPusherContext = formPusherContext;
    this.fetchContext = fetchContext;
    if(updatecontext)
      this.updateContext = updatecontext;

    await this.InitTaks(isComponentTable)
  };

  ProcessInputs = async () => {
    
  } 

  protected abstract inputs: any[];

  protected getInputs(processedInputs:any[]) {
    return processedInputs
  }

  FetchData = async () => {
    const data: any = await this.formFetcherService.FetchPreviousData(
      this.fetchContext, false, this.oldValues
    );
    // console.log("FETCH: Componente: ",this,"//  DATOS PREVIOS:",data)
    this.oldValues = data
    if( data !== undefined && data.length > 0 ){
      this.dataForm.emit(data);
    }
  }

  onCancelEdit = () => {
    this.onCancelEditForm.emit()
    this.reloadCurrentRoute();
  }
  
  protected PushDataProcessor = (data: any) => data;
  protected FetchDataProcessor = (data: any) => data;

  PushForm = async ($event: any) => {
    const data = await this.RetrieveDataToPush($event)
    const args = this.PushUpdateArgBuilder(false)
    // console.log("Enviando datos. Componente:",this," Datos:",data, "FormPusher: ", this.formPusherContext)
    const response = await this.formPusherService.SubmitToBackEnd(this.formPusherContext, data,false,args)
    if( response !== undefined && response.length > 0 ){
      console.log('devolvemos datos al front', response);
      this.dataForm.emit(response);
    }
  };

  protected PushUpdateArgBuilder = (isUpdate:boolean) => {return undefined}

  UpdateForm = async ($event: any) => {
    const data = await this.RetrieveDataToPush($event)
    const args = this.PushUpdateArgBuilder(true)
    const response = await this.formPusherService.SubmitToBackEnd(this.updateContext, data,true,args);
    
    if( response.status !== undefined && response.status == 'success'){
      // this.sidebarStatusService.setDataSubject(true);
      this.onCancelEdit()
    }
  };
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
