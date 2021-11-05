import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styles: [
  ]
})
export class DetalleNoticiasComponent implements OnInit {

  @Input() categoriaNoticia:any = 'Categoría'
  @Input() tituloNoticia:any = 'Este es el título de la noticia'

  constructor() { }

  ngOnInit(): void {
  }

}
