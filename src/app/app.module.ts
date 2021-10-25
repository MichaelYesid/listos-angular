import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccordionModule } from 'primeng/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// MODULES PAGES
import { HeaderComponent } from './components/corporativo/modules/header/header.component';
import { FooterComponent } from './components/corporativo/modules/footer/footer.component';
import { OwlCarouselComponent } from './components/corporativo/modules/owl-carousel/owl-carousel.component';
import { LoadingSpinnerComponent } from './engine/modules/loading/loading-spinner/loading-spinner.component';

//FORMS INPUTS COMPONENTS
import { TextComponent } from './engine/components/forms/structure-input/text.component';
import { PasswordComponent } from './engine/components/forms/structure-input/password.component';
import { SelectComponent } from './engine/components/forms/structure-input/select.component';
import { CheckboxComponent } from './engine/components/forms/structure-input/checkbox.component';
import { EmptyComponent } from './engine/components/forms/structure-input/empty.component';
// import { RatingComponent } from './engine/components/forms/structure-input/rating.component'; 
import { HrComponent } from './engine/components/forms/structure-input/hr.component';
import { DateComponent } from './engine/components/forms/structure-input/date.component';
import { TextareaComponent } from './engine/components/forms/structure-input/textarea.component';
import { FileComponent } from './engine/components/forms/structure-input/file.component';
// import { AutocompleteComponent } from './engine/components/forms/structure-input/autocomplete.component';
// import { AutocompleteFreeTextComponent } from './engine/components/forms/structure-input/autocomplete-freetext.component';
// import { BadgeSetComponent } from './engine/components/forms/structure-input/badgeset.component';
// import { BadgeSetChildComponent } from './engine/components/forms/structure-input/badgeset_child.component';
// import { AutocompleteHelperComponent } from './engine/components/forms/structure-input/base/autocomplete-helper.component';
import { SummaryTextComponent } from './engine/components/forms/structure-input/text-summary.component';
import { InputHiddenComponent } from './engine/components/forms/structure-input/input-hidden.component';
// import { MonthDateComponent } from './engine/components/forms/structure-input/month-date.component';
// import { CheckboxMultipleComponent } from "./engine/components/forms/structure-input/checkbox-multiple.components";
// import { SliderRangeComponent } from './engine/components/forms/structure-input/slider-range.component';

// import { BadgeSetNotFreeComponent } from './engine/components/forms/structure-input/badgeset-not-free.component';
// import { InputRepeaterComponent } from './engine/components/forms/structure-input/input-repeater/input-repeater.component';
// import { InputRepeaterLooperComponent } from './engine/components/forms/structure-input/input-repeater/input-repeater-looper.component';
// import { InputRepeaterLooperStructureComponent } from './engine/components/forms/structure-input/input-repeater/input-repeater-looper-structure.component';
import { ValidatorErrorComponent } from './engine/components/forms/structure-input/errors/error.component';
import { HTMLFormsComponent } from './engine/components/forms/structure-input/html.component';

import { FormProcessorComponent } from './engine/components/forms/structure-form/form-processor';
import { StructureFormRowComponent } from './engine/components/forms/structure-form-row/structure-form-row.component';
import { GenericFormComponent } from "./engine/components/forms/structure-form/structure-form.component";
import { FormContactoPrincipalComponent } from './components/corporativo/forms/form-contacto-principal.component';

// PAGES
import { CorporativoComponent } from './components/corporativo/corporativo.component';
import { InicioComponent } from './components/corporativo/views/inicio/inicio.component';
import { QuienesSomosComponent } from './components/corporativo/views/quienes-somos/quienes-somos.component';

// SERVICES
import { FormFetcherService } from './engine/services/form-connection/form-fetcher.service';
import { FormPusherService } from './engine/services/form-connection/form-pusher.service';
import { FormOptionsFetcherService } from './engine/services/form-connection/form-options-fetcher.service';
import { WithLoadingService } from './engine/services/custom-connections/with-loading.service';
import { LoadingModalService } from './engine/services/custom-connections/loading-modal.service';
import { AlertService } from './engine/services/alerts/alerts.service';
import { HttpConnectionService } from './engine/services/http/http-connection.service';
import { HttpRequestService } from './engine/services/http/http-request.service';

//

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    QuienesSomosComponent,
    CorporativoComponent,
    HeaderComponent,
    FooterComponent,
    OwlCarouselComponent,
    LoadingSpinnerComponent,
    //
    TextComponent,
    PasswordComponent,
    SelectComponent,
    CheckboxComponent,
    EmptyComponent,
    // RatingComponent,
    HrComponent,
    DateComponent,
    TextareaComponent,
    FileComponent,
    // AutocompleteComponent,
    // AutocompleteFreeTextComponent,
    // BadgeSetComponent,
    // BadgeSetChildComponent,
    // AutocompleteHelperComponent,
    SummaryTextComponent,
    InputHiddenComponent,
    // MonthDateComponent,
    // CheckboxMultipleComponent,
    // SliderRangeComponent,
    // BadgeSetNotFreeComponent,
    // InputRepeaterComponent,
    // InputRepeaterLooperComponent,
    // InputRepeaterLooperStructureComponent,
    ValidatorErrorComponent,
    HTMLFormsComponent,
    //
    FormProcessorComponent,
    StructureFormRowComponent,
    GenericFormComponent,
    FormContactoPrincipalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    //
    CarouselModule,
    AccordionModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    HttpConnectionService,
    HttpRequestService,
    //
    FormFetcherService,
    FormPusherService,
    FormOptionsFetcherService,
    //
    WithLoadingService,
    LoadingModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
