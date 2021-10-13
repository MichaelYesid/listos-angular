import { ListContext, KeyValuePair } from "../../../../engine/context/classes/form-options-bylist.classes";

export class FiltrosCiudadesListContext implements ListContext{
  apiURL: string="api/listasGenericasRequerimientos";
  moduleName:string="FILTROS-CIUDADES";
  IDField ='REQ_CIUDAD';
  valueField = 'CIU_DESCRIPCION';
}

export class FiltrosCargosPadrelesListContext implements ListContext{
  apiURL: string="api/listasGenericasRequerimientos";
  moduleName:string="FILTROS-CARGOSPADRE";
  IDField = 'CP_CODIGO';
  valueField = 'CP_DESCRIPCION';
}

export class FiltrosEnfoqueListContext implements ListContext{
  apiURL: string="api/listasGenericasRequerimientos";
  moduleName:string="FILTROS-ENFOQUE";
  IDField = 'CC_ENFOQUE_LABORAL';
  valueField = 'ENFOQUE';
}

export class FiltrosJornadasListContext implements ListContext{
  apiURL: string="api/listasGenericasRequerimientos";
  moduleName:string="FILTROS-JORNADAS";
  IDField = 'REQ_JOR_CODIGO';
  valueField = 'JORNADA';
}

