import { Injectable } from '@angular/core';
import { FetchContext, LocalDataFetchContext } from '../../context/classes/form-options-bylist.classes';
import { HttpRequestService } from '../http/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class FormFetcherService {

  constructor(
    private httpRequestService: HttpRequestService,
  ) {}
  
  ErrorHandler = (error: string) => {
    // No puede ser un console log porque esta instancia no está a nivel de usuario sino de toda la app
  }
  
  async FetchPreviousData( fetchcontext: FetchContext, data:any ): Promise<any[]> {

    console.log('ENTRAMOS ACA 1', fetchcontext.apiURL);
    let apiURL = fetchcontext.apiURL;
    
    if ((fetchcontext as LocalDataFetchContext).data){
      return (fetchcontext as LocalDataFetchContext).data
    }
    
    console.log(data);
    return await this.httpRequestService.POST( apiURL, data, undefined, undefined, undefined, undefined, undefined, undefined)
  }

}
