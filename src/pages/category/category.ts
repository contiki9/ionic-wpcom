import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePostParams, InterfaceCategory } from '../../interface/wordpress';
import { Storage } from '@ionic/storage';

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
    search: InterfacePostParams = {
        type : 'wait',
        categorySlug : this.navParams.get('key')
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public wp: WordpressProvider,
        public storage: Storage,
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

                this.storage.get('domain').then((val) => {
                    this.wp.getCategory(val, slug)
                        .subscribe(
                            (data: InterfaceCategory) => this.title = data.name
                        );
                });

                this.search = {
                    type: 'post',
                    categorySlug : slug
                }
            }
        );
    }
}
