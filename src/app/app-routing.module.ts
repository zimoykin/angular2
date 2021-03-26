import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './_components/auth/auth.component';
import { HomeComponent } from './_components/home/home.component';
import { NotimplementedComponent } from './_components/notimplemented//notimplemented.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'team', component: NotimplementedComponent },
  { path: 'appointment', component: NotimplementedComponent },
  { path: 'blog', component: NotimplementedComponent },
  { path: 'contact', component: NotimplementedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
