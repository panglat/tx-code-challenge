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
    isCommentBeingUpdated = false;
    commentText: String = '';
    setFocusOnInput = false;
    updateCommentSubscription: Subscription;

    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.commentText = this.comment.content;
    }

    ngAfterViewChecked() {
        if (this.setFocusOnInput) {
            if (this.commentInput && this.commentInput.nativeElement) {
                this.commentInput.nativeElement.focus();
                this.setFocusOnInput = false;
            }
        }
    }

    updateCommentClick() {
        if (!this.commentText) {
            this.commentText = this.comment.content;
            this.setFocusOnInput = true;
        }
        this.isCommentBeingUpdated = !this.isCommentBeingUpdated;
    }

    updateComment() {
        if (this.isCommentBeingUpdated) {
            this.isCommentBeingUpdated = false;
            if(this.commentText.length > 0 && this.comment.content !== this.commentText) {
                this.comment.content = this.commentText;

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
