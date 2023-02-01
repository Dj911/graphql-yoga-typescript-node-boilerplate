import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "@post/schema";
import { PostService } from "@post/service";
import { CreatePostInput, SharePostInput } from "@post/inputs";
import { Service } from "typedi";
import { PostPublishedResponse, UserPostList } from "@post/response";


@Service()
@Resolver(of => Post)
class UserResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(returns => PostPublishedResponse)
  async createPost(@Arg('payload') payload: CreatePostInput) {
    return this.postService.createPost(payload)
  }

  @Query(returns => UserPostList)
  async getUsersPostList(@Arg('userId') userId: string) {
    return this.postService.getUserPosts(userId)
  }

  @Mutation(returns => PostPublishedResponse)
  async sharePost(@Args() payload: SharePostInput) {
    return this.postService.sharePost(payload)
  }
}

export default UserResolver