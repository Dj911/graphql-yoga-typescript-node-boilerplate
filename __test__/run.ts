import {Container} from 'typedi'
import { buildTypeDefsAndResolvers } from "type-graphql";
import { ErrorInterceptor } from '../src/middlewares/ErrorInterceptor';
import { UserModel } from "../src/modules/user/model";
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

export const runQuery = async (query: string, variables: any, ctx = {}) => {
    Container.set({ id: "User", factory: () => UserModel });

    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        emitSchemaFile: true,
        resolvers: [__dirname + "/**/resolver.ts"],
        globalMiddlewares: [ErrorInterceptor],
        validate: false,
        dateScalarMode: 'timestamp',
        container: Container
    });
    
    const schema = await makeExecutableSchema({ typeDefs, resolvers });

    return graphql(schema,query, {}, {}, variables)
}