"use client";
import { Provider } from "react-redux";
import { setupStore } from "./store";

const store = setupStore();

export default function ReduxProviders({ children }: { children: any }) {
  return <Provider store={store}>{children}</Provider>;
}
