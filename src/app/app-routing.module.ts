import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporativoComponent } from './components/corporativo/corporativo.component';
import { InicioComponent } from './components/corporativo/views/inicio/inicio.component';
import { QuienesSomosComponent } from './components/corporativo/views/quienes-somos/quienes-somos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'web'},
  { 
    path: 'web',
    component: CorporativoComponent,
    children:[
      { path: '', redirectTo: 'inicio', pathMatch: 'full'},
      { path: 'inicio', pathMatch: 'full', component: InicioComponent},
      { path: 'quienes-somos', pathMatch:'full', component: QuienesSomosComponent }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
