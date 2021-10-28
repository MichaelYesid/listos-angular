import { Injectable } from '@angular/core';
import { PushContext } from '../../context/classes/form-options-bylist.classes';
import { WithLoadingService } from '../custom-connections/with-loading.service';

@Injectable({
  providedIn: 'root'
})
export class FormPusherService {

  constructor(
    private httpRequestService: WithLoadingService,
  ) {}

  async SubmitToBackEnd( pushContext: PushContext,data:any, args:any=undefined){
    let apiURL = pushContext.apiURL;
    return await this.httpRequestService.POST(apiURL,data,undefined,undefined,undefined,undefined,undefined,undefined, args);
  }

}
