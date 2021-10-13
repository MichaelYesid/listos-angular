import { PushContext } from "../../../../engine/context/classes/form-options-bylist.classes";

export class FiltrosBuscarEmpleoPushContext implements PushContext{
  apiURL: string="api/consultarRequerimientosCandidato";
  moduleName:string="DATOS-BASICOS";
}

export class PostularUsuarioPushContext implements PushContext{
  apiURL: string="api/postulacionUsu";
  moduleName:string="[POSTULAR USUARIO]";
}
