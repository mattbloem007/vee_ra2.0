import React from 'react'
import {Button, Segment, Divider, Container} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'

export default ({
  handleCheckout,
  estimatedCost
}) => (
  <Container textAlign="center">
    <Divider />
    <Segment clearing size="large">
      <span>
        <strong>Sub total:</strong>
         R{estimatedCost && ` ${estimatedCost.subtotalAmount.amount}`}
      </span>
        <Button color="black" floated="right" onClick={handleCheckout}>
          Checkout
        </Button>
    </Segment>
  </Container>
)
