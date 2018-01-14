/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, ViewChild } from '@angular/core';

import template from './posts.html';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/index';
import { Post } from '../../models/index';
import { Router } from '@angular/router';
import { MessageModalComponent } from '../../modals';

@Component({
  selector: 'posts',
  template,
})
export class PostsComponent implements OnInit, OnDestroy {
    @ViewChild(MessageModalComponent) messageModalComponent: MessageModalComponent;
    posts: Post[];
    private getPostsSubscription: Subscription;
    isLoading = true;

    constructor(private router: Router, private blogService: BlogService) { }
  
    ngOnInit() {
        this.isLoading = true;
        this.getPostsSubscription = this.blogService.getPosts().subscribe((posts: Post[]) => {
            this.posts = posts;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            this.messageModalComponent.show('Error', 'Error retrieving the posts list');
        });
    }

    ngOnDestroy(): void {
        if(this.getPostsSubscription) { this.getPostsSubscription.unsubscribe(); }
    }

    goToPost(postId: number) {
        this.router.navigate([`blog/post/${postId}`]);
    }
}
