import { ArrayMaxSize, Length, Max, MaxLength, Min, IsDateString } from "class-validator";
import { ArgsType, Field, InputType, Int } from "type-graphql";

@InputType()
export class NewUserInput {
    @Field()
    @MaxLength(30)
    name: string;

    @Field()
    @Length(30, 255)
    mobileNumber: number;

    @Field({nullable: true})
    age?: number;

    @Field({nullable: true})
    isActive: boolean;

    @Field()
    @IsDateString()
    lastLogin: Date;
}

@ArgsType()
export class RecipesArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}