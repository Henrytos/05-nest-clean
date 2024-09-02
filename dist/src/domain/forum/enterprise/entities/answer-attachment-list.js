"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerAttachmentList = void 0;
const watched_list_1 = require("../../../../core/entities/watched-list");
class AnswerAttachmentList extends watched_list_1.WatchedList {
    compareItems(a, b) {
        return a.attachmentId.equals(b.attachmentId);
    }
}
exports.AnswerAttachmentList = AnswerAttachmentList;
//# sourceMappingURL=answer-attachment-list.js.map