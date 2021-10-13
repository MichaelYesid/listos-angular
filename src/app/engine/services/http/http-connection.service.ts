import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

  constructor(private http: HttpClient) { 
  }

  private headerDict = {
    // 'Content-Type': 'application/json', //application/json
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*'
  }
  
  private requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  }
  
  async POST(apiURL:string,jsonData:any) {
    return await this.http.post(apiURL, jsonData, this.requestOptions).toPromise();
  }
  
  async GET(apiURL:string) {
    return await this.http.get(apiURL).toPromise();
  }
  
}
