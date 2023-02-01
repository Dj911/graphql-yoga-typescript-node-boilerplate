import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
    @Field(() => ID)
    _id: ObjectId;

    @Field()
    title: string;

    @Field(() => ID)
    ownerId: ObjectId;

    @Field(() => ID)
    currentOwner: ObjectId;

    @Field(() => ID, { nullable: true })
    parentPost?: ObjectId;

    @Field()
    likes: number

    @Field({ nullable: true })
    createdAt?: Date;
}