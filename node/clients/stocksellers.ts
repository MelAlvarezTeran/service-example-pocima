import type { IOContext, IOResponse, InstanceOptions } from '@vtex/api'
import { ACCOUNT, ExternalClient } from '@vtex/api'

import type { Seller } from '../typings/logistics'

const baseURL = 'http://portal.vtexcommercestable.com.br/api'

const routes = {
  listInventoryBySku: (skuId: string, seller: string) =>
    `${baseURL}/logistics/pvt/inventory/skus/${skuId}?an=${seller}`,
  listSellersWL: () =>
    `${baseURL}/seller-register/pvt/sellers/?an=${ACCOUNT}&sc=1&sellerType=2`,
}

export default class StockSellers extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(baseURL, ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken,
        'X-Vtex-Use-Https': 'true',
        'Proxy-Authorization': ctx.authToken,
      },
    })
  }

  public async mapSellers(): Promise<IOResponse<Seller>> {
    return this.http.getRaw(routes.listSellersWL())
  }

  public async listInventoryBySku(
    skuId: string,
    seller: string
  ): Promise<IOResponse<string>> {
    return this.http.get(routes.listInventoryBySku(skuId, seller))
  }
}
