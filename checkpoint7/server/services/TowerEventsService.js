
import {dbContext} from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class TowerEventsService{
    
    async getTowerEventbyId(id) {
        const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        if (!towerEvent) {
            throw new BadRequest('Invalid Tower Event Id')
        }
        return towerEvent
    }
    async edit(update, id) {
        const original = await dbContext.TowerEvents.findById(id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden('This is not your Event to edit')
        }
        if (original.isCanceled) {
            throw new BadRequest('This Event is already canceled!')
        }

    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    original.coverImg = update.coverImg ? update.coverImg : original.coverImg
    original.location = update.location ? update.location : original.location
    original.capacity = update.capacity ? update.capacity : original.capacity
    original.startDate = update.startDate ? update.startDate : original.startDate
    original.type = update.type ? update.type : original.type

    await original.save()
    return original
    }
    async getAll(query = {}) {
        const towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
        return towerEvents

    }
    async create(body) {
        const towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('creator', 'name picture')
        return towerEvent
    }

    async removeEvent(id, userId) {
    const original = await dbContext.TowerEvents.findById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('This is not your event to remove')
    }
    original.isCanceled = true
    await original.save()
    return original
  }

}

export const towerEventsService = new TowerEventsService()