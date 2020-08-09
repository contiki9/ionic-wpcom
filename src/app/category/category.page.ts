import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { IPostParams } from '../../interfaces/wordpress';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  type = 'カテゴリ';
  title: string;
  search: IPostParams = {
    type: 'wait',
    categorySlug: this.navParams.get('key'),
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public wp: WordpressProvider
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    console.log('カテゴリの読み込み');
    this.title = this.navParams.get('title');
    const f = () =>
      new Promise((resolve) => {
        resolve(this.navParams.get('key'));
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
