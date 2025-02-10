/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { StoreContextProvider } from "./src/context/StoreContext"
export const wrapRootElement = ({ element }) => (
  <StoreContextProvider>{element}</StoreContextProvider>
)

// import "react-responsive-carousel/lib/styles/carousel.min.css";
//
// import VeeRa from './src/root-wrapper'
// import React from 'react'
//
// const Wrapper = ({ element }) => {
//   return <VeeRa element={element} />
// }
//
// export const wrapPageElement = Wrapper
