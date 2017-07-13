import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tag } from './tag';
import { PostsComponentModule } from '../template-parts/posts/posts.module';

@NgModule({
  declarations: [
    Tag,
  ],
  imports: [
    IonicPageModule.forChild(Tag),
    PostsComponentModule
  ],
  exports: [
    Tag
  ]
})
export class TagModule {}
