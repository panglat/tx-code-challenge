export interface Comment {
    "id": Number;
    "postId": Number;
    "parent_id": Number|null; // Parent comment for replies, is `null` if top-level comment
    "user": String;           // Name of commenter
    "date": String;           // Date of comment in YYYY-MM-DD format
    "content": String;        // Comment content
    "children": Comment[];
    "parent": Comment;
  }