import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { materialize } from 'rxjs';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {path:'material',component:MaterialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
