import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService{
    async getCommentsByTowerEventId(id) {
        const comments = await dbContext.Comments.find({ id: id }).populate('creator')
        if (!comments) {
            throw new BadRequest('You cannot comment on this event')
        }
        return comments
    }
    async createComment(newComment) {
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator', 'name description picture')
        return comment
    }

}

export const commentsService = new CommentsService()