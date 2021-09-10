import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./layout/main/main.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {FormComponent} from "./components/form/form.component";
import {ContentComponent} from "./components/content/content.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', component: FormComponent},
      {path: '', component: ContentComponent},
      {path: '404', component: NotFoundComponent}
    ]
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/404', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
