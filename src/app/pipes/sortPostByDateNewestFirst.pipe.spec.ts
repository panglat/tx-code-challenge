import { SortPostByDateNewestFirstPipe } from './';
import { Post } from '../models';

describe('TestPipePipe', () => {
    let pipe: SortPostByDateNewestFirstPipe;

    beforeEach(() => {
        pipe = new SortPostByDateNewestFirstPipe();
    });

    it('Check that the pipe sort the post by date DESC', () => {
        const posts:Post[] = new Array<Post>();
        let post: Post;
        post = <Post>{};
        post.id = 1;
        post.publish_date = '2018-01-10'
        posts.push(post);

        post = <Post>{};
        post.id = 2;
        post.publish_date = '2018-01-11';
        posts.push(post);

        post = <Post>{};
        post.id = 3;
        post.publish_date = '2018-01-12';
        posts.push(post);
        
        post = <Post>{};
        post.id = 4;
        post.publish_date = '2018-01-05';
        posts.push(post);

        post = <Post>{};
        post.id = 5;
        post.publish_date = '2018-01-03';
        posts.push(post);

        post = <Post>{};
        post.id = 6;
        post.publish_date = '2018-01-06';
        posts.push(post);

        const sortPosts:Post[] = pipe.transform(posts);

        expect(sortPosts).toBeDefined();
        expect(sortPosts instanceof Array).toBeTruthy();
        expect(sortPosts[0].id).toBe(3);
        expect(sortPosts[1].id).toBe(2);
        expect(sortPosts[2].id).toBe(1);
        expect(sortPosts[3].id).toBe(6);
        expect(sortPosts[4].id).toBe(4);
        expect(sortPosts[5].id).toBe(5);
    });

});
