/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import template from './comment.html';
import style from './comment.scss';
import { Comment } from '../../models';
import 'rxjs/add/observable/forkJoin';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'comment',
    template,
    styles: [style]
})

export class CommentComponent implements OnInit, AfterViewChecked {
    @Input() comment: Comment;
    @ViewChild('commentInput') commentInput: ElementRef;
    isCommentInEdition = false;
    commentInEdition: String = '';
    setFocusOnInput = false;
    updateCommentSubscription: Subscription;

    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.commentInEdition = this.comment.content;
    }

    ngAfterViewChecked() {
        if (this.setFocusOnInput) {
            if (this.commentInput && this.commentInput.nativeElement) {
                this.commentInput.nativeElement.focus();
                this.setFocusOnInput = false;
            }
        }
    }

    commentClick() {
        if (!this.commentInEdition) {
            this.commentInEdition = this.comment.content;
            this.setFocusOnInput = true;
        }
        this.isCommentInEdition = !this.isCommentInEdition;
    }

    updateComment() {
        if (this.isCommentInEdition) {
            this.isCommentInEdition = false;
            if(this.commentInEdition.length > 0 && this.comment.content !== this.commentInEdition) {
                this.comment.content = this.commentInEdition;

                const tmpComment: Comment = Object.assign(<Comment>{}, this.comment);
                tmpComment.content = this.comment.content;
                tmpComment.children = null;
                tmpComment.parent = null;
                this.updateCommentSubscription = this.blogService.updateComment(tmpComment)
                    .subscribe();
            }
        }
    }
}
