import { FetchContext } from "../../../../engine/context/classes/form-options-bylist.classes";

export class ConsultarDatosPaginaContext implements FetchContext{
  apiURL: string="api/v1/PaginaListos/consultarDatosPagina";
  autoFetch: boolean=true;
}