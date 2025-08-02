/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import 'semantic-ui-css/semantic.min.css'

// Import Google Fonts
import '@fontsource/arsenal-sc/400.css';
import '@fontsource/arsenal-sc/700.css';
import '@fontsource/titillium-web/300.css';
import '@fontsource/titillium-web/400.css';
import '@fontsource/titillium-web/600.css';
import '@fontsource/titillium-web/700.css';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';

import React from "react"
import { StoreContextProvider } from "./src/context/StoreContext"

// Disable Gatsby's scroll restoration
export const shouldUpdateScroll = () => {
  return false;
};

// Scroll to top on route change
export const onRouteUpdate = () => {
  window.scrollTo(0, 0);
};

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
