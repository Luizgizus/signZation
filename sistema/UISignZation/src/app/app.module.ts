import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { UserComponent } from './components/user/user.component';
import { AddUpdateCompanyComponent } from './components/add-update-company/add-update-company.component';
import { CompanyComponent } from './components/company/company.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AddUpdateUserComponent,
    UserComponent,
    AddUpdateCompanyComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
