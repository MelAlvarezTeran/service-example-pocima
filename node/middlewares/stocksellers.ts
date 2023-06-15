/* eslint-disable no-useless-return */
export async function stocksellers(ctx: Context) {
  const {
    vtex: {
      route: { params },
    },
    state: { sellers },
    clients: { stocksellers: stocksellersClient },
  } = ctx

  // eslint-disable-next-line array-callback-return
  const stockBySeller = await Promise.all(
    sellers.data.items.map((seller) => {
      return stocksellersClient
        .listInventoryBySku(params.sku.toString(), seller.id)
        .then((resp: any) => ({ seller: seller.id, ...resp }))
    })
  )

  ctx.body = stockBySeller
}
