import { Inject, Service } from 'typedi'
import Joi from 'joi'

import { UserModel, IUser } from '@user/model'
import { Model } from 'mongoose'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'

import { UserRegisterInput } from '@user/inputs'
import { User } from '@user/schema'
import { UserRegisterResponse } from './response'
import { responseMessages } from '@root/core/messages'

@Service()
export class UserService {
	constructor(@Inject('User') public readonly UserModel: Model<IUser>) {}

	async test() {
		return responseMessages.WELCOME_MESSAGE
	}

	async getUserById(id: string) // : Promise<IUser | null>    // If you want to use return type
	{
		const user = await this.UserModel.findById(id).lean()

		if (!user) throw new GraphQLError('User not exists!')

		const response: UserRegisterResponse = {
			message: responseMessages.SUCCESS!,
			data: user
		}

		return response
	}

	async createUser(payload: UserRegisterInput) {
		// JOI Validation
		const validatePayload = Joi.object({
			userName: Joi.string().required(),
			password: Joi.string().length(5).required()
		})

		const { error } = validatePayload.validate(payload)

		if (error) throw new GraphQLError(error.message.replace(/"/g, ''))

		const { userName, password } = payload

		const check = await this.UserModel.findOne({ userName })

		if (check) throw new GraphQLError('Username taken!')

		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await this.UserModel.create({
			userName,
			password: hashedPassword
		})

		const response: UserRegisterResponse = {
			message: responseMessages.SUCCESS!,
			data: user
		}

		return response
	}
}
