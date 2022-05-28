import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { createRouter, useBase } from 'h3';
import validator from 'validator';

const router = createRouter();

const hihi = (req, res, next) => {
  console.log(req)
  next()
}

// router.use((req, res, next) => { req.setHeader('X-Foo', 'bar'); next() })

router.get('/', async () => {
  const users = await prisma.users.findMany()

  return { users }
});

// router.post('/', async () => {
//   const users = await prisma.users.create()

//   return { users }
// });

export default useBase('/api/auth', router.handler);