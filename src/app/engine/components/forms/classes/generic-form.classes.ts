import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { StructureInput } from './generic-input-base.classes';

const I18N_VALUES: any = {
  es: {
    weekdays: ['Lu', 'Ma', 'Mie', 'Ju', 'Vi', 'Sa', 'Do'],
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
  },
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'es';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day
      : '';
  }
}

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day
      : null;
  }
}

@Injectable()
export class CustomAYearMonthdapter extends CustomAdapter {
  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day
      : null;
  }
}

export class MyCustomFormControl extends FormControl {

  setStructureInput(input:StructureInput<any>){
    this.input = input
  }

  input: StructureInput<any>=null!;
  args: any;
  component:any;
}

export interface MyControls {
  [key: string]: MyCustomFormControl;
}

@Injectable()
export class CustomYearMonthOnlyDate extends CustomAdapter {
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month : null;
  }
}

export class AutoCompleteDataProcessor {
  constructor(private keyName: string, private valueName: string) {}

  RemapToKeyValue = (item: any) => {
    const newItem = {
      key: item[this.keyName],
      value: item[this.valueName],
    };
    return newItem;
  };

  RemapFromKeyValue = (item: any) => {
    let keyName;
    let value;
    if ((typeof item === 'string') || (typeof item === 'number')) {
      keyName = '__';
      value = item.toString().toUpperCase();
    } else {
      keyName = item['key'];
      value = item['value'];
    }

    let newItem: any = {};
    // if(keyName.substring(0,2)==="__")
    //   keyName = ""
    newItem[this.keyName] = keyName;
    newItem[this.valueName] = value;
    return newItem;
  };

  FetchProcessor = (data: any) => {
    if (data) {
      return data.map((item: any) => this.RemapToKeyValue(item));
    } else {
      return data;
    }
  };

  PushProcessor = (data: any) => {
    if (data !== undefined && data.length > 0) {
      const dat = data.map((item: any) => this.RemapFromKeyValue(item));
      return JSON.stringify(dat);
    } else {
      return null;
    }
  };

  SingleFetchProcessor = (data: any) => {
    if (data) {
      return this.RemapToKeyValue(data);
    } else {
      return data;
    }
  };

  SinglePushProcessor = (data: any) => {
    //console.log('Mostramos data: ', data);
    if (data !== undefined && !!data.key) {
      // console.log('ENTRAMOS SINGLE PUSH ');
      const dat = this.RemapFromKeyValue(data);
      return JSON.stringify(dat);
    } else {
      return null;
    }
  };
}

export class DateDataProcessor {
  DateMonthToText = (datetype: any): string => {
    if (!datetype) return 'presente';

    const date: Date = new Date(datetype);
    const datestring = date.getMonth() + 1 + '/' + date.getFullYear();
    return datestring;
  };
}

export class InputRepeaterProcessor {

  Process = (originalFieldNames:string[],dataProcessor?:any) => {
    // console.log("originalFieldNames",originalFieldNames)
    if(!originalFieldNames)
      return null

    let res:any = {}
    originalFieldNames.forEach((elemkey:string)=>{
      
      let value = document.getElementById(elemkey)?.getAttribute('data-value')
      // console.log("explorando key ..."+elemkey,"  ... value =>",value)
      const segments= elemkey.split("___")
      const loop = segments[1]
      const key = segments[2]

      if(dataProcessor){
        // console.log('MOSTRAMOS QUE ENTRAMOS A DATAPROCESSOR', dataProcessor);
        if(key in dataProcessor){
          const foo = dataProcessor[key]
            value = foo(value)
            // console.log('mostramos foo value: ', value);
        }
      }
      if(!res[loop])
        res[loop]={}
      res[loop][key] = value
      
    })
    // console.log("res before clean",JSON.parse(JSON.stringify(res)))
    for(let loop in res){
      let count=0;
      for(let key in res[loop]){
        if(res[loop][key]){
          count=1
          break;
        }
      }
      if(count===0){
        delete res[loop]
      }
    }
    // console.log("res after clean=>",res,"  originalFieldNames =>",originalFieldNames,"   reslength=> ",res.length)
    const response = JSON.stringify(res);
    if(response==="{}"){
      return null
    }
    return response
  }


  GetSelectorValues = async (selectors:string) => {
    let res = []
    const cssElements:NodeListOf<Element> = document.querySelectorAll(selectors);
    for (let i = 0; cssElements[i]; i++) {
      const node = (cssElements[i] as HTMLElement)
      const val:string = node.getAttribute('data-value')!
      res.push(JSON.parse(val))
  }
    // console.log(res)
    return res;
  }

  RemapKeyToLoopKey = (inputkey:string,key:string,loopKey:any) => {
    return inputkey+"___"+key+"___"+loopKey;
  }

  RemapKeyFromLoopKey = (mappedKey:string) => {
    const segments = mappedKey.split("___")
    return segments[2]
  }

  GetLoopKey = (mappedKey:string) => {
    let segments = mappedKey.split("___")
    return segments[1]
  }

}

export class FormEngineCustomValidator {

  static RequiredFileType( type: string ) {
    //console.log("tipoooo",type)
    const validatorFn:ValidatorFn = (control: AbstractControl):ValidationErrors => {
      let validationErrors:ValidationErrors=null!;
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        if ( type.toLowerCase() !== extension.toLowerCase() ) {
          validationErrors = {
            requiredFileType: true
          };
          return validationErrors
        }
        return validationErrors;
      }
      return validationErrors;
    };
    
    return validatorFn
  }

}

export class CheckboxMultipleFiltersProcessor {
  RemapFromKeyValue = (itemsArr:any, keyItem:any) => {
    // console.log(' ///////////////////////');
    // console.log('MOSTRAMOS QUE HAY ACA', itemsArr, keyItem);
    
    let data:any = []; 
    const forItems:[] = itemsArr;

    // console.log(forItems.length);

    if(forItems.length > 0){  
      // console.log('ENTRAMOS AP', forItems);
      forItems.forEach( (valorItem:any) => {
        let valor = { [keyItem]: valorItem };
        data.push(valor); 
      });
    }
    // console.log('MOSTRAMOS DATA:', data);
    return JSON.stringify(data);
  
  }
}