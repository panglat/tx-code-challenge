/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import template from './post.html';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BlogService, SharedMemoryService } from '../../services';
import { Post, Comment } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'post',
    template,
})
export class PostComponent implements OnInit, OnDestroy, AfterViewChecked {
    post: Post;
    comments: Comment[];
    isAddingNewComment = false;
    newComment = '';
    setFocusOnCommentInput = false;
    @ViewChild('commentInput') commentInput: ElementRef;
    private getPostSubscription: Subscription;
    private routeParamsSubscription: Subscription;
    private addNewCommentSubscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService, private sharedMemoryService: SharedMemoryService) { }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            const postId = params['id'];
            this.getPostInformation(postId);
        });

    }

    ngOnDestroy(): void {
        if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
        if (this.getPostSubscription) { this.getPostSubscription.unsubscribe(); }
        if (this.addNewCommentSubscription) { this.addNewCommentSubscription.unsubscribe(); }
    }

    ngAfterViewChecked(): void {
        if (this.setFocusOnCommentInput) {
            if (this.commentInput && this.commentInput.nativeElement) {
                this.commentInput.nativeElement.focus();
                this.setFocusOnCommentInput = false;
            }
        }
    }

    getPostInformation(postId: number) {
        this.getPostSubscription =
            Observable.forkJoin(
                this.blogService.getPost(postId),
                this.blogService.getComments(postId))
                .subscribe(([post, comments]) => {
                    this.post = post;
                    this.comments = comments;
                }, error => {
                    console.log(error);
                })
    }

    addNewComment() {
        if (this.sharedMemoryService.isUserNameValid()) {
            this.isAddingNewComment = !this.isAddingNewComment;
            if (this.isAddingNewComment) {
                this.newComment = '';
                this.setFocusOnCommentInput = true;
            }
        } else {
            this.goToLogin();
        }
    }

    saveComment() {
        if (this.sharedMemoryService.isUserNameValid()) {
            if (this.isAddingNewComment) {
                this.isAddingNewComment = false;
                if (this.newComment.length > 0) {
                    const newComment = <Comment>{}
                    newComment.content = this.newComment;
                    newComment.date = new Date().toJSON().slice(0, 10);
                    newComment.postId = this.post.id;
                    newComment.user = this.sharedMemoryService.userName;
                    this.addNewCommentSubscription = this.blogService.addNewComment(newComment)
                        .subscribe((comment: Comment) => {
                            this.comments.push(comment);
                        });
                }
            }
        } else {
            this.goToLogin();
        }
    }

    goToLogin() {
        this.sharedMemoryService.refererUrl = this.router.url;
        this.router.navigate(['login']);
    }

    get currentUser(): string {
        return this.sharedMemoryService.userName;
    }

    get currentDate(): string {
        return new Date().toJSON().slice(0, 10);
    }
}
