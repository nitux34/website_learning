import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './blog/list/list.component';
import { PreviewComponent } from './blog/preview/preview.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'preview/:id', component: PreviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
