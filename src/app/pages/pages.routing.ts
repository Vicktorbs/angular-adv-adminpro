import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenances/users/users.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
          { path: 'grafica1', component: Grafica1Component, data: { title: 'Graphic #1' } },
          { path: 'promises', component: PromisesComponent, data: { title: 'Promise' } },
          { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
          { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },

        //   Maintenances
          { path: 'users', component: UsersComponent, data: { title: 'Aplication users' } },
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
