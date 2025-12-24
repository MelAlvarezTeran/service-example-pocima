/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Args {
  sku: string
}

export async function addToCart(
  _: unknown,
  { sku }: Args,
  { clients, vtex }: Context
) {
  const orderItems = [
    {
      quantity: 1,
      seller: '1',
      id: sku,
      index: 0,
    },
  ]

  const session = await clients.session.getSession(vtex.sessionToken ?? '', [
    '*',
  ])

  const orderFormId = session.sessionData.namespaces.checkout.orderFormId.value

  if (orderFormId) {
    const addItemtoCart = await clients.checkout.addItem(
      orderFormId,
      orderItems
    )

    return addItemtoCart
  }

  const getOrderform = await clients.checkout.orderFormRaw()

  const addItemtoCart = await clients.checkout
    .addItem(getOrderform.orderFormId, orderItems)
    .then(() =>
      clients.session.updateSession(
        '',
        {
          checkout: {
            orderFormId: {
              value: getOrderform.orderFormId,
            },
          },
        },
        [],
        vtex.sessionToken
      )
    )

  return addItemtoCart
}
