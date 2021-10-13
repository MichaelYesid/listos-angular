import { Injectable } from '@angular/core';
import { KeyValuePair, ListContext } from '../../context/classes/form-options-bylist.classes';
import { HttpRequestService } from '../http/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class FormOptionsFetcherService {

  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  ErrorHandler = (error:string) => {
    // No puede ser un console log porque esta instancia no está a nivel de usuario sino de toda la app
  }

  private async Fetch (listContext:ListContext,data?:any, isAdminUpdate?:any):Promise<any[]> {
  

    let apiURL = listContext.apiURL;

    return await this.httpRequestService.POST(apiURL,data,undefined,undefined,undefined,undefined,undefined,undefined)
  }

  async setOptions(listcontext: ListContext,data?:any, isAdminUpdate:any = false){
    let responsfinal: KeyValuePair[]=[];
    await this.Fetch(listcontext,data, isAdminUpdate).then( (any:any) => {
      any.forEach((row:any) => {
        if(row){
          const filter = {
            'key':row[listcontext.IDField],
            'value':row[listcontext.valueField],
          }
          responsfinal.push(filter)
        }

      });
    }).catch((error)=>{
      //console.error(error.message)
    });
    return responsfinal;
  }

}
