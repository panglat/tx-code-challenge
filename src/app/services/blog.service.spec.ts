import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BlogService } from './blog.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../models/index';

describe('BlogService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BlogService]
        });
    });

    it('should list the posts', inject([BlogService, HttpTestingController], (service: BlogService, http: HttpTestingController) => {
        let actualPosts = new Array<Post>();
        let expectedPosts = new Array<Post>();
        service.getPosts().subscribe((posts) => {
            actualPosts = posts;
        })
        http.expectOne(`${service.BASE_URL}/posts`).flush(expectedPosts);
        expect(actualPosts).toEqual(expectedPosts);
    }));

    xit('should fail listing the posts', inject([BlogService, HttpTestingController], (service: BlogService) => {
        let actualPosts = new Array<Post>();
        service.getPosts().subscribe((posts) => {
            actualPosts = posts;
        })
        expect(actualPosts.length).toBe(2);
    }));    
});
