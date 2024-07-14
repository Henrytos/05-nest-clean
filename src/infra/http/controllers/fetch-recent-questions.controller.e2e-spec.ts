
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {Test } from '@nestjs/testing'
import request from "supertest"

describe("fetch question (E2E)",()=>{
  let app:INestApplication
  let prisma:PrismaService
  let jwt:JwtService

  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions' ,async ()=>{
    const user = await prisma.user.create({
        data:{
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',          
        }
    })
    
    const accessToken = jwt.sign({sub:user.id})

    await prisma.question.createMany({
        data:[
            {
                authorId:user.id,
                content:'question content 01',
                title: 'Question title 01',
            },
            {
                authorId:user.id,
                content:'question content 02',
                title: 'Question title 02',
            }
        ]
    })
    const response = await request(app.getHttpServer()).get('/questions')
    .set('Authorization',`Bearer ${accessToken}`)
    .send()

    expect(response.statusCode).toBe(200)

    expect(response.body.questions).toEqual([
        expect.objectContaining({
            title: 'Question title 01',
        }),
        expect.objectContaining({
            title: 'Question title 02',
        })
    ])
  })
})