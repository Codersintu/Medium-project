import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from 'zod-common'

export  const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  },
  Variables:{
    userId:string
  }
}>()

blogRouter.use('/*', async (c, next) => {
  const header=c.req.header("Authorization") || ""
  const token=header.split(" ")[1]

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (typeof user.id === "string") {
      c.set("userId", user.id);
    await next(); 
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Invalid Token" });
  }
})

blogRouter.post("/send",async(c)=>{
  const body=await c.req.json();
  const {success}=createBlogInput.safeParse(body)
  if (!success) {
  c.status(411);
  return c.json({
    message:"Input not correct"
  })
}

    const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
  const authorId=c.get("userId")
  try {
 const blog=  await prisma.post.create({
        data:{
            title: body.title,
            content:body.content,
            authorId:authorId
        }
    })
    console.log("Created Blog:", blog); 
    return c.json({id:blog.id})
  } catch (error) {
    console.log(error)
  }
})


blogRouter.put("/",async(c)=>{
   const body=await c.req.json();
  const {success}=updateBlogInput.safeParse(body)
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
 const blog=  await prisma.post.update({
    where:{
        id:body.id
    },
        data:{
            title: body.title,
            content:body.content
        }
    })
    return c.json({id:blog.id})
  } catch (error) {
    console.log(error)
  }
})



blogRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

  try {
  const blog = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });
  return c.json({ blog });
} catch (error) {
  console.error("Error fetching blogs:", error);
  return c.status(500)
}

})


blogRouter.get("/:id",async(c)=>{
    const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const id=await c.req.param("id");
  try {
 const blog=  await prisma.post.findFirst({
    where:{
        id:id
    },
    })
    return c.json(blog)
  } catch (error) {
    console.log(error)
  }
})