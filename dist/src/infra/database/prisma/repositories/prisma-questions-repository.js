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
exports.PrismaQuestionsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_question_mapper_1 = require("../mappers/prisma-question-mapper");
const question_attachments_repository_1 = require("../../../../domain/forum/application/repositories/question-attachments-repository");
const question_details_mapper_1 = require("../mappers/value-objects/question-details-mapper");
const domain_events_1 = require("../../../../core/events/domain-events");
let PrismaQuestionsRepository = class PrismaQuestionsRepository {
    constructor(prisma, questionAttachments) {
        this.prisma = prisma;
        this.questionAttachments = questionAttachments;
    }
    async findBySlug(slug) {
        const question = await this.prisma.question.findFirst({
            where: {
                slug,
            },
        });
        if (!question) {
            return null;
        }
        return prisma_question_mapper_1.PrismaQuestionMapper.toDomain(question);
    }
    async findDetailsBySlug(slug) {
        const question = await this.prisma.question.findUnique({
            where: {
                slug,
            },
            include: {
                author: true,
                attachments: true,
            },
        });
        if (!question) {
            return null;
        }
        return question_details_mapper_1.PrismaQuestionDetailsMapper.toDomain(question);
    }
    async findById(id) {
        const question = await this.prisma.question.findFirst({
            where: {
                id,
            },
        });
        if (!question) {
            return null;
        }
        return prisma_question_mapper_1.PrismaQuestionMapper.toDomain(question);
    }
    async create(question) {
        const data = prisma_question_mapper_1.PrismaQuestionMapper.toPrisma(question);
        await this.prisma.question.create({
            data,
        });
        await this.questionAttachments.createMany(question.attachments.getItems());
    }
    async delete(question) {
        const data = prisma_question_mapper_1.PrismaQuestionMapper.toPrisma(question);
        await this.questionAttachments.deleteMany(question.attachments.getRemovedItems());
        await this.prisma.question.delete({
            where: {
                id: data.id,
            },
        });
    }
    async save(question) {
        const data = prisma_question_mapper_1.PrismaQuestionMapper.toPrisma(question);
        await Promise.all([
            this.prisma.question.update({
                where: {
                    id: question.id.toString(),
                },
                data,
            }),
            this.questionAttachments.createMany(question.attachments.getNewItems()),
            this.questionAttachments.deleteMany(question.attachments.getRemovedItems()),
        ]);
        domain_events_1.DomainEvents.dispatchEventsForAggregate(question.id);
    }
    async findManyRecent({ page }) {
        const questions = await this.prisma.question.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
            skip: (page - 1) * 20,
        });
        return questions.map(prisma_question_mapper_1.PrismaQuestionMapper.toDomain);
    }
};
exports.PrismaQuestionsRepository = PrismaQuestionsRepository;
exports.PrismaQuestionsRepository = PrismaQuestionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        question_attachments_repository_1.QuestionAttachmentsRepository])
], PrismaQuestionsRepository);
//# sourceMappingURL=prisma-questions-repository.js.map