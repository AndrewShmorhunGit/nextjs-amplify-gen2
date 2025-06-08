"use client";

import { createContext, useContext, useState, ReactNode, JSX } from "react";

type DialogComponent<Props> = (
  props: Props & { onClose: () => void }
) => JSX.Element;

type DialogOptions<Props> = {
  component: DialogComponent<Props>;
  props: Props;
};

type DialogContextType = {
  openDialog: <Props>(options: DialogOptions<Props>) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogOptions<any> | null>(null);

  const openDialog = <Props,>(options: DialogOptions<Props>) => {
    setDialog(options);
  };

  const closeDialog = () => {
    setDialog(null);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialog && <dialog.component {...dialog.props} onClose={closeDialog} />}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within a DialogProvider");
  return ctx;
}
