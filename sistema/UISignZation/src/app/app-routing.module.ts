import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user-create', component: AddUpdateUserComponent },
  { path: 'user-update/:id', component: AddUpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
