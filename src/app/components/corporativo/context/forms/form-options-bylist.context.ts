import { ListContext, KeyValuePair } from "../../../../engine/context/classes/form-options-bylist.classes";

export class FiltrosCiudadesListContext implements ListContext{
  apiURL: string="api/listasGenericasRequerimientos";
  moduleName:string="FILTROS-CIUDADES";
  IDField ='REQ_CIUDAD';
  valueField = 'CIU_DESCRIPCION';
}

