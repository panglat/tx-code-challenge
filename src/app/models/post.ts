export interface Post {
    "id": Number;
    "title": String;
    "author": String;
    "publish_date": String; // Date that post was published in YYYY-MM-DD format
    "slug": String;         // Readable URL to use for individual posts
    "description": String;  // Short description for blog post listing
    "content": String;      // Full blog post content -- may contain markup
  }