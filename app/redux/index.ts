"use client";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";

import { setModal } from "app/redux/features/modal/modal.slice";
import {
  increment,
  decrement,
  setCount,
} from "app/redux/features/counter/counter.slice";
import {
  selectNav,
  unselectNav,
  toggleNav,
} from "app/redux/features/navigation/navigation.slice";
import { productsToggle } from "app/redux/features/products/products.slice";
import { setGroup } from "app/redux/features/groups/groups.slice";
export {
  useAppSelector as useSelector,
  setModal,
  increment,
  setCount,
  decrement,
  selectNav,
  unselectNav,
  toggleNav,
  productsToggle,
  setGroup,
  useAppDispatch,
};
