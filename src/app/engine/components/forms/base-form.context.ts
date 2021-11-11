import { FormFetcherService } from 'src/app/engine/services/form-connection/form-fetcher.service';
import { FormPusherService } from 'src/app/engine/services/form-connection/form-pusher.service';
import { FetchContext, UpdateContext } from '../../context/classes/form-options-bylist.classes';
import { PushContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormTemplate } from './base-form.template';
import { FormOptionsFetcherService } from 'src/app/engine/services/form-connection/form-options-fetcher.service';

@Component({
  selector: 'app-base-form',
  template: ``,
})
export abstract class BaseFormContext extends BaseFormTemplate {

  protected formPusherContext: PushContext = null!;
  protected fetchContext: FetchContext = null!;
  protected updateContext: UpdateContext = null!;
  protected requireValidation:boolean=null!;
  protected isAdminUpdate:boolean=null!;

  constructor(
    protected formPusherService: FormPusherService,
    protected formFetcherService: FormFetcherService,
    protected formOptionsFetcherService: FormOptionsFetcherService,
    protected router: Router
  ) {
    super()
  }


  outputError:any=null!;
  manageLoadingFromViews:any=false;
  messageCustomLoading:any;

  inputs$: any;
  label_submit:any;

  setInput(inputs$:any){
    this.inputs$ = inputs$;
  }
  @Input() oldValues:any;

  @Output() oldValuesObtained = new EventEmitter<any>();
  @Output() responseHandler = new EventEmitter<any>();
  
  SetOldValues = (data:any) => {
    this.oldValues=data;
    this.oldValuesObtained.emit(this.oldValues);
  }

  protected HasAutoFetch = () => {
    return this.fetchContext?.autoFetch || false
  }

  protected GetFormInputs = () => {
    return this.inputs;
  };

  @Input() isUpdating:boolean=false;
  @Output() finishedLoading = new EventEmitter<any>();
  @Output() onCancelEditForm = new EventEmitter<any>();
  
  @Input() hasSubmitButton:boolean=true;

  onChangeFunctions: any=null;
  onFocusFunctions: any=null;
  onBlurFunctions: any=null;

  protected onInit = async (
    formPusherContext: PushContext,
    fetchContext: FetchContext,
    isComponentTable:boolean=false,
    updatecontext?:UpdateContext,
    requireValidation:boolean=true,
    isAdminUpdate:boolean=false,
  ) => {
    this.requireValidation = requireValidation
    //console.log("iniciando form context")
    this.formPusherContext = formPusherContext;
    this.fetchContext = fetchContext;
    this.isAdminUpdate = isAdminUpdate;
    // console.log(this.isAdminUpdate);
    if(updatecontext)
      this.updateContext = updatecontext;
    await this.InitTaks(isComponentTable)
  };

  ProcessInputs = async () => {}

  protected abstract inputs: any[];

  protected getInputs(processedInputs:any[]) {
    return processedInputs
  }

  buildRequestData = () => {
    return null
  }

  FetchData = async () => {
    const data = this.buildRequestData()
    // console.log("fetch_data service")
    return await this.formFetcherService.FetchPreviousData(
      this.fetchContext,data
    );
  }

  onCancelEdit = () => {
    this.onCancelEditForm.emit()
    this.reloadCurrentRoute();
  }

  protected PushDataProcessor = (data: any) => data;
  protected FetchDataProcessor = (data: any) => data;
  nextRoute:any=null!;

  PushForm = async ($event: any) => {
    const data = await this.RetrieveDataToPush($event)
    // console.log(data);
    
    if( this.manageLoadingFromViews == true ){
      this.ready = false;
    }

    if (data!=="no-enviar"){
      const args = this.PushUpdateArgBuilder(false)

      // console.log("Enviando datos. Componente:",this," Datos:",data, ' UPDATED', this.isAdminUpdate)

      await this.formPusherService.SubmitToBackEnd(this.formPusherContext, data).then(async (response)=>{
        await this.responseHandlerFun(response)
        this.responseHandler.emit(response)
        
        if( this.manageLoadingFromViews == true ){
          setTimeout(() => {
            this.ready = true;
          }, 800);  
        }

        if( ( response.status !== undefined && response.status == 'success') || response == true ){
          
          if(this.nextRoute==="no"){
            // No hacer nada
          }else if(this.nextRoute){
            // console.log("YENDO A RUTAAA:",this.nextRoute)
            this.router.navigate([this.nextRoute]);
          }else{
            this.reloadCurrentRoute();
          }
        }
      })
    }
    
  };

  protected PushUpdateArgBuilder = (isUpdate:boolean) => {return undefined}

  UpdateForm = async ($event: any) => {
    const data = await this.RetrieveDataToPush($event)
    const args = this.PushUpdateArgBuilder(true)
    const response = await this.formPusherService.SubmitToBackEnd(this.updateContext, data);
    
    if( response.status !== undefined && response.status == 'success'){
      
      this.onCancelEdit()
    }
    this.responseHandlerFun(response).then(()=>{
      this.responseHandler.emit(response)
    })
  };


  responseHandlerFun = async (response:any):Promise<void> => {
    
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
