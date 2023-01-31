import { Field, ObjectType } from "type-graphql";

import {User} from "@user/schema";

@ObjectType({ description: "User Response" })
export class UserRegisterResponse {
    @Field()
    message: string;

    @Field(() => User)
    data: User | null;
}