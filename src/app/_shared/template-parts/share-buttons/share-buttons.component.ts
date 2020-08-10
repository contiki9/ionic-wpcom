import { Component, OnInit,Input } from '@angular/core';
import{ToastController} from '@ionic/angular';
import { IAuthor, ICategory, IPost, IStragePost, ITag } from '../../../../interfaces/wordpress';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss'],
})
export class ShareButtonsComponent implements OnInit {
  @Input() pastData:Promise<IPost>;
  public shareURL: {
    twitter: string;
  };
  constructor(
    public toastCtrl: ToastController,
  ) { }

  public ngOnInit() {
    this.pastData.then((data)=>{
      this.shareURL = this.createShareURL(location.href, data);
    })
  }

  public async addClipboard(): Promise<void> {
    const body = document.body;
    const textArea = document.createElement('textarea');
    textArea.value = location.href;
    body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    body.removeChild(textArea);

    const toast = await this.toastCtrl.create({
      message: 'URLをクリップボードにコピーしました',
      duration: 2500,
    });
    await toast.present();
  }

  private createShareURL(url, params: IPost) {
    if (params.origin.excerpt && params.origin.excerpt.length > 0) {
      params.origin.excerpt = params.origin.excerpt.replace(/\s|&nbsp;/g, '');
    }

    return {
      twitter:
        'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(url) +
        '&text=' +
        encodeURIComponent(params.origin.title),
    };
  }

}

