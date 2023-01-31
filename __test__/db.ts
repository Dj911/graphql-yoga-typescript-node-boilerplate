import { database } from '../src/core/dbConnection';
import { config } from '../src/core/config'
import { UserModel } from '../src/modules/user/model'
import logger from '../src/core/logger';
import mongoose from 'mongoose';

export const connectDb = async () => {
    const connection = new database(config.DB.url, config.DB.options)
    const db = connection.connect()

}

export const cleanDB = async (cb: any) => {
    await UserModel.deleteMany({})
    cb()
}

export const disconnectDB = () => {
    mongoose.disconnect()
}
export const generateMongooseId = () => {
    return new mongoose.Types.ObjectId()
}

// db.on('connected', () => {
//     logger.info('Mongoose connection open to test DB')
// })

// // If the connection throws an error
// db.on('error', (err) => {
//     logger.debug(`Mongoose connection error for test DB: ${err}`)
// })

// // When the connection is disconnected
// db.on('disconnected', () => {
//     logger.debug('Mongoose connection disconnected for test DB')
// })

// // When connection is reconnected
// db.on('reconnected', () => {
//     logger.info('Mongoose connection reconnected for test DB')
// })

// // If the Node process ends, close the Mongoose connection
// process.on('SIGINT', () => {
//     db.close(() => {
//         logger.debug('Mongoose connection disconnected for test DB through app termination')

//         process.exit(0)
//     })
// })