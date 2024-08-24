import React, { ReactNode } from "react"
import { ToastContainer, toast } from "react-toastify"
import { ThirdwebProvider } from "thirdweb/react"

import "react-toastify/dist/ReactToastify.css"

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThirdwebProvider>
      {children}
      <ToastContainer theme="dark" position="top-right" autoClose={5000} />
    </ThirdwebProvider>
  )
}

export default Provider
