import { Input, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map,filter, tap, finalize, switchMap, concatMap} from 'rxjs/operators';
import { FormOptionsFetcherService } from 'src/app/engine/services/form-connection/form-options-fetcher.service';
import { KeyValuePair, ListContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { BaseSelfMadeList } from 'src/app/engine/context/classes/form-options-bylist-selfmade.classes';
import { CiudadfetcherService } from 'src/app/engine/components/services/misc/ciudadfetcher.service';
import { MultiOptionsBase } from './multioptions-base';


@Component({
  selector: 'app-autocomplete-base',
  template: ``, 
})
export abstract class AutocompleteBaseComponent extends MultiOptionsBase implements OnInit,OnChanges {

  @Input() title:any = '';

  @Input() onFocusFunction:any;
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() oldValue:any;

  freeText:boolean=false
  freeTextValid:boolean=false
  
  oldValueSubject = new Subject()
  isArrayOfItems:boolean=false;

  
  counter = 0 ;

  constructor(
    protected ciudadfetcherService:CiudadfetcherService,
    protected formOptionsFetcherService:FormOptionsFetcherService,
  )
  {
    super(ciudadfetcherService,formOptionsFetcherService)
  }

  async ngOnInit(): Promise<void> {
    // console.error("INICIANDO AUTOCOMPLETE BASE")
    if(this.isArrayOfItems===true){
      this.model = []
    }
  }

  setJSONmodel = () => {
    return JSON.stringify(this.model)
  }
  

  fieldTextType = false;

  model?: any = {};
  searching = false;
  searchFailed = false;
  pleaseaddletters = false;

  inputFormatter = (kvpair: KeyValuePair) => kvpair.value; //el que se muestra en el campo
  outputFormatter = (kvpair: KeyValuePair) => kvpair.value;

  protected finder = (term:string) => {
    // console.log(term, this.options);
    if(this.options !== null){
      return this.options.filter((element:KeyValuePair) => new RegExp(this.escapeRegExp(term), 'm').test(element.value))
    }else{
      return [];
    }
  }

  protected afterFinding = (term:string,res:any):any=> {
    // console.log(term,res);
    if(res.length === 0){
      this.searchFailed=true
      return 0;
    }else{
      return res.slice(0, 10);
    }
  }

  private filterTerm = (term:string) => {
    this.searching=false

    let res:any = '';
    if(term===""){
      res= [];
    }else{
      res = this.finder(term)
      res = this.afterFinding(term,res)
      // console.log(res);
    }
    this.onDespuesDeBuscar(term,res);
    return res
  }

  private searchFun = (text$: Observable<string>) => text$.pipe(
    distinctUntilChanged(),
    tap(()=>this.searching=false),
    tap(this.onAntesDeValidarTermLength),
    filter(term => term.length >= 2),
    tap(this.onAntesDeBuscar),
    debounceTime(200),
    map((term:string)=>term.toUpperCase()),
    map(term =>this.filterTerm(term)),
  )

  onAntesDeValidarTermLength = (term:any) => {
    this.searchFailed=false;
    this.freeTextValid=false;
  }

  onAntesDeBuscar = (term:any) => {
    this.searching=true;
    this.freeTextValid=false;
  }

  onDespuesDeBuscar = (term:any, res:any) => {}

  search = (text$: Observable<string>) => this.searchFun(text$)

  protected getKeyValuePairFromKey = (options:any[],oldvalue:any) => {
    // console.error("TODAS LAS OPCIONES=>",this.options)
    return options.filter((element:KeyValuePair) => new RegExp(this.escapeRegExp(oldvalue), 'm').test(element.key))[0]??'Error'
  }

  escapeRegExp(str:any) {
    return (str as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  onSelect($event:any, input:any) {
    $event.preventDefault();
    this.formcontrol.setValue('')
  }

  onAnadir = () => {
    const value:string = this.formcontrol.value;
    const valueCapitalized = value.toUpperCase()
    const model:KeyValuePair = this.keyValuePairCreator(valueCapitalized)
    if(this.isArrayOfItems===true){
      this.model.push(model)
    }else{
      this.model = model
    }
    this.formcontrol.setValue('')
  }

  protected DoSomethingAfterLoad = (model:any) => {}


  setPreviousSelectValue = async () => {
    // console.error("SETEANDO OLDVALUE AUTOCOMPLETE")
    // console.log("options==>",options," // isarray==>",this.isArrayOfItems," //  oldvalue==>",this.oldValue)
    if(this.oldValue && this.options){
      if(this.isArrayOfItems===true){
        this.model = []
        let keyName:any;
        for(keyName in this.oldValue){
          const oldItem = this.oldValue[keyName]
          this.model.push(oldItem)
        }
      }else{
        this.model = null
        if((typeof this.oldValue==="string" )|| (typeof this.oldValue==="number") ){
          this.model = this.getKeyValuePairFromKey(this.options,this.oldValue)
        }else{
          this.model = this.oldValue
        }
      }
      this.DoSomethingAfterLoad(this.model) 
    }
  }
  
  private getModelValues = () => {
    if(this.isArrayOfItems===true){
      return this.model.map((item:any)=>item.value)
    }else{
      return this.model?.value ?? ''
    }
  }

  protected TextExistsInModelValues = (text:string):boolean => {
    const values = this.getModelValues()
    if(this.isArrayOfItems===true)
      return values.includes(text)
    return values===text
  }

  protected keyValuePairCreator = (value:any,key:any=undefined) => {
    if(!key){
      key="__"+this.counter
      this.counter = this.counter +1
    }
      
    const keyValuePair:KeyValuePair = {
      'key':key,
      'value':value
    }
    return keyValuePair
  }

}