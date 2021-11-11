
import { Injectable } from '@angular/core';
import {HttpRequestService} from '../http/http-request.service'
import { LoadingModalService } from './loading-modal.service';

@Injectable({
  providedIn: 'root'
})
export class WithLoadingService {

  constructor(
    private httpRequestService: HttpRequestService,
    private readonly loadingModalService: LoadingModalService,
    ) { }

    private loading = false;


  async POST(
    apiURL: string,
    data?: any,
    SuccessFoo?: any,
    numberOfTries?: number,
    tryInterval_ms?: number,
    ErrFoo?: any,
    ProcessingFoo?: any,
    FinallyFoo?: any,
    args?:any,
  ){

    const FormProcessingFoo = (error:any,args:any) =>{
      
      this.loadingModalService.show(true); // esto debe abrir el modal
      this.loading = true;

      if( typeof ProcessingFoo !== 'undefined' )
      ProcessingFoo(error,args)
    }
    const FormSuccessFoo = (args:any) =>{
      
      this.loading = false;
      this.loadingModalService.hide(false); //esto debe cerrar el modal
      
      if( typeof SuccessFoo !== 'undefined' )
      SuccessFoo(args)
    }
    const FormErrorFoo = (event:any,args:any) =>{
      
      this.loadingModalService.show(true); //esto debe cerrar este modal y mostrar el error
    
      if( typeof ErrFoo !== 'undefined' )
      ErrFoo()
    } 
    
    const FormFinallyFoo = (args:any) =>{
      this.loadingModalService.show(true);
      if( typeof FinallyFoo !== 'undefined' )
      FinallyFoo(args)
    }
    
    const response = await this.httpRequestService.POST(apiURL,data,FormSuccessFoo,numberOfTries,tryInterval_ms,FormErrorFoo,FormProcessingFoo,FormFinallyFoo, args);
    // console.log('MOSTRAMOS DATA FROM POST WITHLOADING: ', response);
    // if(response.status !== undefined && response.status == 'success'){
    //   this.loadingModalService.showNextPage('jjj');
    // }
    return response;
  }
}
