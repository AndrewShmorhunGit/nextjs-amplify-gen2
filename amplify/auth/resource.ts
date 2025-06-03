import { defineAuth } from "@aws-amplify/backend";
import { preSignUp } from "./pre-signup/resource";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    preSignUp,
  },
  userAttributes: {
    preferredUsername: { required: true },
  },
  access: (allow) => [allow.resource(preSignUp).to(["listUsers"])],
});
