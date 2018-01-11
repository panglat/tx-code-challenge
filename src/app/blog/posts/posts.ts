/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';

import template from './posts.html';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/index';
import { Post } from '../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'posts',
  template,
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
    posts: Post[];
    private getPostsSubscription: Subscription

    constructor(private router: Router, private blogService: BlogService) { }
  
    ngOnInit() {
    }

    ngOnDestroy(): void {
        if(this.getPostsSubscription) { this.getPostsSubscription.unsubscribe(); }
    }

    ngAfterViewInit(): void {
        this.getPostsSubscription = this.blogService.getPosts().subscribe((posts: Post[]) => {
            this.posts = posts;
        }, error => {
            console.log(error);
        })
    }

    goToPost(postId: number) {
        this.router.navigate([`blog/post/${postId}`]);
    }
}
