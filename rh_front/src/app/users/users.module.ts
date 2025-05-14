import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { USERS_ROUTING } from './users.routing';
import { UsersComponent } from './users/users.component';
import { LoadingComponent } from "../common/loading/loading.component";



@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    InfoUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    USERS_ROUTING,
    LoadingComponent,
  ]
})
export class UsersModule { }
