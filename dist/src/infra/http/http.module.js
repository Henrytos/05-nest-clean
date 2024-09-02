"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const answer_question_1 = require("../../domain/forum/application/use-cases/answer-question");
const authenticate_student_1 = require("../../domain/forum/application/use-cases/authenticate-student");
const choose_question_best_answer_1 = require("../../domain/forum/application/use-cases/choose-question-best-answer");
const comment_on_answer_1 = require("../../domain/forum/application/use-cases/comment-on-answer");
const comment_on_question_1 = require("../../domain/forum/application/use-cases/comment-on-question");
const create_question_1 = require("../../domain/forum/application/use-cases/create-question");
const delete_answer_1 = require("../../domain/forum/application/use-cases/delete-answer");
const delete_answer_comment_1 = require("../../domain/forum/application/use-cases/delete-answer-comment");
const delete_question_1 = require("../../domain/forum/application/use-cases/delete-question");
const delete_question_comment_1 = require("../../domain/forum/application/use-cases/delete-question-comment");
const edit_answer_1 = require("../../domain/forum/application/use-cases/edit-answer");
const edit_question_1 = require("../../domain/forum/application/use-cases/edit-question");
const fetch_answer_comments_1 = require("../../domain/forum/application/use-cases/fetch-answer-comments");
const fetch_question_answers_1 = require("../../domain/forum/application/use-cases/fetch-question-answers");
const fetch_question_comments_1 = require("../../domain/forum/application/use-cases/fetch-question-comments");
const fetch_recent_questions_1 = require("../../domain/forum/application/use-cases/fetch-recent-questions");
const get_question_by_slug_1 = require("../../domain/forum/application/use-cases/get-question-by-slug");
const register_student_1 = require("../../domain/forum/application/use-cases/register-student");
const cryptography_module_1 = require("../cryptography/cryptography.module");
const answer_question_controller_1 = require("./controllers/answer-question.controller");
const authenticate_controller_1 = require("./controllers/authenticate.controller");
const choose_question_best_answer_controller_1 = require("./controllers/choose-question-best-answer.controller");
const comment_on_answer_controller_1 = require("./controllers/comment-on-answer.controller");
const comment_on_question_controller_1 = require("./controllers/comment-on-question.controller");
const create_account_controller_1 = require("./controllers/create-account.controller");
const create_question_controller_1 = require("./controllers/create-question.controller");
const delete_answer_comment_controller_1 = require("./controllers/delete-answer-comment.controller");
const delete_answer_controller_1 = require("./controllers/delete-answer.controller");
const delete_question_comment_controller_1 = require("./controllers/delete-question-comment.controller");
const delete_question_controller_1 = require("./controllers/delete-question.controller");
const edit_answer_controller_1 = require("./controllers/edit-answer.controller");
const edit_question_controller_1 = require("./controllers/edit-question.controller");
const fetch_answer_comments_controller_1 = require("./controllers/fetch-answer-comments.controller");
const fetch_question_answers_controller_1 = require("./controllers/fetch-question-answers.controller");
const fetch_question_comments_controller_1 = require("./controllers/fetch-question-comments.controller");
const fetch_recent_questions_controller_1 = require("./controllers/fetch-recent-questions.controller");
const get_quetion_by_slug_controller_1 = require("./controllers/get-quetion-by-slug.controller");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const upload_attachment_controller_1 = require("./controllers/upload-attachment.controller");
const storage_module_1 = require("../storage/storage.module");
const upload_and_create_attachment_1 = require("../../domain/forum/application/use-cases/upload-and-create-attachment");
const read_notification_controller_1 = require("./controllers/read-notification.controller");
const read_notification_1 = require("../../domain/notification/application/use-cases/read-notification");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cryptography_module_1.CryptographyModule, storage_module_1.StorageModule],
        controllers: [
            create_account_controller_1.CreateAccountController,
            authenticate_controller_1.AuthenticateController,
            fetch_recent_questions_controller_1.FetchRecentQuestionsController,
            create_question_controller_1.CreateQuestionController,
            get_quetion_by_slug_controller_1.GetQuestionBySlugController,
            edit_question_controller_1.EditQuestionController,
            delete_question_controller_1.DeleteQuestionController,
            answer_question_controller_1.AnswerQuestionController,
            edit_answer_controller_1.EditAnswerController,
            delete_answer_controller_1.DeleteAnswerController,
            fetch_question_answers_controller_1.FetchQuestionAnswersController,
            choose_question_best_answer_controller_1.ChooseQuestionBestAnswerController,
            comment_on_answer_controller_1.CommentOnAnswerController,
            comment_on_question_controller_1.CommentOnQuestionController,
            delete_question_comment_controller_1.DeleteQuestionCommentController,
            delete_answer_comment_controller_1.DeleteAnswerCommentController,
            fetch_question_comments_controller_1.FetchQuestionCommentsController,
            fetch_answer_comments_controller_1.FetchAnswerCommentsController,
            upload_attachment_controller_1.UploadAttachmentControllert,
            read_notification_controller_1.ReadNotificationController,
        ],
        providers: [
            create_question_1.CreateQuestionUseCase,
            fetch_recent_questions_1.FetchRecentQuestionsUseCase,
            register_student_1.RegisterStudentUseCase,
            authenticate_student_1.AuthenticateStudentUseCase,
            get_question_by_slug_1.GetQuestionBySlugUseCase,
            edit_question_1.EditQuestionUseCase,
            delete_question_1.DeleteQuestionUseCase,
            answer_question_1.AnswerQuestionUseCase,
            edit_answer_1.EditAnswerUseCase,
            delete_answer_1.DeleteAnswerUseCase,
            fetch_question_answers_1.FetchQuestionAnswersUseCase,
            choose_question_best_answer_1.ChooseQuestionBestAnswerUseCase,
            comment_on_answer_1.CommentOnAnswerUseCase,
            comment_on_question_1.CommentOnQuestionUseCase,
            delete_question_comment_1.DeleteQuestionCommentUseCase,
            delete_answer_comment_1.DeleteAnswerCommentUseCase,
            fetch_question_comments_1.FetchQuestionCommentsUseCase,
            fetch_answer_comments_1.FetchAnswerCommentsUseCase,
            upload_and_create_attachment_1.UploadAndCreateAttachmentUseCase,
            read_notification_1.ReadNotificationUseCase,
        ],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map