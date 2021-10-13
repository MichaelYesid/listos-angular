export interface SelfMadeListInterface{
  dictionary:any;
}

export abstract class BaseSelfMadeList {
  abstract dictionary:any;
  getDictionary(){
    return this.dictionary
  }
}

export class EmptySelfMadeList extends BaseSelfMadeList {
  dictionary:any;
}