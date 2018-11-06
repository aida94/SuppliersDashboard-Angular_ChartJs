import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalSuppliersComponent } from './components/total-suppliers/total-suppliers.component';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TotalSuppliersComponent },
  { path: 'details/:name', component: SupplierDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
