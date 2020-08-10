import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { IPostParams } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {
  public type = 'お気に入り';
  public title: string;
  public catSlug:string;
  public search: IPostParams = {
    type: 'wait',
    categorySlug: this.catSlug,
  };

  constructor(
    public navCtrl: NavController,
    public route:ActivatedRoute,
    public wp: WordpressProvider,
  ) {}

  public ngOnInit() {}
  public ionViewWillEnter() {
    this.catSlug = this.route.snapshot.params.categorySlug;
    this.title = this.catSlug;
    const f = () =>
      new Promise((resolve) => {
        resolve(this.catSlug);
      });
    f().then((slug: string) => {
      this.wp.getCategory(slug).subscribe((data) => (this.title = data.name));
      this.search = {
        type: 'post',
        categorySlug: slug,
      };
    });
  }
}
