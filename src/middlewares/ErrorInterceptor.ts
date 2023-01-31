import logger from "@root/core/logger";
import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";

// This is used as Global Error Middleware
export const ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {
    try {
        return await next();
    } catch (err: any) {
        // write error to file log
        logger.error(err);

        // throw the error
        throw new GraphQLError(err);
    }
};