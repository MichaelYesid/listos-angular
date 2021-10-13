import { Injectable } from '@angular/core';
import { BaseSelfMadeList } from 'src/app/engine/context/classes/form-options-bylist-selfmade.classes';
import { KeyValuePair } from 'src/app/engine/context/classes/form-options-bylist.classes';

@Injectable({
  providedIn: 'root'
})
export class FormOptionsSelfmadeFetcherService {

  setOptions(baseSelfMadeList:BaseSelfMadeList){
    const dict = baseSelfMadeList.getDictionary();
    return this.DictBuilder(dict)
  }

  DictBuilder(dictionary:any):KeyValuePair[]{
    let res:KeyValuePair[] = []
    for (let key in dictionary) {
      const value = dictionary[key]
      const entry = {
        'key':key,
        'value':value
      }
      res.push(entry)
    }
    return res;
  }

}
