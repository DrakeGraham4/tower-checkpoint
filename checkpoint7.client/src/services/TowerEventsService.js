import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService{

    async getAll() {
        const res = await api.get('api/events')
        logger.log('getting events', res.data)
        AppState.towerEvents = res.data
    }
}

export const towerEventsService = new TowerEventsService()
