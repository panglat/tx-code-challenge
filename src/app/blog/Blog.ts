/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';

import template from './blog.html';
import { BlogService } from '../services/blog.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../models/index';

@Component({
  selector: 'blog',
  template,
})
export class BlogComponent implements OnInit, OnDestroy, AfterViewInit {
    posts: Post[];
    private getPostsSubscription: Subscription

    constructor(private blogService: BlogService) { }
  
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
}
