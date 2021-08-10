import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';

@NgModule({
  declarations: [
    IncreaserComponent,
    DonutComponent
  ],
  exports: [
    IncreaserComponent,
    DonutComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule
  ]
})
export class ComponetsModule { }
