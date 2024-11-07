import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Error404Page } from './paginas/error404/error404.page';
import { AuthGuard } from './guards/auth.guard';




const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'animaciones',
    loadChildren: () => import('./paginas/animaciones/animaciones.module').then( m => m.AnimacionesPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./paginas/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'resetear-pass',
    loadChildren: () => import('./paginas/resetear-pass/resetear-pass.module').then( m => m.ResetearPassPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./paginas/cuenta/cuenta.module').then( m => m.CuentaPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'error404',
    loadChildren: () => import('./paginas/error404/error404.module').then( m => m.Error404PageModule)
  },
  // no encuentra pagina
  { path: 'not-found', component: Error404Page },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
