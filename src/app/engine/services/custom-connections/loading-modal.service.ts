import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertService } from '../alerts/alerts.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingModalService {


  private subject = new Subject<any>();
  private subjectPage = new Subject<any>();

  constructor() {}

  // enable subscribing to alerts observable
  onModal(value:any): Observable<any> {
    // console.log('ACTIVAMOS ONMODAL:', value);
    return this.subject.asObservable().pipe(filter( (value)=>{return value}));
  }

  onNextSection(): Observable<any> {
    return this.subjectPage.asObservable().pipe(filter( (value)=>{return value}));
  }

  public show(event:boolean): void {
    // console.log('ACTIVAMOS SHOW SERVICE', event);
    this.subject.next(event);
  }

  public hide(event?:any): void {
    // console.log("CERRAMOS MODAL", event)
    this.subject.next(event);
  }

  public showNextPage(section?:any): void {
    this.subjectPage.next(section);
  }
  
}

@Component({
  selector: 'app-spinner-overlay',
  template: `
  <!--<p-dialog header="Información" 
  [closable]="true"
    [(visible)]="displayModal && hasContent" 
    [modal]="true"
    [closable]="true"
    [style]="{width: '50vw'}" 
    [baseZIndex]="10000"
    [draggable]="false" [resizable]="false"
    (onHide)="hideModal($event)">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-lg-10 mx-auto">
          <app-alert (onEmitContentStatus)="GetAlertContentStatus($event)"></app-alert>
        </div>
        
      </div>
    </div>
    <ng-template pTemplate="footer">
      <a [routerLink]="displayNextPage" class="btn btn-cancelForm d-inline-flex" (click)="closeModal()" *ngIf="displayNextPage">Siguiente sección</a>  
    </ng-template>
  </p-dialog>-->`,
})
//<button (click)="closeModal()" class="btn-success">
//<i class="las la-times mr-1 text-lg"></i>
//Cerrar
//</button>
export class SpinnerOverlayComponent implements OnInit, OnDestroy{
  
  displayModal: boolean = false;
  displayNextPage: any = false;
  hasContent:boolean=false;
  modalSubscription: Subscription = new Subscription;
  routeSubscription: Subscription = new Subscription;
  nextPageSubscription: Subscription = new Subscription;

  constructor(
    private loadingModalService:LoadingModalService,
    private router: Router,
    private alertService: AlertService
  ) {}
  
  ngOnInit():void{
    this.modalSubscription = this.loadingModalService.onModal(true)
    .subscribe(status => {
      // console.log('MOSTRAMOS COMPONENTE CON SUSCRIPCIÓN: ',status);
      this.displayModal=status;
    });

    //
    this.nextPageSubscription = this.loadingModalService.onNextSection()
    .subscribe(status => {
      console.log(status);
      this.displayNextPage = '/cv/'+ status;
    });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.loadingModalService.hide(false);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.displayNextPage=false;
    this.modalSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.hasContent=false;
  }

  hideModal(event:any){
    this.closeModal();
  }

  closeModal(){
    this.displayModal=false
    this.alertService.clear();
    this.displayNextPage=false;
    this.hasContent=false;
  }

  GetAlertContentStatus = ($event:boolean) => {
    if($event===false){
      this.hasContent=false;
    }else{
      this.hasContent=true;
    }
  }

}