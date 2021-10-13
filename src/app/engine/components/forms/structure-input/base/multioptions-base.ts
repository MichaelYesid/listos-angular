import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { BaseSelfMadeList } from "src/app/engine/context/classes/form-options-bylist-selfmade.classes";
import { ListContext } from "src/app/engine/context/classes/form-options-bylist.classes";
import { FormOptionsFetcherService } from "src/app/engine/services/form-connection/form-options-fetcher.service";
import { FormOptionsSelfmadeFetcherService } from "src/app/engine/services/form-connection/form-options-selfmade-fetcher.service";
import { CiudadfetcherService } from "../../../services/misc/ciudadfetcher.service";
import { MyCustomFormControl } from "../../classes/generic-form.classes";
import { AbstractValueSetter } from "./abstract-value-setter.helper";

@Component({
    selector: 'app-autocomplete-base',
    template: ``, 
  })
export abstract class MultiOptionsBase extends AbstractValueSetter implements OnChanges {

  @Input() input:any = [];
  @Input() options:any[]=null!;
  ready=false;

  @Input() formcontrol:MyCustomFormControl = null!;

  constructor(
    protected ciudadfetcherService:CiudadfetcherService,
    protected formOptionsFetcherService:FormOptionsFetcherService,
  ){
    super()
  }

  abstract setPreviousSelectValue ():void;
  
  protected ListMaker = async (listContext:ListContext) => {
    return await this.formOptionsFetcherService.setOptions(listContext)
  }
  
  protected formOptionsSelfmadeFetcherService:FormOptionsSelfmadeFetcherService = new FormOptionsSelfmadeFetcherService
  
  protected SelfMadeListMaker = (baseSelfMadeList:BaseSelfMadeList) => {
    return this.formOptionsSelfmadeFetcherService.setOptions(baseSelfMadeList)
  }

  @Input() optionMakers:any
  @Input() oldValue:any

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('mostramos cambio');
    if("oldValue" in changes && this.oldValue && this.options)
      this.setPreviousSelectValue()
    if("optionMakers" in changes && this.optionMakers)
      // console.log('Cambios de option makers', this.optionMakers);
      this.Fill()
  }

  // protected Fill = async() => {

  //   //console.log(JSON.parse(JSON.stringify(this.optionMakers)))
  //   // console.log(this.input.key)
  //   if(this.optionMakers instanceof Subject){
  //     //////////////////
  //     this.optionMakers.subscribe(async (val:any)=>{
  //       if(val){
  //         //console.log("Trayendo opciones con un val =",val)
  //         await this.ciudadfetcherService.FillCities(val).then((options:any)=>{
  //           // console.log(options)
  //           this.setPreviousSelectValue()
  //           this.options=options
  //         })
  //       }
  //     });
  //     //////////////////
  //     //console.log('Es1');
  //   }else{
  //     this.options=this.optionMakers
  //   }
  // }

  protected Fill = async() => {
    // console.log(this.input.key)
    if(this.optionMakers instanceof BaseSelfMadeList){
      this.options = await this.SelfMadeListMaker(this.optionMakers)
      this.setPreviousSelectValue()
      //console.log('Es');
    } else if(this.optionMakers instanceof Subject){
      //////////////////
      // console.log("suscripcion realizada: ",this.input.key)
      this.optionMakers.subscribe(async (val:any)=>{
        // console.log(this.input.key,": cambio de suscripcion",val,JSON.parse(JSON.stringify(val)))
        // console.log('val', val);
        if(val?.key == undefined){
          //console.log("Trayendo opciones con un val =",val)
          await this.ciudadfetcherService.FillCities(val).then((options:any)=>{
            // console.log('MOSTRAMOS CIUDADES',options)
            this.options=options
            this.setPreviousSelectValue()
          })
        }else if(val?.key !== undefined && val?.key == 'other'){
            // console.log('MOSTRAMOS CLIENTE');
            this.options= val?.values
            this.setPreviousSelectValue()
        }
      });
      //////////////////
      //console.log('Es1');
    }else{
      // console.log('Es2', this.optionMakers);
      await this.ListMaker(this.optionMakers).then((options)=>{
        this.options=options
        this.setPreviousSelectValue()

      })
    }
  }
}
