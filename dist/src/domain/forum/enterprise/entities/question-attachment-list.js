"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAttachmentList = void 0;
const watched_list_1 = require("../../../../core/entities/watched-list");
class QuestionAttachmentList extends watched_list_1.WatchedList {
    compareItems(a, b) {
        return a.attachmentId.equals(b.attachmentId);
    }
}
exports.QuestionAttachmentList = QuestionAttachmentList;
//# sourceMappingURL=question-attachment-list.js.map