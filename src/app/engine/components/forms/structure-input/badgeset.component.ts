import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map,filter, tap, finalize, switchMap, concatMap} from 'rxjs/operators';
import { FormOptionsFetcherService } from 'src/app/engine/services/form-connection/form-options-fetcher.service';
import { KeyValuePair, ListContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { FormOptionsSelfmadeFetcherService } from 'src/app/engine/services/form-connection/form-options-selfmade-fetcher.service';
import { BaseSelfMadeList } from 'src/app/engine/context/classes/form-options-bylist-selfmade.classes';
import { CiudadfetcherService } from 'src/app/engine/components/services/misc/ciudadfetcher.service';
import { AutocompleteBaseComponent } from './base/autocomplete-base.component';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { AutocompleteFreeTextComponent } from './autocomplete-freetext.component';


@Component({
  selector: 'app-badgeset',
  templateUrl: './base/badgeset.component.html',
})
export class BadgeSetComponent extends AutocompleteFreeTextComponent {


  @Input() submitting:boolean = false;

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() formControls:any;
  @Input() submitted?:boolean;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;

  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  isArrayOfItems=true;

  tieneAnadir = true;

  options:any[]=[];

  protected DoSomethingAfterLoad = (model:any) => {
    this.SetModel(model)
  }

  inputFormatter = (val:any) => {return ""}

  uppermodel = (val:any) => {return val}

  SetModel = (model:any) => {
    console.log("MODEL==>",model)
    this.formcontrol.setValue(model);
    (this.formcontrol as MyCustomFormControl).args=model
  }

  SelectItem = ($event:any) => {
    this.model.push($event.item);
    this.SetModel(this.model)
  }
    
  onRemoveItem = (event:any) => {
    this.model = this.model.filter((item:any) => (item.key !== event));

    this.SetModel(this.model)
  }

  onDespuesDeBuscar = (term:any, res:any) => {
    console.log(term,res);
  }

  protected finder = (term:string) => {
    let res = this.options.filter((element:KeyValuePair) => new RegExp(this.escapeRegExp(term), 'm').test(element.value))
    //console.error("ESTE ES EL MODELO EN LA MARCHA",this.model)

    const modelvalues = this.model.map((item:any)=>item.value)
    
    res = res.filter((element:KeyValuePair) => !modelvalues.includes(element.value));
    return res
  }

  escapeRegExp(str:any) {
    return (str as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
}