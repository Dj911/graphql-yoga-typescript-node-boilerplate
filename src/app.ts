import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { database } from '@core/dbConnection'
import { config } from '@core/config'
import logger from '@core/logger'

class App {
	public app: Application
	constructor() {
		this.app = express()
		this.middlewares()
		this.databaseConnection()
	}
	private middlewares() {
		this.app.use(cors())
		this.app.use(helmet())
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
		// this.app.use(status())	// Server Status using express-status-monitor
		if (process.env.ENVIRONMENT === 'development') {
			this.app.use(morgan('dev'))
		}
		this.app.use(
			rateLimit({
				max: 1000,
				windowMs: 60 * 60 * 1000,
				message: 'Too many requests from this IP, please try again in an hour!'
			})
		)
	}
	private databaseConnection() {
		const connection = new database(config.DB.url, config.DB.options)
		const db = connection.connect()
		db.on('connected', () => {
			logger.info('Mongoose connection open to master DB')
		})

		// If the connection throws an error
		db.on('error', (err) => {
			logger.debug(`Mongoose connection error for master DB: ${err}`)
		})

		// When the connection is disconnected
		db.on('disconnected', () => {
			logger.debug('Mongoose connection disconnected for master DB')
		})

		// When connection is reconnected
		db.on('reconnected', () => {
			logger.info('Mongoose connection reconnected for master DB')
		})

		// If the Node process ends, close the Mongoose connection
		process.on('SIGINT', () => {
			db.close(() => {
				logger.debug('Mongoose connection disconnected for master DB through app termination')

				process.exit(0)
			})
		})
	}
	createServer() {
		this.app.set('port', process.env.PORT ? process.env.PORT : '3000')
		return {
			app: this.app,
			port: this.app.get('port')
		}
	}
}

const application = new App()
export default application
