import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenances/users/users.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { MedicsComponent } from './maintenances/medics/medics.component';
import { MedicComponent } from './maintenances/medics/medic.component';
import { SearchAllComponent } from './search-all/search-all.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Graphic #1' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promise' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'search/:termin', component: SearchAllComponent, data: { title: 'Search...' } },

  //   Maintenances
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance' } },
  { path: 'medics', component: MedicsComponent, data: { title: 'Medics maintenance' } },
  { path: 'medic/:id', component: MedicComponent, data: { title: 'Medics maintenance' } },

  // Admin routes
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users maintenance' } }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
