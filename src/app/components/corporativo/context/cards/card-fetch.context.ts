import { FetchContext } from "../../../../engine/context/classes/form-options-bylist.classes";

export class ConsultarRequerimientosClienteFetchContext implements FetchContext{
  apiURL: string="api/consultarRequerimientosCandidato";
  autoFetch: boolean=true;
}