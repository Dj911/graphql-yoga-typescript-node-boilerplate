import { Model } from 'mongoose'
import { Inject, Service } from 'typedi'
import { IPost } from '@post/model'
import { CreatePostInput, SharePostInput } from '@post/inputs'
import { PostPublishedResponse, UserPostList } from '@post/response'
import { responseMessages } from '@root/core/messages'
import { GraphQLError } from 'graphql'

@Service()
export class PostService {
	constructor(@Inject('Post') private readonly PostModel: Model<IPost>) {}

	async createPost(payload: CreatePostInput) {
		const { author, title } = payload

		const post = await this.PostModel.create({
			title,
			ownerId: author,
			currentOwner: author
		})

		const response: PostPublishedResponse = {
			message: responseMessages.SUCCESS!,
			data: post
		}

		return response
	}

	async getUserPosts(userId: string) {
		const posts = await this.PostModel.find({
			currentOwner: userId
		}).lean()

		const response: UserPostList = {
			data: posts
		}

		return response
	}

	async sharePost(payload: SharePostInput) {
		const { postId, sharedUser } = payload

		const parentPost = await this.PostModel.findById(postId)

		if (!parentPost) throw new GraphQLError(responseMessages.POST_NOT_FOUND!)

		const sharedPost = await this.PostModel.create({
			title: parentPost.title,
			parentPost: postId,
			ownerId: parentPost.ownerId,
			currentOwner: sharedUser
		})

		const response: PostPublishedResponse = {
			message: responseMessages.SUCCESS!,
			data: sharedPost
		}

		return response
	}
}
