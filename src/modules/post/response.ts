import { Field, ObjectType } from "type-graphql";

import { Post } from "@post/schema";

@ObjectType({ description: "Post Response" })
export class PostPublishedResponse {
    @Field()
    message: string;

    @Field(() => Post)
    data: Post | null;
}

@ObjectType({ description: "List of User's Published Posts Response" })
export class UserPostList {
    @Field(() => [Post])
    data: Post[] | null;
}