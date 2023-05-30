import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddEditResourceComponent } from './add-edit-resource/add-edit-resource.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard, AuthReverseGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthReverseGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthReverseGuard] },
  { path: 'add', component: AddEditResourceComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddEditResourceComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ResourceDetailComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
