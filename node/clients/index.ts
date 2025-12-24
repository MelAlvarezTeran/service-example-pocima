import { IOClients, Session } from '@vtex/api'
import { Catalog, Checkout } from '@vtex/clients'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get session() {
    return this.getOrSet('session', Session)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }
}
