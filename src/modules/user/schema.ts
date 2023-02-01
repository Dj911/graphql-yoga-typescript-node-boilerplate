import { ObjectId } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
	@Field(() => ID)
	_id: ObjectId

	@Field({ nullable: true })
	name?: string

	@Field()
	userName: string

	@Field()
	password: string

	@Field({ nullable: true })
	mobileNumber?: number

	@Field({ nullable: true })
	age?: number

	@Field({ nullable: true })
	isActive?: boolean

	@Field({ nullable: true })
	lastLogin?: Date

	//TODO: Use Custom Scalar File type
	/* @Field(() => File)
	profile: File */
}
