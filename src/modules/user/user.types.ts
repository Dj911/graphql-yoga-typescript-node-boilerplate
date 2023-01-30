import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class User {
    @Field(()=> ID)
    id; string;

    @Field()
    name: string;

    @Field()
    mobileNumber: number;

    @Field()
    age?: number;

    @Field()
    isActive: boolean;

    @Field()
    lastLogin: Date;
}

export default User