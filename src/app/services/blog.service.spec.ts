import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService } from './';
import { Post } from '../models';

describe('BlogService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BlogService]
        });
    });

    it('Test post list', inject([BlogService, HttpTestingController], (service: BlogService, http: HttpTestingController) => {
        let actualPosts = new Array<Post>();
        let expectedPosts = new Array<Post>();
        let post: Post = <Post>{};
        post.id = 1;
        post.title = 'Blog post #1';
        post.author = 'Melissa Manges';
        post.publish_date = '2016-02-23';
        post.description = 'Utroque denique invenire et has';
        expectedPosts.push(post);

        post = <Post>{};
        post.id = 2;
        post.title = 'Blog post #2';
        post.author = 'Olene Ogan';
        post.publish_date = '2016-03-16"';
        post.description = 'Ex legere perpetua electram vim, per nisl inermis quaestio ea.';
        expectedPosts.push(post);

        service.getPosts().subscribe((posts) => {
            actualPosts = posts;
        })
        http.expectOne(`${service.BASE_URL}/posts`).flush(expectedPosts);
        expect(actualPosts).toEqual(expectedPosts);
    }));
});
