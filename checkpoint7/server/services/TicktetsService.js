import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService {

    async create(body) {
        const towerEvent = await towerEventsService.getTowerEventbyId(body.eventId)
        if (towerEvent.capacity <= 0) {
            throw new BadRequest('')
        }
        const ticketEvent = await dbContext.Tickets.create(body)

        towerEvent.capacity = towerEvent.capacity - 1
        await towerEvent.save()
        return ticketEvent
    }
}




export const ticketsService = new TicketsService()