import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import {commentsService} from "../services/CommentsService"
import { towerEventsService } from "../services/TowerEventsService";

export class CommentsController extends BaseController{
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        
    }


    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsByTowerEventId(req, res, next) {
        try {
            const towerEvent = await commentsService.getCommentsByTowerEventId(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
}