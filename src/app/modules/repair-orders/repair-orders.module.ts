import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () => import('./repair-orders-wrapper.component').then(c => c.RepairOrdersWrapperComponent)
      }
    ])
  ]
})
export class RepairOrdersModule { } 