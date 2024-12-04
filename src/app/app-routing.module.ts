import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OnlineTestComponent } from './online-test/online-test.component';

const routes: Routes = [
  {path: "", redirectTo: "/online-test", pathMatch: "full"},
  {path: 'online-test', component: OnlineTestComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
