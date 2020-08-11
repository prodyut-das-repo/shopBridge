import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';

const routes: Routes = [
  { path:  '**', redirectTo:  'InventoryHomeComponent'},
  { path:  'details/:id', component:  InventoryDetailsComponent},
  { path:  '', component:  InventoryHomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
