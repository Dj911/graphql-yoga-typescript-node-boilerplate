import 'reflect-metadata'
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createYoga, useReadinessCheck } from "graphql-yoga";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { database } from "@core/dbConnection";
import { config } from "@core/config";

async function bootstrap(app) {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        emitSchemaFile: true,
        resolvers: [__dirname + "/**/*.resolver.ts"],
    });
    
    const schema = await makeExecutableSchema({ typeDefs, resolvers });

    const yoga = createYoga({
        schema,
        cors: true
    })

    app.use(`/${process.env.GRAPHQL_ENDPOINT}`,yoga)
}

export default bootstrap