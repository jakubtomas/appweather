import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {ItemComponent} from "./item/item.component";

const routes: Routes = [
  {path:'', component : ListComponent},
  {path:'place/:placeId', component : ItemComponent}
  /*{path: '**', component: PageNotFoundComponent}*/


  //add todo component not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
