import React from 'react'
import {Button, Segment, Divider} from 'semantic-ui-react'

export default ({
  handleCheckout,
  estimatedCost
}) => (
  <div>
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
  </div>
)
