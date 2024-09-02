"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAnswersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_answer_mapper_1 = require("../mappers/prisma-answer-mapper");
const answer_attachments_repository_1 = require("../../../../domain/forum/application/repositories/answer-attachments-repository");
const domain_events_1 = require("../../../../core/events/domain-events");
let PrismaAnswersRepository = class PrismaAnswersRepository {
    constructor(prisma, answerAttachments) {
        this.prisma = prisma;
        this.answerAttachments = answerAttachments;
    }
    async findManyByQuestionId(questionId, { page }) {
        const answers = await this.prisma.answer.findMany({
            where: {
                questionId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
            skip: (page - 1) * 20,
        });
        return answers.map(prisma_answer_mapper_1.PrismaAnswerMapper.toDomain);
    }
    async findById(id) {
        const answer = await this.prisma.answer.findFirst({
            where: {
                id,
            },
        });
        if (!answer) {
            return null;
        }
        return prisma_answer_mapper_1.PrismaAnswerMapper.toDomain(answer);
    }
    async create(answer) {
        const data = prisma_answer_mapper_1.PrismaAnswerMapper.toPrisma(answer);
        await this.prisma.answer.create({
            data,
        });
        await this.answerAttachments.createMany(answer.attachments.currentItems);
        domain_events_1.DomainEvents.dispatchEventsForAggregate(answer.id);
    }
    async delete(answer) {
        const data = prisma_answer_mapper_1.PrismaAnswerMapper.toPrisma(answer);
        await this.answerAttachments.deleteManyByAnswerId(answer.id.toString());
        await this.prisma.answer.delete({
            where: {
                id: data.id,
            },
        });
    }
    async save(answer) {
        const data = prisma_answer_mapper_1.PrismaAnswerMapper.toPrisma(answer);
        await Promise.all([
            this.answerAttachments.deleteMany(answer.attachments.getRemovedItems()),
            this.answerAttachments.createMany(answer.attachments.getNewItems()),
            this.prisma.answer.update({
                where: {
                    id: data.id,
                },
                data,
            }),
        ]);
        domain_events_1.DomainEvents.dispatchEventsForAggregate(answer.id);
    }
    async findManyRecent({ page }) {
        const answers = await this.prisma.answer.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
            skip: (page - 1) * 20,
        });
        return answers.map(prisma_answer_mapper_1.PrismaAnswerMapper.toDomain);
    }
};
exports.PrismaAnswersRepository = PrismaAnswersRepository;
exports.PrismaAnswersRepository = PrismaAnswersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        answer_attachments_repository_1.AnswerAttachmentsRepository])
], PrismaAnswersRepository);
//# sourceMappingURL=prisma-answers-repository.js.map