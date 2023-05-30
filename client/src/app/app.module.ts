import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddEditResourceComponent } from './add-edit-resource/add-edit-resource.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { TruncatePipe } from './truncate.pipe';
import { HighlightDirective } from './highlight.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard, AuthReverseGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddEditResourceComponent,
    ResourceDetailComponent,
    TruncatePipe,
    HighlightDirective,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [AuthGuard, AuthReverseGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
