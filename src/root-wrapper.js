import React, {useEffect, useState } from 'react'
import Layout from './components/layout'
import { navigate } from "gatsby"


const VeeRa = (props) => {


  const elementWithProps = React.Children.map(props.element, (child, i) =>
    React.cloneElement(child)
  );

  return (
      <div>
        <Layout>
          {elementWithProps}
        </Layout>
      </div>
  )
}

export default VeeRa
