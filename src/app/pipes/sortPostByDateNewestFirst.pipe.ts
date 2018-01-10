import { Pipe } from "@angular/core";
import { Post } from "../models/post";

@Pipe({ name: "sortPostByDateNewestFirstPipe" })
export class SortPostByDateNewestFirstPipe {
    transform(array: Array<Post>): Array<Post> {
        if (array) {
            array.sort((a: Post, b: Post) => {
                if (a.publish_date < b.publish_date) {
                    return 1;
                } else if (a.publish_date > b.publish_date) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
        return array;
    }
}