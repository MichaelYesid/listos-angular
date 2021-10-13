export interface ListContext {
  apiURL:string,
  IDField:string,
  valueField:string,
  params?:string[]
}

export interface KeyValuePair {
  key:string,
  value:string,
}

export interface PushContext {
  apiURL:string
}

export interface FetchContext {
  apiURL:string,
  autoFetch:boolean,
  data?:any;
}

export interface UpdateContext {
  apiURL:string,
}

export abstract class LocalDataFetchContext implements FetchContext {
  apiURL: string=null!;
  autoFetch: boolean=null!;
  data:any;
}
  