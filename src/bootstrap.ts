import 'reflect-metadata'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { createYoga } from 'graphql-yoga'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { Container } from 'typedi'
import { UserModel } from '@user/model'
import { ErrorInterceptor } from '@middlewares/ErrorInterceptor'
import { PostModel } from '@post/model'

async function bootstrap(app) {
	Container.set([
		{ id: 'User', factory: () => UserModel },
		{ id: 'Post', factory: () => PostModel }
	])

	const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
		emitSchemaFile: true,
		resolvers: [__dirname + '/**/resolver.ts'],
		globalMiddlewares: [ErrorInterceptor],
		validate: false,
		dateScalarMode: 'timestamp',
		container: Container
	})

	const schema = await makeExecutableSchema({ typeDefs, resolvers })

	const yoga = createYoga({
		schema,
		cors: true,
		batching: true,
		maskedErrors: false
	})

	app.use(`/${process.env.GRAPHQL_ENDPOINT}`, yoga)
}

export default bootstrap
