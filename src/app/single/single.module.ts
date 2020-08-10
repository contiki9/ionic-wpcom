import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePageRoutingModule } from './single-routing.module';

import { SinglePage } from './single.page';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    SinglePageRoutingModule,
  ],
  declarations: [SinglePage],
})
export class SinglePageModule {}