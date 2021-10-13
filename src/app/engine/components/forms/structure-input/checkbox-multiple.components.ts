import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from "rxjs";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseSelfMadeList } from 'src/app/engine/context/classes/form-options-bylist-selfmade.classes';
import { ListContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { FormOptionsFetcherService } from 'src/app/engine/services/form-connection/form-options-fetcher.service';
import { CiudadfetcherService } from '../../services/misc/ciudadfetcher.service';
import { HttpRequestService } from 'src/app/engine/services/http/http-request.service';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-checkbox-multiple',
  template: `

  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <!-- Input -->
    <div class="d-block w-100" *ngIf="optionsCheckboxChecked">
      <div *ngFor="let optionChecked of optionsCheckboxChecked; let i = index" class="custom-control custom-checkbox">
        <input [formControlName]="input.key"  [id]="input.key+i+'_CHECKED'" value="" [type]="input.type" class="custom-control-input"
          [attr.data-value]="optionChecked.key" (change)="onChange($event)" [checked]="true">
        <label class="custom-control-label text-sm" [attr.for]="input.key+i+'_CHECKED'">{{optionChecked.value}}</label>
      </div>
    </div>
    <div class="d-block w-100" *ngIf="optionsCheckboxWithOutChecked">
      <div *ngFor="let option of optionsCheckboxWithOutChecked; let i = index" class="custom-control custom-checkbox">
        <input [formControlName]="input.key"  [id]="input.key+i" value="" [type]="input.type" class="custom-control-input"
          [attr.data-value]="option.key" (change)="onChange($event)">
        <label class="custom-control-label text-sm" [attr.for]="input.key+i">{{option.value}}</label>
      </div>
    </div>
    <!-- Message error -->
    <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>`,
  styles: [
  ]
})
export class CheckboxMultipleComponent implements OnChanges {

  @Input() title:any = '';
  @Input() input:any;
  @Input() options:any[]=null!;
  @Input() form = new FormGroup({});
  @Input() formControls:any;
  @Input() submitted?:boolean;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  
  modelCheckbox:any = [];
  isArrayOfItems:boolean=true;
  checkedInput:any;
  optionsCheckboxChecked:any[]=null!;
  optionsCheckboxWithOutChecked:any[]=null!;
  ready=false;
  
  constructor(
    private httpRequestService: HttpRequestService,
  ){}
  
  setPreviousSelectValue = async () => {
    
    // console.log(this.options);
    if( this.oldValue && this.options ){
      // console.log('MOSTRAMOS VALORES VIEJOS: ',JSON.parse(this.oldValue), this.input.key);
      let arrOldValues:any = [];
      JSON.parse(this.oldValue).forEach( (element:any) => {
        arrOldValues = Object.values(element);
      });
      // console.log('Mostramos array old Values ',arrOldValues);
      if( arrOldValues.length > 0){
        // console.log(arrOldValues[0]);
        this.checkedInput = arrOldValues[0];
        this.modelCheckbox.push(arrOldValues[0])
        this.SetModel(arrOldValues);
        this.ready=true
      }
    }
    this.ValidateOptionsChecked();
  }

  @Input() optionMakers:any

  
  protected ListMaker = async (listContext:ListContext) => {
    return await this.setOptions(listContext)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if("oldValue" in changes && this.oldValue)
      this.setPreviousSelectValue()
    if("optionMakers" in changes && this.optionMakers)
       this.Fill()
  }

  protected Fill = async() => {
    // console.log(this.input.key)
    await this.ListMaker(this.input.options).then((options)=>{
      // console.log(options);
      // this.setPreviousSelectValue(options)
      this.options=options
      this.setPreviousSelectValue()
    })
  }

  private async Fetch (listContext:ListContext,data?:any):Promise<any[]> {
    return await this.httpRequestService.POST(listContext.moduleName+"-Form-Options-Fetcher",listContext.apiURL,data,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
  }
  
  async setOptions(listcontext: ListContext,data?:any){
    let responsefinal:any = [];
    await this.Fetch(listcontext,data).then( (any:any) => {
      // CAPTURAMOS NOMBRE DEL MODULO PARA PODER ACCEDER A CADA ARRAY DE OBJECTOS DEL SERVICIO
      const fieldArr = (listcontext.moduleName).replace('FILTROS-','');
      any[fieldArr].forEach((row:any) => {
        const filter = {
          'key':row[listcontext.IDField],
          'value':row[listcontext.valueField],
        }
        responsefinal.push(filter)
      }); 
    }).catch((error)=>{
      // console.error(error.message)
    });
    
    return responsefinal;
  }
  
  onChange = ($event:any) => {

    // console.log($event, this.modelCheckbox);
    let temporalModel = this.modelCheckbox;
    
    if ($event.target.checked){
      console.log('-------------------', );
      // console.log('Entramos porque esta checkeado', $event.target.dataset.value);
      // console.log(temporalModel);
      temporalModel.push($event.target.dataset.value);
      // console.log('MOSTRAMOS CHECK', temporalModel);
      this.SetModel(temporalModel);
      this.ValidateOptionsChecked();
      
      // return ($event.target as Element).scrollTop;

    } else {
      // console.log('-------------------');
      
      // console.log('BORRAMOS CHECK', temporalModel);

      const index: number = temporalModel.indexOf($event.target.dataset.value);
      // console.log(index);

      temporalModel.splice(index, 1);

      // console.log('MOSTRAMOS MODEL', temporalModel);
      this.SetModel(temporalModel);
      this.ValidateOptionsChecked();
    }
    
  }
  
  SetModel = (model:any) => {
    // console.log("MODEL==>",model)
    this.formcontrol.setValue(model);
    // this.model = model;
    // (this.formcontrol as MyCustomFormControl).args=model
  }

  ValidateOptionsChecked = () => {
    if(this.options){
      this.optionsCheckboxWithOutChecked = this.options.filter((values) =>{ return !this.modelCheckbox.includes(values.key) });
      // console.log(this.optionsCheckboxWithOutChecked);
      this.optionsCheckboxChecked = this.options.filter((values) =>{ return this.modelCheckbox.includes(values.key) });
      // console.log(this.optionsCheckboxChecked);
    }
  }

}
