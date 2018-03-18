import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { PostParams, Category } from '../../interfaces/wordpress';

@IonicPage({
    segment: 'category/:key',
})
@Component({
    selector: 'category',
    templateUrl: 'category.html',
    providers:[ WordpressProvider ]
})
export class Category {

    type:string = 'カテゴリ';
    title:string;
    search: PostParams = {
        type : 'wait',
        categorySlug : this.navParams.get('key')
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp: WordpressProvider
    ) {}

    ionViewDidLoad(){
        this.title = this.navParams.get('title');
        const f = () => new Promise(
            (resolve)=>{
                resolve(this.navParams.get('key'));
            }
        );
        f().then(
            (slug:string) => {
                this.wp.getCategory(slug)
                    .subscribe(
                        (data:Category) => this.title = data.name
                    );

                this.search = {
                    type: 'post',
                    categorySlug : slug
                }
            }
        );
    }
}
