import {config as configure} from 'dotenv'
configure()

export interface Config {
	PORT: string
	ENVIRONMENT: string
	DB: {
		url: string
		options: {
			useNewUrlParser: boolean
			useUnifiedTopology: boolean
		}
	}
	PASSWORD_SALT: string
	JWT_SECRET: string
	JWT_EXPIRES_IN: string
}

export const config: Config = {
	PORT: (process.env.PORT as string) || '3000',
	ENVIRONMENT: (process.env.ENVIRONMENT as string) || 'development',
	DB: {
		url: (process.env.DB_URL as string) || '',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	},
	PASSWORD_SALT: (process.env.PASSWORD_SALT as string) || '',
	JWT_SECRET: (process.env.JWT_SECRET as string) || '',
	JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN as string) || ''
}
