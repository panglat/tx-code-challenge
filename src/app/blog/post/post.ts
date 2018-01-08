/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';

import template from './post.html';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/index';
import { Post } from '../../models/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'post',
  template,
})
export class PostComponent implements OnInit, OnDestroy, AfterViewInit {
    post: Post;
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
        this.getPostSubscription = this.blogService.getPost(postId).subscribe((post: Post) => {
            this.post = post;
        }, error => {
            console.log(error);
        })
    }
}
