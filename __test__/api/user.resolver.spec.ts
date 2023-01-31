// const db = require("../db")
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { cleanDB, disconnectDB, generateMongooseId, connectDb } from '../db'
import { runQuery } from "../run"
import { GraphQLError } from "graphql"

//TODO: Testing is not working properly
// beforeAll(connectDb)

describe("Register Mutation", () => {
    // beforeAll(connectDb)
    // afterAll(disconnectDB)
    // afterAll(cleanDB)
    const registerMutation = `
        mutation Mutation($payload: UserRegisterInput!) {
            registerUser(payload: $payload) {
            _id
            name
            userName
            password
            mobileNumber
            age
            isActive
            lastLogin
            }
        }
    `
    it("run successfully", async () => {
        const user = {
            "payload": {
                "userName": "Ethan",
                "password": "!@sfa"
            }
        }
        const response = await runQuery(registerMutation, user)
        expect(response).toContain({
            message: "Success",
            "data": {
                "_id": "63d917456f4a5476ac4f4a9c",
                "userName": "Ethan",
                "password": "$2b$12$DLpaCeAQXpC35M3HF71r3eoGxgNQ0klq8MWxP6pepsNR7YzRj6siC",
            }
        })
    })
})

// afterAll(cleanDB)
// afterAll(disconnectDB)