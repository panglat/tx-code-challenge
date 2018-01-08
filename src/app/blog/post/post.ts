/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';

import template from './post.html';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/index';
import { Post, Comment } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'post',
  template,
})
export class PostComponent implements OnInit, OnDestroy, AfterViewInit {
    post: Post;
    comments: Comment[];
    private getPostSubscription: Subscription
    private routeParamsSubscription: Subscription

    constructor(private route: ActivatedRoute, private blogService: BlogService) { }
  
    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            const postId = params['id'];
            this.getPostInformation(postId);
        });

    }

    ngOnDestroy(): void {
        if(this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
        if(this.getPostSubscription) { this.getPostSubscription.unsubscribe(); }
    }

    ngAfterViewInit(): void {
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
}
