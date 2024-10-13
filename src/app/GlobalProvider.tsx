"use client";
import { store } from "./../../redux/store";
import { Provider } from 'react-redux'
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";


export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Toaster />
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    
    </>
  );
}
