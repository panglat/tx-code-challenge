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
    @ViewChild('#updateCommentInput') updateCommentInput: ElementRef;
    isCommentBeingUpdated = false;
    commentText: String = '';
    setFocusOnUpdateCommentInput = false;
    updateCommentSubscription: Subscription;

    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.commentText = this.comment.content;
    }

    ngAfterViewChecked() {
        if (this.setFocusOnUpdateCommentInput) {
            if (this.updateCommentInput && this.updateCommentInput.nativeElement) {
                this.updateCommentInput.nativeElement.focus();
                this.setFocusOnUpdateCommentInput = false;
            }
        }
    }

    updateCommentClick() {
        this.isCommentBeingUpdated = !this.isCommentBeingUpdated;
        if (this.isCommentBeingUpdated) {
            this.commentText = this.comment.content;
            this.setFocusOnUpdateCommentInput = true;
        }
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
