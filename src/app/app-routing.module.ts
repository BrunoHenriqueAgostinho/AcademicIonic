import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'entrar',
    loadChildren: () => import('./entrar/entrar.module').then( m => m.EntrarPageModule)
  },
  {
    path: 'homepage-system',
    loadChildren: () => import('./homepage-system/homepage-system.module').then( m => m.HomepageSystemPageModule)
  },
  {
    path: 'meustrabalhos-system',
    loadChildren: () => import('./meustrabalhos-system/meustrabalhos-system.module').then( m => m.MeustrabalhosSystemPageModule)
  },
  {
    path: 'meusmodelos-system',
    loadChildren: () => import('./meustrabalhos-system/meustrabalhos-system.module').then( m => m.MeustrabalhosSystemPageModule)
  },
  {
    path: 'modelos',
    loadChildren: () => import('./modelos/modelos.module').then( m => m.ModelosPageModule)
  },
  {
    path: 'edicaotrabalho-system',
    loadChildren: () => import('./edicaotrabalho-system/edicaotrabalho-system.module').then( m => m.EdicaotrabalhoSystemPageModule)
  },
  {
    path: 'edicaotrabalho-system/:codigoTrabalho',
    loadChildren: () => import('./edicaotrabalho-system/edicaotrabalho-system.module').then( m => m.EdicaotrabalhoSystemPageModule)
  },
  {
    path: 'edicaomodelo-system',
    loadChildren: () => import('./edicaotrabalho-system/edicaotrabalho-system.module').then( m => m.EdicaotrabalhoSystemPageModule)
  },
  {
    path: 'edicaomodelo-system/:codigoModelo',
    loadChildren: () => import('./edicaotrabalho-system/edicaotrabalho-system.module').then( m => m.EdicaotrabalhoSystemPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'participantes-trabalho',
    loadChildren: () => import('./modals/participantes-trabalho/participantes-trabalho.module').then( m => m.ParticipantesTrabalhoPageModule)
  },
  {
    path: 'visualizartrabalho',
    loadChildren: () => import('./visualizartrabalho/visualizartrabalho.module').then( m => m.VisualizartrabalhoPageModule)
  },
  {
    path: 'visualizartrabalho/:codigoTrabalho',
    loadChildren: () => import('./visualizartrabalho/visualizartrabalho.module').then( m => m.VisualizartrabalhoPageModule)
  },  {
    path: 'propriedadestrabalho',
    loadChildren: () => import('./modals/propriedadestrabalho/propriedadestrabalho.module').then( m => m.PropriedadestrabalhoPageModule)
  },
  {
    path: 'propriedadesmodelo',
    loadChildren: () => import('./modals/propriedadesmodelo/propriedadesmodelo.module').then( m => m.PropriedadesmodeloPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
