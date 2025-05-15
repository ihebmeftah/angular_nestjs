import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { needAuth, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "evaluation",
    canActivate: [needAuth],
    children: [
      {
        path: '',
        loadComponent: () => import('./evaluation/show-evaluation/show-evaluation.component').then(m => m.ShowEvaluationComponent)
      },
    ]
  },
  {
    path: 'timetables',
    canActivate: [needAuth],
    children: [
      {
        path: '',
        loadComponent: () => import('./timetables/show-timetable/show-timetable.component').then(m => m.ShowTimetableComponent)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./timetables/calendar-timetable/calendar-timetable.component').then(m => m.CalendarTimetableComponent)
      },
    ]
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      },
    ]
  },
  {
    path: 'home',
    canActivate: [needAuth],
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {

    path: '',
    canActivate: [needAuth],
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'conges',
    canActivate: [needAuth],
    children: [
      {
        path: '',
        loadComponent: () => import('./conges/list-conge/list-conge.component').then(m => m.ListCongeComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./conges/add-conge/add-conge.component').then(m => m.AddCongeComponent)
      }
    ]
  },
  {
    path: 'notifications',
    canActivate: [needAuth],
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'users',
    canActivate: [needAuth],
    children: [
      {
        path: '',
        loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./users/user-add/user-add.component').then(m => m.UserAddComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./users/user-info/user-info.component').then(m => m.UserInfoComponent)
      },
      {
        path: ':id/update',
        loadComponent: () => import('./users/user-edit/user-edit.component').then(m => m.UserEditComponent)
      }
    ]
  },
  {
    path: 'not-found',
    canActivate: [needAuth],
    component: NotfoundComponent
  }, // Wild route
  { path: '**', redirectTo: 'not-found' }, // Wild route
];

