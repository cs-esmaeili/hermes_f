'use client'

import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function Layout({ children }) {

  return (
    <main className="text-ellipsis text-textcolor">
      <Provider store={store}>
        {children}
      </Provider>
    </main>
  )
}
