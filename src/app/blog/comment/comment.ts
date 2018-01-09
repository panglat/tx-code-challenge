/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, Input } from '@angular/core';

import template from './comment.html';
import style from './comment.scss';
import { Comment } from '../../models';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'comment',
  template,
  styles: [ style ]
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    
    constructor() { }
  
    ngOnInit() {
    }
}
