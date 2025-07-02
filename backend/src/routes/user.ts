import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from 'zod-common'


export const userRoutes = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  }
}>()


userRoutes.post("/signup",async(c)=>{
const body=await c.req.json();
const {success}=signupInput.safeParse(body)
if (!success) {
  c.status(411);
  return c.json({
    message:"Input not correct"
  })
}

const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
}).$extends(withAccelerate())

try {
  const user=await prisma.user.create({
  data:{
    name:body.name,
    email:body.email,
    password:body.password,
  }
})
const jwt=await sign({id:user.id},c.env.JWT_SECRET)
  return c.text(jwt)
} catch (error) {
  console.log(error);
    c.status(411);
    return c.text("invalid")
}
})


userRoutes.post("/signin",async(c)=>{
  const body=await c.req.json();
const {success}=signinInput.safeParse(body)
if (!success) {
  c.status(411);
  return c.json({
    message:"Input not correct"
  })
}
  const prisma = new PrismaClient({
    datasourceUrl:c.env?.DATABASE_URL,
}).$extends(withAccelerate())

try {
  const user=await prisma.user.findUnique({
  where:{
    email:body.email
  }
})
if (!user) {
  c.status(403);
  return c.json({error:"user not here"});
}

  return c.text("signin")
} catch (error) {
  console.log(error)
  c.status(411)
  return c.text("not found")
}
})