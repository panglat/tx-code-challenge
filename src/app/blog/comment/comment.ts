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
    @ViewChild('updateCommentInput') updateCommentInput: ElementRef;
    @ViewChild('replyCommentInput') replyCommentInput: ElementRef;
    isCommentBeingUpdated = false;
    isCommentBeingReplied = false;
    commentText: String = '';
    setFocusOnUpdateCommentInput = false;
    setFocusOnReplyCommentInput = false;
    updateCommentSubscription: Subscription;
    // replyCommentSubscription: Subscription;

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

        if (this.setFocusOnReplyCommentInput) {
            if (this.replyCommentInput && this.replyCommentInput.nativeElement) {
                this.replyCommentInput.nativeElement.focus();
                this.setFocusOnReplyCommentInput = false;
            }
        }
    }

    updateCommentClick() {
        this.isCommentBeingUpdated = !this.isCommentBeingUpdated;
        if (this.isCommentBeingUpdated) {
            this.commentText = this.comment.content;
            this.setFocusOnUpdateCommentInput = true;
        }
        this.isCommentBeingReplied = false;
        this.setFocusOnReplyCommentInput = false;
    }

    replyCommentClick() { 
        this.isCommentBeingReplied = !this.isCommentBeingReplied;
        if (this.isCommentBeingReplied) {
            this.commentText = '';
            this.setFocusOnReplyCommentInput = true;
        }
        this.isCommentBeingUpdated = false;
        this.setFocusOnUpdateCommentInput = false; 
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

    replyComment() {
        if (this.isCommentBeingReplied) {
            this.isCommentBeingReplied = false;
            if(this.commentText.length > 0) {
                const tmpComment: Comment = <Comment>{};
                tmpComment.content = this.commentText;
                tmpComment.date = new Date().toJSON().slice(0, 10);
                tmpComment.parent_id = this.comment.id;
                tmpComment.postId = this.comment.postId;
                tmpComment.user = 'Test user reply';
                this.updateCommentSubscription = this.blogService.addNewComment(tmpComment)
                    .subscribe((comment: Comment) => {
                        comment.parent = this.comment;
                        if(!this.comment.children) {
                            this.comment.children = new Array<Comment>();
                        }
                        this.comment.children.push(comment);
                    });
            }
        }
    }
    
}
