import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import { AutocompleteBaseComponent } from './base/autocomplete-base.component';
import { MyCustomFormControl } from '../classes/generic-form.classes';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './base/autocomplete.component.html'
})
export class AutocompleteComponent extends AutocompleteBaseComponent {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() formControls:any;
  @Input() submitted?:boolean;
  @Input() oldValue:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  @Input() onChangeFunction:any;
  @Input() onBlurFunction:any;

  freeText:boolean=false
  freeTextValid:boolean=false
  
  onBlur = ($event:any) => {
    if(this.onBlurFunction){
      if(typeof this.onBlurFunction==="function"){
        this.onBlurFunction($event,this)
      }
    }
  }

  

}