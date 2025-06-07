import { a, ClientSchema, defineData } from "@aws-amplify/backend";

export const schema = a
  .schema({
    User: a.model({
      name: a.string().required(),
      email: a.email().required(),
      role: a.string().required(),
      orders: a.hasMany("Order", "userId"),
    }),

    Order: a.model({
      title: a.string().required(),
      description: a.string(),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      products: a.hasMany("OrderProduct", "orderId"),
    }),

    Product: a.model({
      title: a.string().required(),
      type: a.string().required(),
      serialNumber: a.string().required(),
      isNew: a.boolean().required(),
      photo: a.string(),
      specification: a.string(),
      guaranteeStart: a.datetime().required(),
      guaranteeEnd: a.datetime().required(),
      priceUSD: a.float().required(),
      priceUAH: a.float().required(),
      defaultCurrency: a.string().required(), // "USD"
      groupId: a.id(),
      group: a.belongsTo("Group", "groupId"),
      orders: a.hasMany("OrderProduct", "productId"),
    }),

    OrderProduct: a.model({
      orderId: a.id().required(),
      order: a.belongsTo("Order", "orderId"),
      productId: a.id().required(),
      product: a.belongsTo("Product", "productId"),
    }),

    Group: a.model({
      name: a.string().required(),
      type: a.string(),
      products: a.hasMany("Product", "groupId"),
    }),
  })
  .authorization((allow) => [allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
