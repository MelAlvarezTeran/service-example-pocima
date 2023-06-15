interface Args {
  sku: string
}

export const getStockBySeller = async (
  _: unknown,
  { sku }: Args,
  { clients }: Context
) => {
  const sellerMap = await clients.stocksellers.mapSellers()

  const stockBySeller = await Promise.all(
    sellerMap.data.items.map((seller) => {
      return clients.stocksellers
        .listInventoryBySku(sku, seller.id)
        .then((resp: any) => ({ seller: seller.id, ...resp }))
    })
  )

  return stockBySeller
}
