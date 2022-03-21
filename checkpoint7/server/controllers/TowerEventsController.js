import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import {  towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";
export class TowerEventsController extends BaseController{
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getTowerEventbyId)
            .get('/:id/comments')
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.removeEvent)
        
    }
    async create(req,res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
        req.body.id = req.params.id
        const updated = await towerEventsService.edit(req.body, req.params.id )
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

    async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll(req.query)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getTowerEventbyId(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getTowerEventbyId(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async removeEvent(req, res, next) {
    try {
      await towerEventsService.removeEvent(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
    }
    
    async getCommentsByTowerEventId(req, res, next) {
        try {
            let newEventComments = await commentsService.getCommentsByTowerEventId(req.params.id)
            res.send(newEventComments)
        } catch (error) {
            next(error)
        }
    }

}