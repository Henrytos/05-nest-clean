"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const on_answer_created_1 = require("../../domain/notification/application/subscribers/on-answer-created");
const on_question_best_answer_chosen_1 = require("../../domain/notification/application/subscribers/on-question-best-answer-chosen");
const send_notification_1 = require("../../domain/notification/application/use-cases/send-notification");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            send_notification_1.SendNotificationUseCase,
            on_question_best_answer_chosen_1.OnQuestionBestAnswerChosen,
            on_answer_created_1.OnAnswerCreated,
        ],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map