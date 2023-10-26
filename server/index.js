import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { register, login, getUser } from './controllers/UserController.js'
import { authValidator } from './helpers/validators.js'
import handleValidationErrors from './middlewares/handleValidationErrors.js'
import isAuth from './middlewares/isAuth.js'

dotenv.config()

try {
	console.log('MONGO_URL=', process.env.MONGO_DB_URL)
	await mongoose.connect(process.env.MONGO_DB_URL)
	// await mongoose.connect(process.env.MONGO_URL)
	console.log('Database connect')
} catch (error) {
	console.warn('Connection to mongo failed', error)
}

const app = express()

app.use(express.json())
app.use(cors())

// endpoints
app.post('/register', authValidator, handleValidationErrors, register)
app.post('/login', authValidator, handleValidationErrors, login)

app.get('/me', isAuth, getUser)

const PORT = process.env.PORT || 8888

app.listen(PORT, (error) => {
	if (error) return console.log(error)

	console.log(`Server is running on port ${PORT}`)
})
