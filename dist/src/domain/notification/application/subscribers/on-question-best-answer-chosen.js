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
exports.OnQuestionBestAnswerChosen = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const send_notification_1 = require("../use-cases/send-notification");
const question_best_answer_chosen_event_1 = require("../../../forum/enterprise/events/question-best-answer-chosen-event");
const answers_repository_1 = require("../../../forum/application/repositories/answers-repository");
const common_1 = require("@nestjs/common");
let OnQuestionBestAnswerChosen = class OnQuestionBestAnswerChosen {
    constructor(answerRepository, sendNotificationUseCase) {
        this.answerRepository = answerRepository;
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), question_best_answer_chosen_event_1.QuestionBestAnswerChosenEvent.name);
    }
    async sendQuestionBestAnswerNotification({ bestAnswerId, question, }) {
        const answer = await this.answerRepository.findById(bestAnswerId.toString());
        if (answer) {
            await this.sendNotificationUseCase.execute({
                recipientId: answer.authorId.toString(),
                title: `Sua resposta foi escolhida!`,
                content: `A resposta que você enviou em "${question.title
                    .substring(0, 20)
                    .concat('...')}" foi escolhida pelo autor!"`,
            });
        }
    }
};
exports.OnQuestionBestAnswerChosen = OnQuestionBestAnswerChosen;
exports.OnQuestionBestAnswerChosen = OnQuestionBestAnswerChosen = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answers_repository_1.AnswersRepository,
        send_notification_1.SendNotificationUseCase])
], OnQuestionBestAnswerChosen);
//# sourceMappingURL=on-question-best-answer-chosen.js.map