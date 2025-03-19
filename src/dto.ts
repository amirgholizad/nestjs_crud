export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Cart = {
  id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
