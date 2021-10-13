import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map,filter, tap, finalize, switchMap, concatMap} from 'rxjs/operators';
import { FormOptionsFetcherService } from 'src/app/engine/services/form-connection/form-options-fetcher.service';
import { KeyValuePair, ListContext } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { FormOptionsSelfmadeFetcherService } from 'src/app/engine/services/form-connection/form-options-selfmade-fetcher.service';
import { BaseSelfMadeList } from 'src/app/engine/context/classes/form-options-bylist-selfmade.classes';
import { CiudadfetcherService } from 'src/app/engine/components/services/misc/ciudadfetcher.service';
import { AutocompleteBaseComponent } from './base/autocomplete-base.component';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { AutocompleteFreeTextComponent } from './autocomplete-freetext.component';
import { BadgeSetComponent } from './badgeset.component';


@Component({
  selector: 'app-badgeset-not-free',
  templateUrl: './base/badgeset.component.html',
})
export class BadgeSetNotFreeComponent extends BadgeSetComponent {

  tieneAnadir = false;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  
}