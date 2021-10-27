import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormFetcherService } from 'src/app/engine/services/form-connection/form-fetcher.service';
import { ConsultarDatosPaginaContext } from '../../context/general/general.context';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html'
})
export class QuienesSomosComponent implements OnInit {

  pageTitle =  'Quiénes somos | Listos S.A. | Listos BPO';

  OwlCarouselPrincipalOptions:any;
  OwlCarouselNuestrosClientesOptions:any;

  SlidesPrincipal:any;
  SlidesClientes:any = null;

  Beneficios:any;
  Atributos:any;

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
      touchDrag: false,
      pullDrag: false,
      dots: true,
      autoWidth:true,
      responsiveClass: true,
      responsiveRefreshRate: 200,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      navSpeed: 800,
      navText: [ '<i class="fas fa-caret-left"></i>', '<i class="fas fa-caret-right"></i>' ],
      items: 1,
      nav: true
    }

    this.OwlCarouselNuestrosClientesOptions = {
      loop: true,
      margin: 0,
      stagePadding: 0,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      autoWidth:true,
      responsiveClass: true,
      responsiveRefreshRate: 200,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      navSpeed: 800,
      navText: [ '<i class="fas fa-caret-left"></i>', '<i class="fas fa-caret-right"></i>' ],
      items: 1,
      nav: true
    }

    this.Beneficios = [
      {
        title: 'Cobertura Latam',
        icon: '/assets/images/iconos/quienes-somos/QS-1-cobertura.svg'
      },
      {
        title: '8000 mil colaboradores',
        icon: '/assets/images/iconos/quienes-somos/QS-2-colaboradores.svg'
      },
      {
        title: 'Red presencial de 19 oficinas',
        icon: '/assets/images/iconos/quienes-somos/QS-3-oficinas.svg'
      },
    ]

    this.Atributos = [
      {
        texto: 'Tarifas acordes a las necesidades del servicio, logrando la continuidad del megocio para todo el ecosistema.',
        icon: '/assets/images/iconos/atributos/atributo-1-tarifas.svg'
      },
      {
        texto: 'Marca empladora como estrategia engagement.',
        icon: '/assets/images/iconos/atributos/atributo-2-marca.svg'
      },
      {
        texto: 'Una estructura de servicio especializada y flexible de acuerdo con la demanda.',
        icon: '/assets/images/iconos/atributos/atributo-3-estructura.svg'
      },
      {
        texto: 'Analítica de datos para la ateacción del mejor talento.',
        icon: '/assets/images/iconos/atributos/atributo-4-analitica.svg'
      },
      {
        texto: 'Experiencia, conocimiento jurídico y de las tendencias del mercado laboral.',
        icon: '/assets/images/iconos/atributos/atributo-5-juridico.svg'
      },
      {
        texto: 'Experiencias únicas con trabajo colaborativo y ágil.',
        icon: '/assets/images/iconos/atributos/atributo-6-colaborativo.svg'
      },
      {
        texto: 'Procesos apalancados en la tecnología.',
        icon: '/assets/images/iconos/atributos/atributo-7-tecnologia.svg'
      },
    ]

    this.SlidesClientes = [
      {
        DESCRIPCION: 'Me encanto trabajar con esta entida por su compromiso por la sociedad colombiana, siempre en la busqueda del bien mas alto es si mismo que es el triunfo de la sociedad.',
        IMAGEN: '/assets/images/quienes-somos/img-clientes.png',
        NOMBRE: 'CARLOS ANDRES TORRES',
        CARGO: 'Gerente ANDI',
      },
      {
        DESCRIPCION: 'Me encanto trabajar con esta entida por su compromiso por la sociedad colombiana, siempre en la busqueda del bien mas alto es si mismo que es el triunfo de la sociedad.',
        IMAGEN: '/assets/images/quienes-somos/img-clientes.png',
        NOMBRE: 'CARLOS ANDRES TORRES',
        CARGO: 'Gerente ANDI 2',
      },
    ]

  }

  ngOnInit(): void {
    this.getValuesCategorias();
  }
  
  getValuesCategorias = async () => { 
    let data = { 'EMP_CODIGO' : 1 }
    let responseDataCategoriasRequerimientos = await this.fetchPreviousData.FetchPreviousData(new ConsultarDatosPaginaContext, data ).then( (data:any) =>{
      this.SlidesPrincipal = data.banner;
      // console.log(data);
    });
  }

}
