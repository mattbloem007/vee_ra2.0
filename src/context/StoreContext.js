import React, { useState, useEffect, useContext } from "react"
import {createStorefrontApiClient} from '@shopify/storefront-api-client';
import { gql, GraphQLClient } from "graphql-request";
import Layout from '../components/layout'
const endpoint = `https://u8chnc-qf.myshopify.com/api/graphql`;


// const client = createStorefrontApiClient({
//   storeDomain: `${process.env.SHOP_NAME}.myshopify.com`,
//   apiVersion: '2024-04',
//   publicAccessToken: process.env.SHOP_TOKEN,
// });
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.GATSBY_SHOP_TOKEN,
    },
  });

// const client = Client.buildClient({
//   storefrontAccessToken: process.env.SHOP_TOKEN,
//   domain: `${process.env.SHOP_NAME}.myshopify.com`,
// })

// const initialStoreState = {
//   //client,
//   isAdding: false,
//   checkout: { lineItems: [] },
// }
//
// const StoreContext = React.createContext({
//   store: initialStoreState,
//   setStore: () => null,
// })

const StoreContext = React.createContext();

const StoreContextProvider = ({ children }) => {
  const [cartId, setCartId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cartId");
    }
    return null;
  });

  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    if (cartId) {
      localStorage.setItem("cartId", cartId);
      fetchCartDetails(cartId); // Fetch cart details if a cart ID exists
    }
  }, [cartId]);

  const fetchCartDetails = async (id) => {
    const fetchCartQuery = gql`
      query cartQuery($cartId: ID!) {
        cart(id: $cartId) {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      description
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
            }
            subtotalAmount {
              amount
            }
            totalTaxAmount {
              amount
            }
          }
        }
      }
    `;

    try {
      const response = await graphQLClient.request(fetchCartQuery, { cartId: id });
      setCartData(response.cart); // Update cart data in state
      return response.cart
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  const addToCart = async (itemId, quantity) => {
  if (!cartId) {
    // Create a new cart if it doesn't exist
    console.log("Creating new cart")
    const createCartMutation = gql`
      mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      cartInput: {
        lines: [
          {
            merchandiseId: itemId,
            quantity: parseInt(quantity),
          },
        ],
      },
    };

    try {
      const response = await graphQLClient.request(createCartMutation, variables);
      const newCart = response.cartCreate.cart;

      if (newCart.id) {
        setCartId(newCart.id); // Save the new cart ID
        setCartData(newCart); // Update cart data with new cart
      }
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  } else {
    // Check if the item is already in the cart
    console.log("old cart", cartId)
    let existingItem;
    if (cartData) {
      existingItem = cartData.lines.edges.find(
       (line) => line.node.merchandise.id === itemId
     );
    }
    else {
      existingItem = null;
    }


    if (existingItem) {
      // If the item exists, update the quantity
      const updateLineMutation = gql`
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        cartId,
        lines: [
          {
            merchandiseId: itemId,
            quantity: parseInt(quantity),
          },
        ],
      };

      try {
        console.log("VARIABLES", variables)
        const response = await graphQLClient.request(updateLineMutation, variables);
        const updatedCart = response.cartLinesAdd.cart;
        setCartData(updatedCart); // Update cart data with the new cart details
        fetchCartDetails(cartId); // Refresh cart details to ensure state consistency
        console.log("Existing item, Updated cart", updatedCart)
      } catch (error) {
        console.error("Error updating cart line:", error);
      }
    } else {
      // Add item to the existing cart
      const addLineMutation = gql`
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        cartId,
        lines: [
          {
            merchandiseId: itemId,
            quantity: parseInt(quantity),
          },
        ],
      };

      try {
        const response = await graphQLClient.request(addLineMutation, variables);
        const updatedCart = response.cartLinesAdd.cart;
        setCartData(updatedCart); // Update cart data with the new cart details
        fetchCartDetails(cartId); // Refresh cart details to ensure state consistency
        console.log("New item, Updated cart", updateCart)
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  }
};

const removeFromCart = async (lineId) => {
  if (!cartId) {
    console.error("No cart ID found. Cannot remove item from cart.");
    return;
  }

  try {
    // Fetch the latest cart details to check for the item's existence
    const latestCart = await fetchCartDetails(cartId);

    // Check if the line ID exists in the cart
    const lineExists = latestCart.lines.edges.some(({ node }) => node.id === lineId);

    if (!lineExists) {
      console.warn("Item does not exist in the cart. No action taken.");
      return;
    }

    // Proceed to remove the line if it exists
    const removeLineMutation = gql`
      mutation removeLine($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                        description
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      cartId,
      lineIds: [lineId],
    };

    const response = await graphQLClient.request(removeLineMutation, variables);
    const updatedCart = response.cartLinesRemove.cart;

    if (updatedCart) {
      setCartData(updatedCart); // Update the cart data with the latest state
      fetchCartDetails(cartId); // Refresh cart details to ensure consistency
      console.log("Item removed successfully. Updated cart:", updatedCart);
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

const updateCart = async (lineId, newQuantity) => {
  if (!cartId) {
    console.error("No cart ID found. Cannot update item quantity.");
    return;
  }

  try {
    // Fetch the latest cart details to check for the item's existence
    const latestCart = await fetchCartDetails(cartId);

    // Check if the line ID exists in the cart
    const lineItem = latestCart.lines.edges.find(({ node }) => node.id === lineId);

    if (!lineItem) {
      console.warn("Item does not exist in the cart. Cannot update.");
      return;
    }

    // Proceed to update the quantity
    const updateLineMutation = gql`
      mutation updateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                        description
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: [
        {
          id: lineId,
          quantity: parseInt(newQuantity),
        },
      ],
    };

    const response = await graphQLClient.request(updateLineMutation, variables);
    const updatedCart = response.cartLinesUpdate.cart;

    if (updatedCart) {
      setCartData(updatedCart); // Update local state with the latest cart data
      fetchCartDetails(cartId); // Refresh the cart to ensure consistency
      console.log("Item quantity updated successfully. Updated cart:", updatedCart);
    }
  } catch (error) {
    console.error("Error updating item in cart:", error);
  }
};

const createCheckoutUrl = async () => {
  if (!cartId) {
    console.error("No cart ID found. Cannot generate checkout URL.");
    return null;
  }

  try {
    const checkoutMutation = gql`
      mutation generateCheckoutUrl($cartId: ID!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: {}) {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;

    const variables = { cartId };

    const response = await graphQLClient.request(checkoutMutation, variables);
    const checkoutUrl = response.cartBuyerIdentityUpdate.cart.checkoutUrl;

    if (checkoutUrl) {
      const returnUrl = encodeURIComponent("https://veera.co.za/cart?checkout=success");
      const finalCheckoutUrl = `${checkoutUrl}&return_to=${returnUrl}`;
      console.log("Checkout URL:", finalCheckoutUrl);
      return finalCheckoutUrl;
    } else {
      console.warn("No checkout URL returned.");
      return null;
    }
  } catch (error) {
    console.error("Error generating checkout URL:", error);
    return null;
  }
};


  return (
    <StoreContext.Provider
      value={{
        cartId,
        setCartId,
        addToCart,
        cartData,
        fetchCartDetails,
        removeFromCart,
        updateCart,
        createCheckoutUrl
      }}
    >
      <Layout>{children}</Layout>
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  return useContext(StoreContext);
};

// export async function addToCart(itemId, quantity) {
//   const createCartMutation = gql`
//     mutation createCart($cartInput: CartInput) {
//     cartCreate(input: $cartInput) {
//       cart {
//         id
//       }
//     }
//   }
//   `
//   const variables = {
//     cartInput: {
//       lines: [
//         {
//           quantity: parseInt(quantity),
//           merchandiseId: itemId,
//         },
//       ],
//     },
//   };
//   try {
//     const cart = await graphQLClient.request(createCartMutation, variables);
//     console.log("Cart", cart)
//     return cart
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
       cartLinesAdd(cartId: $cartId, lines: $lines) {
         cart {
           id
         }
       }
     }
    }
  `;
  const variables = {
    cartId: cartId,
    lines:  [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  }
  try {
   return await graphQLClient.request(updateCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt

        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  }
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
        completedAt
      }
    }
  `;
  const variables = {
    cartId: cartId,
  }
  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};

// function useRemoveItemFromCart() {
//   const {
//     store: { client, checkout },
//     setStore,
//   } = useContext(StoreContext)
//
//   async function removeItemFromCart(itemId) {
//     const newCheckout = await client.checkout.removeLineItems(checkout.id, [
//       itemId,
//     ])
//
//     setStore(prevState => {
//       return { ...prevState, checkout: newCheckout }
//     })
//   }
//
//   return removeItemFromCart
// }
//
// function useCheckout() {
//   const {
//     store: { checkout },
//   } = useContext(StoreContext)
//
//   return () => {
//     window.open(checkout.webUrl)
//   }
// }

 export {
   StoreContextProvider,
//   useAddItemToCart,
//   useStore,
//   useCartCount,
//   useCartItems,
//   useCartTotals,
//   useRemoveItemFromCart,
//   useCheckout,
 }
