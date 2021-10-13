import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ConsultarRequerimientosClienteFetchContext } from '../../context/cards/card-fetch.context';
import { FormFetcherService } from "./../../../../engine/services/form-connection/form-fetcher.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  pageTitle =  'Inicio | Listos S.A. | Listos BPO'

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private fetchPreviousData: FormFetcherService
  ) { }
  
  ngOnInit(): void {

    this.titleService.setTitle(this.pageTitle);

    this.metaTagService.addTags([
      { name: 'keywords', content: 'Portal oficial de Listos BPO' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Listos SA.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);

    this.getValuesCategorias();
  }
  
  getValuesCategorias = async () => {
    let responseDataCategoriasRequerimientos = await this.fetchPreviousData.FetchPreviousData(new ConsultarRequerimientosClienteFetchContext, true).then( (data:any) =>{
      console.log(data);
    });
  }

}
