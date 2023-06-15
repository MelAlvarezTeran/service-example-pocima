import { IOClients } from '@vtex/api'

import StockSellers from './stocksellers'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get stocksellers() {
    return this.getOrSet('stocksellers', StockSellers)
  }
}
