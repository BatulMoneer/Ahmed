import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './portfolio/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  { //must be at last, for an unexsisting page
    path: '**',
    redirectTo: '/auth/notFound' // or design a page for it 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollOffset: [0, 70],
    scrollPositionRestoration: 'enabled',
  }),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
