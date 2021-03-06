import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ConsultarDatosPaginaContext } from '../../context/general/general.context';
import { FormFetcherService } from "./../../../../engine/services/form-connection/form-fetcher.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  pageTitle =  'Inicio | Listos S.A. | Listos BPO';
  
  slide:any;

  OwlCarouselPrincipalOptions:any;
  OwlCarouselServiciosOptions:any;
  OwlCarouselNoticiasOptions:any;
  OwlCarouselAliadosOptions:any;
  OwlCarouselClustersOptions:any;

  SlidesPrincipal:any
  SlidesServicios:any
  SlidesNoticias:any
  SlidesAliados:any

  Clusters:any;
  PreguntasFrecuentes:any;
  MotivosContacto:any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private fetchPreviousData: FormFetcherService
  ) {

    this.OwlCarouselPrincipalOptions = {
      loop: true,
      margin: 0,
      stagePadding: 0,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      autoWidth:true,
      responsiveClass: true,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      navSpeed: 800,
      navText: [ '<i class="fas fa-caret-left"></i>', '<i class="fas fa-caret-right"></i>' ],
      items: 1,
      nav: true
    }

    this.OwlCarouselServiciosOptions = {
      loop: true,
      margin: 50,
      stagePadding: 0,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoWidth:true,
      autoHeight: true,
      smartSpeed: 800,
      navSpeed: 800,
      navText: [ '<i class="fas fa-caret-left"></i>', '<i class="fas fa-caret-right"></i>' ],
      responsive: {
        0: {
          items: 1,
        },
        414: {
          items: 2
        },
        1024: {
          items: 4
        }
      },
      nav: true,
    }

    this.OwlCarouselClustersOptions = {
      loop: true,
      margin: 20,
      stagePadding: 0,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoWidth:true,
      responsiveClass: true,
      responsiveRefreshRate: 1,
      autoHeight: true,
      smartSpeed: 800,
      navSpeed: 800,
      navText: [ '', '' ],
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 3
        }
      }
    }

    this.OwlCarouselNoticiasOptions = {
      loop: true,
      margin: 30,
      stagePadding: 0,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoWidth:true,
      responsiveClass: true,
      responsiveRefreshRate: 1,
      autoHeight: true,
      smartSpeed: 800,
      navSpeed: 800,
      nav: false,
      navText: [ '', '' ],
      responsive: {
        0: {
          items: 1,
          dots: true
        },
        500: {
          items: 2,
          dots: true
        },
        1024: {
          items: 3,
        }
      }
    }

    this.OwlCarouselAliadosOptions = {
      loop: true,
      margin: 20,
      stagePadding: 0,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoWidth:true,
      responsiveClass: true,
      responsiveRefreshRate: 1,
      responsiveBaseElement: 'window',
      autoHeight: true,
      smartSpeed: 800,
      navSpeed: 800,
      navText: [ '', '' ],
      responsive: {
        0: {
          items: 2,
          nav: false,
        },
        640: {
          items: 3,
          nav: false,
        },
        1024: {
          items: 6,
          nav: false,
        }
      }
    }

    this.Clusters = [
      {
        title: 'Consumo masivo',
        icon: '/assets/images/iconos/clusters/cluster-1-consumo.svg'
      },
      {
        title: 'Manufactura',
        icon: '/assets/images/iconos/clusters/cluster-2-manufactura.svg'
      },
      {
        title: 'Econom??a digital',
        icon: '/assets/images/iconos/clusters/cluster-3-economia.svg'
      },
      {
        title: 'Tecnolog??a',
        icon: '/assets/images/iconos/clusters/cluster-4-tecnologia.svg'
      },
      {
        title: 'H??bitad urbano',
        icon: '/assets/images/iconos/clusters/cluster-5-habitat.svg'
      },
      {
        title: 'Belleza y cuidado personal',
        icon: '/assets/images/iconos/clusters/cluster-6-belleza.svg'
      },
      {
        title: 'Agricola',
        icon: '/assets/images/iconos/clusters/cluster-7-agricola.svg'
      },
      {
        title: 'Bioenerg??a',
        icon: '/assets/images/iconos/clusters/cluster-8-bioenergia.svg'
      },
      {
        title: 'Miner??a',
        icon: '/assets/images/iconos/clusters/cluster-9-mineria.svg'
      },
      {
        title: 'Turismo',
        icon: '/assets/images/iconos/clusters/cluster-10-turismo.svg'
      },
      {
        title: 'Financiero',
        icon: '/assets/images/iconos/clusters/cluster-11-financiero.svg'
      },
      {
        title: 'Excelencia',
        icon: '/assets/images/iconos/clusters/cluster-12-excelencia.svg'
      },
      {
        title: 'Servicio',
        icon: '/assets/images/iconos/clusters/cluster-13-servicio.svg'
      },
      {
        title: 'Educaci??n',
        icon: '/assets/images/iconos/clusters/cluster-14-educacion.svg'
      },
      {
        title: 'Cl??nica y forma',
        icon: '/assets/images/iconos/clusters/cluster-15-clinica.svg'
      }
    ]

  }
  
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
    let data = { 'EMP_CODIGO' : 1 }
    let responseDataCategoriasRequerimientos = await this.fetchPreviousData.FetchPreviousData(new ConsultarDatosPaginaContext, data ).then( (data:any) =>{
      this.SlidesPrincipal = data.banner;
      this.SlidesServicios = data.servicios;
      this.SlidesNoticias = data.noticias;
      this.SlidesAliados = data.aliados;
      this.PreguntasFrecuentes = data.prefre;
      this.MotivosContacto = data.contactanos;
      // console.log(data);
    });
  }

  
  getResponseForm(event:any){
    console.log(event);
  }


}
