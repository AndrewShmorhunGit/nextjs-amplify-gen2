import { a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
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
    products: a.hasMany("Product", "orderId"),
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
    orderId: a.id().required(),
    order: a.belongsTo("Order", "orderId"),
    groupId: a.id(),
    group: a.belongsTo("Group", "groupId"),
  }),

  Group: a.model({
    name: a.string().required(),
    type: a.string(),
    products: a.hasMany("Product", "groupId"),
  }),
});

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
