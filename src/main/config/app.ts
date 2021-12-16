import express from 'express'
import setupMiddleware from './middleware'
import setupRoutes from './routes/register.route'

const app = express()
setupMiddleware(app)
setupRoutes(app)

export default app
