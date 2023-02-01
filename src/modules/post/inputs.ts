// import { ArrayMaxSize, Length, Max, MaxLength, Min, IsDateString, IsStrongPassword } from "class-validator";
import { ArgsType, Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  title: string

  @Field(() => ID)
  author: string
}

@ArgsType()
export class SharePostInput {
  @Field(() => ID)
  postId: string

  @Field(() => ID)
  sharedUser: string
}

/* @ArgsType()
export class RecipesArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
} */