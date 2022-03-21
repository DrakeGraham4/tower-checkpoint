import { Auth0Provider } from "@bcwdev/auth0provider";
import { guestsService } from "../services/GuestsService";
import BaseController from "../utils/BaseController";

export class GuestsController extends BaseController{
    constructor() {
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
    }

    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await guestsService.create(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

}