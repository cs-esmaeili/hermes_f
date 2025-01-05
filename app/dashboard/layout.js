'use client'

import { Provider } from "react-redux";
import { store } from "@/state/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ThemeToggleButton from "@/components/general/ThemeToggleButton";

export default function Layout({ children }) {

  return (
    <main className="text-ellipsis text-textcolor bg-primary ">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          {children}
        </Provider>
      </GoogleOAuthProvider>
    </main>
  )
}
