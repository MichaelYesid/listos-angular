import { KeyValuePair } from 'src/app/engine/context/classes/form-options-bylist.classes';
import  {BaseSelfMadeList} from '../../../../engine/context/classes/form-options-bylist-selfmade.classes';

export class Empty_SelfMadeContext extends BaseSelfMadeList {

  constructor(dictionary:any){
    super()
    this.dictionary = dictionary
  }

  dictionary:any = {
  };

}


export class RangoSalariosSelfMadeContext extends BaseSelfMadeList {

  dictionary:any = {
  '0': '900000',
  '1': '10000000'
  };
  
}