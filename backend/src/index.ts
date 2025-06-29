import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'
import { userRoutes } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  }
}>()


app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/user",userRoutes)
app.route("/blog",blogRouter)

export default app
