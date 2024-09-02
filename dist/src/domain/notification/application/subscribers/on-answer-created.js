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
exports.OnAnswerCreated = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const question_repository_1 = require("../../../forum/application/repositories/question-repository");
const answer_created_event_1 = require("../../../forum/enterprise/events/answer-created-event");
const send_notification_1 = require("../use-cases/send-notification");
const common_1 = require("@nestjs/common");
let OnAnswerCreated = class OnAnswerCreated {
    constructor(questionsRepository, sendNotificationUseCase) {
        this.questionsRepository = questionsRepository;
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendNewAnswerNotification.bind(this), answer_created_event_1.AnswerCreatedEvent.name);
    }
    async sendNewAnswerNotification({ answer }) {
        const question = await this.questionsRepository.findById(answer.questionId.toString());
        if (question) {
            await this.sendNotificationUseCase.execute({
                recipientId: question.authorId.toString(),
                title: `Nova notificação: ${question.title} - ${answer.content.substring(0, 10).concat('.....')}`,
                content: answer.excerpt,
            });
        }
    }
};
exports.OnAnswerCreated = OnAnswerCreated;
exports.OnAnswerCreated = OnAnswerCreated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionsRepository,
        send_notification_1.SendNotificationUseCase])
], OnAnswerCreated);
//# sourceMappingURL=on-answer-created.js.map