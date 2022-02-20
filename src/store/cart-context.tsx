import { createContext, useState, useEffect } from 'react';

const CartContext = createContext({
  products: [] as any[],
  totalProducts: 0,
  totalPrice: 0,
  addProduct: (product: any): any => {},
  removeProduct: (productId: string): any => {},
  incrementAmount: (productId: string): any => {},
  decrementAmount: (productId: string): any => {},
});

type Prop = {
  children?: JSX.Element;
};
type CartItem = {
  id: string;
  sku: string;
  catalog: string;
  discount: number;
  images: string[];
  price: number;
  title: string;
  amount: number;
};
export function CartContextProvider(props: Prop) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const productsData = JSON.parse(localStorage.getItem('items') || '[]');
    if (productsData) {
      setCartItems(productsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(cartItems));
  }, [cartItems]);

  function addProductHandler(cartItem: CartItem) {
    setCartItems((prev) => {
      const itemIsInCart = prev.find((item) => item.id === cartItem.id);
      if (itemIsInCart) {
        return prev.map((item) =>
          item.id === cartItem.id
            ? { ...item, amount: item.amount + cartItem.amount }
            : item
        );
      }
      return [...prev, { ...cartItem, amount: cartItem.amount }];
    });
  }
  function removeProductHandler(productId: string) {
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== productId);
    });
  }
  function getTotalProductsHandler(): number {
    return cartItems.reduce((ack: number, item) => ack + item.amount, 0);
  }
  function getTotalPriceHandler() {
    return cartItems.reduce(
      (ack: number, item) =>
        item.discount === 0
          ? ack + item.price * item.amount
          : ack + item.amount * (item.price - item.discount * item.price),
      0
    );
  }
  const handleIncrement = (productId: string) => {
    setCartItems((prev) => {
      return prev.map((item) =>
        item.id === productId ? { ...item, amount: item.amount + 1 } : item
      );
    });
  };
  const handleDecrement = (productId: string) => {
    setCartItems((prev) => {
      return prev.map((item) =>
        item.id === productId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      );
    });
  };
  const context = {
    products: cartItems,
    totalProducts: getTotalProductsHandler(),
    totalPrice: getTotalPriceHandler(),
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
    incrementAmount: handleIncrement,
    decrementAmount: handleDecrement,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}
export default CartContext;
