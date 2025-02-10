import React from 'react'
import {Link} from 'gatsby'
import {Item, Button, Loader, Message} from 'semantic-ui-react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default ({items, removeFromCart, loading, completed, cartId, updateCart}) => {

  console.log("ITEMS", items)

  const handleQuantityChange = (id, e) => {
    console.log("ID", e, id)
    const newQuantity = e.target.value;
    console.log("quantity change", newQuantity)
    if (newQuantity >= 0) {
      updateCart(id, newQuantity); // Function to update the quantity
    }
  };

  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message success>
        <Message.Header>Your placed!</Message.Header>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </Message>
    )

  if (items === null || items.lines.edges.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You will need to add some items to the cart before you can checkout.
        </p>
      </Message>
    )
  const mapCartItemsToItems = items =>
    items.lines.edges.map((node) => {
      console.log("merch", node.node)
      const id = node.node.id
      const size = node.node.merchandise.title
      const name = node.node.merchandise.product.title
      const product_id = node.node.merchandise.product.id
      const quantity = node.node.quantity
      const price = node.node.merchandise.id || ''
      const imageUrl = node.node.merchandise.product.images.edges[0].node.url || ''

      return {
        childKey: id,
        header: (
          <Item.Header>
            <Link to={`/product/${name}/`}>{name}</Link>
          </Item.Header>
        ),
        image: (
          <div style={{padding: 1, border: "2px solid gray", width: "10%", height: "100%", marginRight: "20px"}}>
            <img src={imageUrl} />
          </div>
        ),
        meta: `${quantity}x ${name}`,
        description: size,
        extra: (
          <div className="cart-item-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', float: "right"}}>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(id, e)}
              min="0"
              style={{
                width: '50px',
                textAlign: 'center',
                marginRight: '10px',
                padding: '5px',
              }}
            />

            <button className="ui basic icon right floated button" onClick={() => removeFromCart(id)}>
              <AiOutlineClose />
            </button>
          </div>
        ),
      }
    })
  return <Item.Group divided items={mapCartItemsToItems(items)} />
}
