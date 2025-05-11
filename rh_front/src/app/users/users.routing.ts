import { Routes, RouterModule } from "@angular/router";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { InfoUserComponent } from "./info-user/info-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UsersComponent } from "./users/users.component";

let routes: Routes = [
  {
    path: 'add',
    component: AddUserComponent,
  },
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListUserComponent,

      },
      { path: ':id', component: InfoUserComponent },
      { path: ':id/update', component: EditUserComponent }
    ]
  },


];

export let USERS_ROUTING = RouterModule.forChild(routes);
