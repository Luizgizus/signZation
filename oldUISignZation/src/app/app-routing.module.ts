import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { AddUpdateCompanyComponent } from './components/add-update-company/add-update-company.component';
import { CompanyComponent } from './components/company/company.component';
import { AddUpdateDocumentComponent } from './components/add-update-document/add-update-document.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user-create', component: AddUpdateUserComponent },
  { path: 'user-update/:id', component: AddUpdateUserComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'company-create', component: AddUpdateCompanyComponent },
  { path: 'company-update/:id', component: AddUpdateCompanyComponent },
  { path: 'document', component: DocumentComponent },
  { path: 'document-create', component: AddUpdateDocumentComponent },
  { path: 'document-update/:id', component: AddUpdateDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
