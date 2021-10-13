import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/corporativo/views/inicio/inicio.component';
import { QuienesSomosComponent } from './components/corporativo/views/quienes-somos/quienes-somos.component';
import { CorporativoComponent } from './components/corporativo/corporativo.component';
import { HeaderComponent } from './components/corporativo/modules/header/header.component';
import { FooterComponent } from './components/corporativo/modules/footer/footer.component';
import { FormFetcherService } from './engine/services/form-connection/form-fetcher.service';
import { HttpConnectionService } from './engine/services/http/http-connection.service';
import { HttpRequestService } from './engine/services/http/http-request.service';
import { FormOptionsFetcherService } from './engine/services/form-connection/form-options-fetcher.service';
import { WithLoadingService } from './engine/services/custom-connections/with-loading.service';
import { LoadingModalService } from './engine/services/custom-connections/loading-modal.service';
import { AlertService } from './engine/services/alerts/alerts.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    QuienesSomosComponent,
    CorporativoComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    AlertService,
    HttpConnectionService,
    HttpRequestService,
    FormFetcherService,
    FormOptionsFetcherService,
    WithLoadingService,
    LoadingModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
