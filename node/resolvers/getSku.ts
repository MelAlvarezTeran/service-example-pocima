/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Args {
  skus: string[]
}

export async function getSkus(
  _: unknown,
  { skus }: Args,
  { clients }: Context
) {
  const skuById = skus.map(async (sku) => {
    const skuData = await clients.catalog.getSkuContext(sku)

    const simulation = await clients.checkout.simulation({
      items: [{ id: sku, quantity: 1, seller: '1' }],
    })

    return {
      ListPrice: simulation.items[0]?.listPrice || 0,
      SellingPrice: simulation.items[0]?.sellingPrice || 0,
      ...skuData,
    }
  })

  return skuById
}
