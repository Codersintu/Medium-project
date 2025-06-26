import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:String
  }
}>()
const client = new PrismaClient().$extends(withAccelerate())

app.use('/api/v1/blog/*', async (c, next) => {
  const header=c.req.header("Authorization") || ""
  const token=header.split(" ")[1]

  const response=await verify(token,c.env.JWT_SECRET)
  if (response.id) {
    next()
  }else{
    c.status(403)
    return c.json({error:"Unauthorized"});
  }
})


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup",async(c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL,
// }).$extends(withAccelerate())

const body=await c.req.json();

const user=await client.user.create({
  data:{
    email:body.email,
    password:body.password,
  }
})
const token=sign({id:user.id},c.env.JWT_SECRET)
  return c.json({jwt:token})
})



app.post("/api/v1/signin",async(c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl:c.env?.DATABASE_URL,
// }).$extends(withAccelerate())

const body=await c.req.json();

const user=await client.user.findUnique({
  where:{
    email:body.email
  }
})
if (!user) {
  c.status(403);
  return c.json({error:"user not here"});
}
const jwt=await  sign({id:user.id},c.env.JWT_SECRET)

  return c.json({jwt})
})



app.post("/api/v1/blog",(c)=>{
  return c.text('Hello Hono!')
})
app.put("/api/v1/blog",(c)=>{
  return c.text('Hello Hono!')
})
app.get("/api/v1/blog/:id",(c)=>{
  return c.text('Hello Hono!')
})

export default app
