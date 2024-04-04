import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { AddUpdateCompanyComponent } from './components/add-update-company/add-update-company.component';
import { CompanyComponent } from './components/company/company.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user-create', component: AddUpdateUserComponent },
  { path: 'user-update/:id', component: AddUpdateUserComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'company-create', component: AddUpdateCompanyComponent },
  { path: 'company-update/:id', component: AddUpdateCompanyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
