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
exports.PrismaQuestionCommentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const prisma_question_comment_mapper_1 = require("../mappers/prisma-question-comment-mapper");
const prisma_comment_with_author_mapper_1 = require("../mappers/value-objects/prisma-comment-with-author-mapper");
let PrismaQuestionCommentsRepository = class PrismaQuestionCommentsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(questionComment) {
        const data = prisma_question_comment_mapper_1.PrismaQuestionCommentMapper.toPrisma(questionComment);
        await this.prisma.comment.create({
            data,
        });
    }
    async findById(id) {
        const questionComment = await this.prisma.comment.findUnique({
            where: {
                id,
            },
        });
        if (!questionComment) {
            return null;
        }
        return prisma_question_comment_mapper_1.PrismaQuestionCommentMapper.toDomain(questionComment);
    }
    async delete(questionComment) {
        await this.prisma.comment.delete({
            where: {
                id: questionComment.id.toString(),
            },
        });
    }
    async findManyByQuestionId(questionId, { page }) {
        const questionsComments = await this.prisma.comment.findMany({
            take: 20,
            skip: (page - 1) * 20,
            where: {
                questionId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return questionsComments.map(prisma_question_comment_mapper_1.PrismaQuestionCommentMapper.toDomain);
    }
    async findManyByQuestionIdWithAuthor(questionId, { page }) {
        const questionsComments = await this.prisma.comment.findMany({
            take: 20,
            skip: (page - 1) * 20,
            where: {
                questionId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
            },
        });
        return questionsComments.map(prisma_comment_with_author_mapper_1.PrismaCommentWithAuthorMapper.toDomain);
    }
};
exports.PrismaQuestionCommentsRepository = PrismaQuestionCommentsRepository;
exports.PrismaQuestionCommentsRepository = PrismaQuestionCommentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaQuestionCommentsRepository);
//# sourceMappingURL=prisma-question-comments-repository.js.map