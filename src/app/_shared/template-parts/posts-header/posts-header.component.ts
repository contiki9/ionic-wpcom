import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-posts-header',
  templateUrl: './posts-header.component.html',
  styleUrls: ['./posts-header.component.scss'],
})
export class PostsHeaderComponent implements OnInit {
  @Input() type:string;
  @Input() title:string;
  constructor() {}

  ngOnInit() {}

}
