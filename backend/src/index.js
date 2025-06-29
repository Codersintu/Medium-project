import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
const app = new Hono();
app.use('/api/v1/blog/*', async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
        next();
    }
    else {
        c.status(403);
        return c.json({ error: "Unauthorized" });
    }
});
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.post("/api/v1/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            }
        });
        // const token=sign({id:user.id},c.env.JWT_SECRET)
        return c.text('hello signup');
    }
    catch (error) {
        c.status(411);
        return c.text("invalid");
    }
});
app.post("/api/v1/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    if (!user) {
        c.status(403);
        return c.json({ error: "user not here" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
});
app.post("/api/v1/blog", (c) => {
    return c.text('Hello Hono!');
});
app.put("/api/v1/blog", (c) => {
    return c.text('Hello Hono!');
});
app.get("/api/v1/blog/:id", (c) => {
    return c.text('Hello Hono!');
});
export default app;
