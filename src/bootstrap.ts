import { makeExecutableSchema } from "@graphql-tools/schema";
import { createYoga } from "graphql-yoga";
import { buildTypeDefsAndResolvers } from "type-graphql";

async function bootstrap(app) {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [__dirname + "/**/*.resolver.ts"],
    });
    
    const schema = await makeExecutableSchema({ typeDefs, resolvers });

    const yoga = createYoga({schema})

    app.use(`/${process.env.GRAPHQL_ENDPOINT}`,yoga)
}

export default bootstrap