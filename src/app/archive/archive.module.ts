import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivePageRoutingModule } from './archive-routing.module';

import { ArchivePage } from './archive.page';

import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ArchivePageRoutingModule,
  ],
  declarations: [ArchivePage],
})
export class ArchivePageModule {}
