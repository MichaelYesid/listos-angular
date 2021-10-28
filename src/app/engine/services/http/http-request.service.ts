import { Injectable } from '@angular/core';
import { HttpConnectionService } from './http-connection.service';
import { AlertService } from './../alerts/alerts.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {

  constructor(
    private httpConnectionService: HttpConnectionService,
    private alertService:AlertService
  ) {}
  
  private default_numberOfTries = 3;
  private default_tryInterval_ms = 200;
  
  async POST(
    apiURL: string,
    data?: any,
    SuccessFoo?: any,
    numberOfTries?: number,
    tryInterval_ms?: number,
    ErrFoo?: any,
    ProcessingFoo?: any,
    FinallyFoo?: any,
    args?:any
  ) {
    const typeofRequest = 'POST';

    return await this.RequestHandler(
      typeofRequest,
      apiURL,
      data,
      SuccessFoo,
      numberOfTries,
      tryInterval_ms,
      ErrFoo,
      ProcessingFoo,
      FinallyFoo,
      args,
    );
  }

  private ConvertData(
    data:any,
    typeofRequest:string
  ){}

  private async RequestHandler(
    typeofRequest: string,
    apiURL: string,
    data?: any,
    SuccessFoo?: any,
    numberOfTries?: number,
    tryInterval_ms?: number,
    ErrFoo?: any,
    ProcessingFoo?: any,
    FinallyFoo?: any,
    args?: any,
  ) {

    console.log(apiURL,data); 

    let responseReq:any;
    
    try {

      if(typeof ErrFoo !== 'undefined')
        ProcessingFoo(args);
      // let form_data = new FormData();
      
      // for ( var key in data ) { 
      //   if(data[key]){
      //     form_data.append(key, data[key]);
      //   }
      // }
      
      let form_data = data;

      responseReq = await this.ConnectionTrier(
        typeofRequest,
        apiURL,
        form_data,
        numberOfTries || this.default_numberOfTries,
        tryInterval_ms || this.default_tryInterval_ms,
      )
      
      // console.log('MOSTRAMOS RESPONSE DESDE HTTPREQUEST: ',responseReq);
      if(responseReq.status && responseReq.status == 'success' || responseReq == true){
        this.alertService.clear();
        if( !responseReq.message){
          this.alertService.success('Información guardada exitosamente.');
        }else{
          this.alertService.success(responseReq.message);
        }
      }

    } catch (error) {

      if(typeof ErrFoo !== 'undefined')
        ErrFoo(error);

    } finally {
      
      if(typeof FinallyFoo !== 'undefined')
        FinallyFoo(args);
        
    }

    return responseReq;
  } 

  private async ConnectionTrier(
    typeofRequest: string,
    apiURL: string,
    jsonData: any,
    numberOfTries: number,
    tryInterval_ms: number
  ) {
    let currentTry = 1;
    let response = null;
    let messages = []
    
    while (currentTry <= numberOfTries) {

      try {

        if (currentTry > 1) {
          await new Promise(resolve => setTimeout(resolve, tryInterval_ms));
        }

        response = await this.Connect(typeofRequest, apiURL, jsonData);

        if (response === null) {
          return throwError ('null response');  
        }

        break; //Si nuestro código se ejecuta hasta el final, quiere decir que nuestro request no tuvo problemas
      } catch(err:any) {
        
        //console.log(err);
        if( (err.error.status == 'fail' || err.status ) && currentTry == numberOfTries){
          this.alertService.clear();
          if( ( err.error !== undefined || err.error !== null ) && ( err.error.message !== undefined ) ){
            let campos:any;
            if( err.error.Campos !== undefined && err.error.Campos.length > 0 ){
              // campos = err.error.Campos.join(", ");
              this.alertService.error('Verifica nuevamente los campos. '+ err.error.message);
            }else{
              this.alertService.error(err.error.message);
            }
          }else{
            this.alertService.error('¡Algo ha salido mal! Verificalo nuevamente');
          }
        }
      } finally {

        currentTry = currentTry + 1;
        if(currentTry>numberOfTries){
          return throwError ("Number of max attemps reached");
        }
        
      }
    }
    // console.log(response);
    return response;
  }

  private async Connect(typeofRequest: string, apiURL: string, jsonData: any) {
    let response = null;
    switch (typeofRequest) {
      case 'POST': {
        response = await this.httpConnectionService.POST(apiURL, jsonData);
        break;
      }
      case 'GET': {
        response = await this.httpConnectionService.GET(apiURL);
        break;
      }
      default: {
        response = await this.httpConnectionService.GET(apiURL);
        break;
      }
    }
    // console.log(response);
    return response;
  }

}
