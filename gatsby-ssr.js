/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { StoreContextProvider } from "./src/context/StoreContext"
import { BrewGuideProvider } from "./src/context/BrewGuideContext"

export function onRenderBody({ setHeadComponents}) {
 setHeadComponents([
    <script
     dangerouslySetInnerHTML={{
        __html:`
        window.omnisend = window.omnisend || [];
        omnisend.push(["brandID", "68adb36ae29629b6049e49bf"]);
        omnisend.push(["track", "$pageViewed"]);
        !function(){var e=document.createElement("script");
        e.type="text/javascript",e.async=!0,
        e.src="https://omnisnippet1.com/inshop/launcher-v2.js";
        var t=document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e,t)}();
   	 `
     }}
     />
  ])
}
export const wrapRootElement = ({ element }) => (
  <StoreContextProvider>
    <BrewGuideProvider>
      {element}
    </BrewGuideProvider>
  </StoreContextProvider>
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
