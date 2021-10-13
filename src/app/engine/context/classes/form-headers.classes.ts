import { KeyValuePair } from "./form-options-bylist.classes";

export interface FormHeadersBaseContext{
    headers:KeyValuePair[]
    ignore:any[]
    dateColumns:any[]
    monthDateColumns:any[]
    docColumns:any[]
    watchColumns:any[]
    buttonColumns:any[]
    customTextColumns:any[]
    dropdownColumns:any[]
    keyCodigoRegistro:string;
}