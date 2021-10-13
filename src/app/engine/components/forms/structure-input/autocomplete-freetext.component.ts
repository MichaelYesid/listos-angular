import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import { AutocompleteBaseComponent } from './base/autocomplete-base.component';
import { KeyValuePair } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MyCustomFormControl } from '../classes/generic-form.classes';


@Component({
  selector: 'app-autocomplete-freetext',
  templateUrl: './base/autocomplete.component.html'
})
export class AutocompleteFreeTextComponent extends AutocompleteBaseComponent {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() formControls:any;
  @Input() submitted?:boolean;
  @Input() oldValue:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  @Input() onChangeFunction:any;
  @Input() onBlurFunction:any;

  onBlur = ($event:any) => {
    if(this.onBlurFunction){
      if(typeof this.onBlurFunction==="function"){
        this.onBlurFunction($event,this)
      }
    }
  }

  freeTextValid:boolean = true;
  freeText:boolean = true;

  onAntesDeValidarTermLength = (term:any) => {
    this.searchFailed=false;
    // console.log(term?.length, term)
    if(term?.length>0)
      this.freeTextValid=true
    else
      this.freeTextValid=false
  }
  
  onAntesDeBuscar = () => {
    this.searching=true;
    this.freeTextValid=true
  }

  onDespuesDeBuscar = (term:any, res:any) => {
    // console.log('ESTES ES RES:', res, term);
    if( res == 0 ){
      const valueCapitalized = term.toUpperCase()
      const model:KeyValuePair = this.keyValuePairCreator(valueCapitalized)
      if(this.isArrayOfItems===true){
        this.model.push(model)
      }else{
        this.model = model
      }
      // this.formcontrol.setValue('')
    }
    
  }

}