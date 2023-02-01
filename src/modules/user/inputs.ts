// import { ArrayMaxSize, Length, Max, MaxLength, Min, IsDateString, IsStrongPassword } from "class-validator";
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import { ArgsType, Field, InputType, Int } from 'type-graphql'

@ArgsType()
export class UserLoginInput {
	@Field()
	userName: string

	@Field()
	password: string
}

@InputType()
export class UserRegisterInput {
	@Field()
	userName: string

	@Field()
	password: string

	@Field((type) => GraphQLUpload, { nullable: true })
	profile?: FileUpload
}

@InputType()
export class UserProfileUpdate {
	@Field()
	// @MaxLength(30)
	name: string

	@Field()
	// @Length(30, 255)
	mobileNumber: number

	@Field({ nullable: true })
	age?: number

	@Field({ nullable: true })
	isActive: boolean

	@Field()
	// @IsDateString()
	lastLogin: Date
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
