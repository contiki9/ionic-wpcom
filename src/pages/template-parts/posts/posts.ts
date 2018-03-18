import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject, Observable, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { wordpressURL } from '../../../wp-config';

import { Post, PostParams, StragePost } from '../../../interfaces/wordpress'
import { WordpressProvider } from '../../../providers/wordpress/wordpress';


@Component({
    selector: 'posts',
    templateUrl: 'posts.html',
    providers:[ WordpressProvider ]
})
export class PostsComponent implements OnChanges {

    @Input() search: PostParams;
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        console.log('ngOnChanges');
        this.Loaded = false;
        if(this.search.type != 'wait'){
            this.subject.next();
        }
    }

    constructor(
        public nav:NavController,
        public wp: WordpressProvider,
        public storage: Storage,
    ) {
        this.initializeSubject();
    }

    page:number = 1;
    posts: Array<Post> = [];
    subject;
    Loaded: boolean;
    timerSubscription : Subscription;

    ngOnInit(){
        // 定期実行
        this.timerSubscription = Observable
            .timer(0,1000)
            .subscribe(
                ()=>{
                    this.storage.get('hidden').then((data)=>{
                        if(data){
                            const hiddens:Array<StragePost> = JSON.parse(data);
                            console.log(hiddens);
                            this.posts = this.posts.filter((v)=>{
                                let flg:boolean = true;
                                Array.prototype.forEach.call(hiddens, (node)=> {
                                    if(node.domain == wordpressURL && v.ID == node.article.ID){
                                        flg = false;
                                    }
                                });
                                return flg;
                            });
                        }
                    });
                });
    }

    ngOnDestroy(){
        if(this.subject){
            this.subject.unsubscribe();
        }
        if(this.timerSubscription){
            this.timerSubscription.unsubscribe();
        }
    }

    doInfinite(infiniteScroll) {
        this.getPostList().then(
            (data:Array<Post>) => {
                this.page++;
                this.posts = this.posts.concat(data);
                if(data.length > 0) {
                    infiniteScroll.complete();
                }else{
                    infiniteScroll.enable(false);
                }
            },
            error => {
                infiniteScroll.complete();
            }
        );
    }

    viewSingle(post): void {
        this.nav.push('Single',
            { postID: post.ID ,title: post.title});
    }

    private initializeSubject(){
        this.subject = new Subject();
        this.subject
            .switchMap(obj => {
                return this.getPostList()
            })
            .subscribe(
                (data:Array<Post>) => {
                    this.page = 2;
                    this.posts = data;
                }
            )
    }

    private getPostList() {
        return new Promise ((resolve, reject) => {
            this.wp.getPostList(this.page, this.search)
                .subscribe(
                    data => {
                        this.Loaded = true;
                        resolve(data)
                    },
                    error => {
                        this.Loaded = true;
                        reject(error);
                    }
                );
        });
    }
}
