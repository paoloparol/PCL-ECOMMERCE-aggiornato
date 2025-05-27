export type ProductCategory =
  | 'tazze'
  | 'mugs'
  | 'shots'
  | 'piatti'
  | 'borse'
  | 'accessori';

export type ProductColor =
  | 'bianco'
  | 'verde'
  | 'blu'
  | 'arancione'
  | 'giallo'
  | 'rosa'
  | 'multicolore';

export type ProductSize =
  | 'piccolo'
  | 'medio'
  | 'grande';

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  color: ProductColor;
  size?: ProductSize;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inventory: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
  variants: ProductVariant[];
  images: string[];
  details: string;
  care: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  price: number;
  color: ProductColor;
  size?: ProductSize;
  quantity: number;
  image: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  couponCode?: string;
  discountAmount?: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  address?: Address;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  couponCode?: string;
  discountAmount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxUsage?: number;
  usageCount: number;
  validFrom: Date;
  validTo: Date;
  active: boolean;
}
