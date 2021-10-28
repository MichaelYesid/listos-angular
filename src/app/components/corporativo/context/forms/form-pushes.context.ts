import { PushContext } from "../../../../engine/context/classes/form-options-bylist.classes";

export class SolicitudContactoListosPushContext implements PushContext{
  apiURL: string="api/v1/sendMail/postMail";
  moduleName:string="DATOS-BASICOS";
}