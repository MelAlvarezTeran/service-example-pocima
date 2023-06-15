export async function mapsellers(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { stocksellers: mapsellersClient },
  } = ctx

  ctx.state.sellers = await mapsellersClient.mapSellers()

  await next()
}
