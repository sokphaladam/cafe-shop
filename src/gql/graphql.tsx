import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AddonInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AddonProduct = {
  __typename?: 'AddonProduct';
  id?: Maybe<Scalars['Int']['output']>;
  isRequired?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Brand = {
  __typename?: 'Brand';
  id?: Maybe<Scalars['Int']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type BrandInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemInput = {
  addons?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  skuId?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  root?: Maybe<Scalars['Int']['output']>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  root?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeOrderInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  itemStatus?: InputMaybe<StatusOrderItem>;
  orderId: Scalars['Int']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusOrder>;
};

export type FilterProduct = {
  category?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isLowStock?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Array<InputMaybe<Type_Product>>>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Integrate = {
  __typename?: 'Integrate';
  id?: Maybe<Scalars['Int']['output']>;
  integrate?: Maybe<Product>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['String']['output']>;
};

export type IntegrateInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  integrateId?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrderItem?: Maybe<Scalars['Boolean']['output']>;
  changeOrderStatus?: Maybe<Scalars['Boolean']['output']>;
  createBrand?: Maybe<Scalars['Boolean']['output']>;
  createCategory?: Maybe<Scalars['Boolean']['output']>;
  createOrder?: Maybe<Scalars['Boolean']['output']>;
  createProduct?: Maybe<Scalars['Boolean']['output']>;
  createProductStock?: Maybe<Scalars['Boolean']['output']>;
  decreaseOrderItem?: Maybe<Scalars['Boolean']['output']>;
  generateTokenOrder?: Maybe<Scalars['String']['output']>;
  increaseOrderItem?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  markOrderItemStatus?: Maybe<Scalars['Boolean']['output']>;
  testSubscription?: Maybe<Scalars['Boolean']['output']>;
  updateBrand?: Maybe<Scalars['Boolean']['output']>;
  updateCategory?: Maybe<Scalars['Boolean']['output']>;
  updateProduct?: Maybe<Scalars['Boolean']['output']>;
  updateProductStock?: Maybe<Scalars['Boolean']['output']>;
  updateSetting?: Maybe<Scalars['Boolean']['output']>;
  verifyOtpOrder?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddOrderItemArgs = {
  data?: InputMaybe<CartItemInput>;
  orderId: Scalars['Int']['input'];
};


export type MutationChangeOrderStatusArgs = {
  data?: InputMaybe<ChangeOrderInput>;
};


export type MutationCreateBrandArgs = {
  data?: InputMaybe<BrandInput>;
};


export type MutationCreateCategoryArgs = {
  data?: InputMaybe<CategoryInput>;
};


export type MutationCreateOrderArgs = {
  data?: InputMaybe<OrderInput>;
};


export type MutationCreateProductArgs = {
  data?: InputMaybe<ProductInput>;
};


export type MutationCreateProductStockArgs = {
  data?: InputMaybe<ProductStockInput>;
};


export type MutationDecreaseOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationGenerateTokenOrderArgs = {
  set: Scalars['Int']['input'];
};


export type MutationIncreaseOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationMarkOrderItemStatusArgs = {
  id: Scalars['Int']['input'];
  status?: InputMaybe<StatusOrderItem>;
};


export type MutationTestSubscriptionArgs = {
  str?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBrandArgs = {
  data?: InputMaybe<BrandInput>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateCategoryArgs = {
  data?: InputMaybe<CategoryInput>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateProductArgs = {
  data?: InputMaybe<ProductInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateProductStockArgs = {
  data?: InputMaybe<ProductStockInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateSettingArgs = {
  option?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyOtpOrderArgs = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<OrderItem>>>;
  log?: Maybe<Array<Maybe<OrderLog>>>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['String']['output']>;
  set?: Maybe<Scalars['String']['output']>;
  status?: Maybe<StatusOrder>;
  total?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vat?: Maybe<Scalars['String']['output']>;
};

export type OrderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  carts?: InputMaybe<Array<InputMaybe<CartItemInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  addons?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
  remark?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Sku>;
  status?: Maybe<StatusOrderItem>;
};

export type OrderLog = {
  __typename?: 'OrderLog';
  by?: Maybe<User>;
  date?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export enum OrderViewBy {
  Admin = 'ADMIN',
  Kitchen = 'KITCHEN',
  User = 'USER'
}

export type Product = {
  __typename?: 'Product';
  addons?: Maybe<Array<Maybe<AddonProduct>>>;
  category?: Maybe<Category>;
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Scalars['String']['output']>;
  integrates?: Maybe<Array<Maybe<Integrate>>>;
  sku?: Maybe<Array<Maybe<Sku>>>;
  stockAlter?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Array<Maybe<Type_Product>>>;
};

export type ProductInput = {
  addons?: InputMaybe<Array<InputMaybe<AddonInput>>>;
  category?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Scalars['String']['input']>;
  integrate?: InputMaybe<Array<InputMaybe<IntegrateInput>>>;
  sku?: InputMaybe<Array<InputMaybe<SkuInput>>>;
  stockAlter?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<Type_Product>>>;
};

export type ProductStock = {
  __typename?: 'ProductStock';
  id?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
};

export type ProductStockInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  brand?: Maybe<Brand>;
  brandList?: Maybe<Array<Maybe<Brand>>>;
  category?: Maybe<Category>;
  categoryList?: Maybe<Scalars['JSON']['output']>;
  me?: Maybe<User>;
  order?: Maybe<Order>;
  orderList?: Maybe<Array<Maybe<Order>>>;
  product?: Maybe<Product>;
  productList?: Maybe<Array<Maybe<Product>>>;
  productStock?: Maybe<ProductStock>;
  productStockList?: Maybe<Array<Maybe<ProductStock>>>;
  settingList?: Maybe<Array<Maybe<Setting>>>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
};


export type QueryBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBrandListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<InputMaybe<StatusOrder>>>;
  viewBy?: InputMaybe<OrderViewBy>;
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductListArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductStockArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductStockListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Sku = {
  __typename?: 'SKU';
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type SkuInput = {
  discount?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type Setting = {
  __typename?: 'Setting';
  option?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export enum StatusOrder {
  Cancelled = 'CANCELLED',
  Checkout = 'CHECKOUT',
  Delivery = 'DELIVERY',
  Pending = 'PENDING',
  Verify = 'VERIFY'
}

export enum StatusOrderItem {
  Completed = 'COMPLETED',
  Deleted = 'DELETED',
  Making = 'MAKING',
  OutOfStock = 'OUT_OF_STOCK',
  Pending = 'PENDING',
  RequestChange = 'REQUEST_CHANGE'
}

export type Subscription = {
  __typename?: 'Subscription';
  newOrderPending?: Maybe<Scalars['String']['output']>;
  orderSubscript?: Maybe<Scalars['JSON']['output']>;
};


export type SubscriptionNewOrderPendingArgs = {
  channel?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOrderSubscriptArgs = {
  channel?: InputMaybe<Scalars['String']['input']>;
};

export enum Type_Product {
  Addon = 'ADDON',
  Free = 'FREE',
  Freezing = 'FREEZING',
  Production = 'PRODUCTION',
  Raw = 'RAW',
  SecondHand = 'SECOND_HAND'
}

export type User = {
  __typename?: 'User';
  contact?: Maybe<Scalars['String']['output']>;
  createdDate?: Maybe<Scalars['String']['output']>;
  display?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  role?: Maybe<Role>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type CreateProductMutationVariables = Exact<{
  data?: InputMaybe<ProductInput>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: boolean | null };

export type UpdateProductMutationVariables = Exact<{
  updateProductId: Scalars['Int']['input'];
  data?: InputMaybe<ProductInput>;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: boolean | null };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryId: Scalars['Int']['input'];
  data?: InputMaybe<CategoryInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: boolean | null };

export type CreateCategoryMutationVariables = Exact<{
  data?: InputMaybe<CategoryInput>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: boolean | null };

export type CreateOrderMutationVariables = Exact<{
  data?: InputMaybe<OrderInput>;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: boolean | null };

export type AddOrderItemMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  data?: InputMaybe<CartItemInput>;
}>;


export type AddOrderItemMutation = { __typename?: 'Mutation', addOrderItem?: boolean | null };

export type MarkOrderItemStatusMutationVariables = Exact<{
  markOrderItemStatusId: Scalars['Int']['input'];
  status?: InputMaybe<StatusOrderItem>;
}>;


export type MarkOrderItemStatusMutation = { __typename?: 'Mutation', markOrderItemStatus?: boolean | null };

export type IncreaseOrderItemMutationVariables = Exact<{
  increaseOrderItemId: Scalars['Int']['input'];
}>;


export type IncreaseOrderItemMutation = { __typename?: 'Mutation', increaseOrderItem?: boolean | null };

export type DecreaseOrderItemMutationVariables = Exact<{
  decreaseOrderItemId: Scalars['Int']['input'];
}>;


export type DecreaseOrderItemMutation = { __typename?: 'Mutation', decreaseOrderItem?: boolean | null };

export type ChangeOrderStatusMutationVariables = Exact<{
  data?: InputMaybe<ChangeOrderInput>;
}>;


export type ChangeOrderStatusMutation = { __typename?: 'Mutation', changeOrderStatus?: boolean | null };

export type GenerateTokenOrderMutationVariables = Exact<{
  set: Scalars['Int']['input'];
}>;


export type GenerateTokenOrderMutation = { __typename?: 'Mutation', generateTokenOrder?: string | null };

export type VerifyOtpOrderMutationVariables = Exact<{
  token: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type VerifyOtpOrderMutation = { __typename?: 'Mutation', verifyOtpOrder?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, display?: string | null, contact?: string | null, gender?: string | null, createdDate?: string | null, role?: { __typename?: 'Role', id?: number | null, name?: string | null } | null } | null };

export type ProductListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
}>;


export type ProductListQuery = { __typename?: 'Query', productList?: Array<{ __typename?: 'Product', id?: number | null, title?: string | null, description?: string | null, type?: Array<Type_Product | null> | null, code?: string | null, images?: string | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null, sku?: Array<{ __typename?: 'SKU', id?: number | null, name?: string | null, price?: number | null, discount?: number | null, unit?: string | null } | null> | null, addons?: Array<{ __typename?: 'AddonProduct', value?: string | null, name?: string | null, isRequired?: boolean | null, id?: number | null } | null> | null } | null> | null };

export type ProductQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id?: number | null, title?: string | null, description?: string | null, type?: Array<Type_Product | null> | null, stockAlter?: number | null, code?: string | null, images?: string | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null, sku?: Array<{ __typename?: 'SKU', id?: number | null, name?: string | null, price?: number | null, discount?: number | null, unit?: string | null } | null> | null, integrates?: Array<{ __typename?: 'Integrate', qty?: string | null, id?: number | null, product?: { __typename?: 'Product', title?: string | null, images?: string | null, id?: number | null } | null, integrate?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null } | null } | null> | null, addons?: Array<{ __typename?: 'AddonProduct', value?: string | null, name?: string | null, isRequired?: boolean | null, id?: number | null } | null> | null } | null };

export type CategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryListQuery = { __typename?: 'Query', categoryList?: any | null };

export type CategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null };

export type OrderListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  viewBy?: InputMaybe<OrderViewBy>;
  status?: InputMaybe<Array<InputMaybe<StatusOrder>> | InputMaybe<StatusOrder>>;
  orderId?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrderListQuery = { __typename?: 'Query', orderList?: Array<{ __typename?: 'Order', id?: number | null, code?: string | null, status?: StatusOrder | null, name?: string | null, paid?: string | null, set?: string | null, total?: string | null, uuid?: string | null, note?: string | null, vat?: string | null, items?: Array<{ __typename?: 'OrderItem', id?: number | null, price?: number | null, qty?: number | null, discount?: number | null, addons?: string | null, remark?: string | null, status?: StatusOrderItem | null, product?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null, code?: string | null } | null, sku?: { __typename?: 'SKU', name?: string | null } | null } | null> | null, log?: Array<{ __typename?: 'OrderLog', date?: string | null, text?: string | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null } | null> | null };

export type OrderQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id?: number | null, address?: string | null, status?: StatusOrder | null, name?: string | null, paid?: string | null, set?: string | null, total?: string | null, uuid?: string | null, note?: string | null, code?: string | null, vat?: string | null, log?: Array<{ __typename?: 'OrderLog', date?: string | null, text?: string | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null, items?: Array<{ __typename?: 'OrderItem', id?: number | null, qty?: number | null, price?: number | null, discount?: number | null, status?: StatusOrderItem | null, addons?: string | null, remark?: string | null, sku?: { __typename?: 'SKU', price?: number | null, discount?: number | null, id?: number | null, unit?: string | null, name?: string | null } | null, product?: { __typename?: 'Product', title?: string | null, images?: string | null, code?: string | null, description?: string | null, id?: number | null } | null } | null> | null } | null };

export type SettingListQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingListQuery = { __typename?: 'Query', settingList?: Array<{ __typename?: 'Setting', value?: string | null, type?: string | null, option?: string | null } | null> | null };

export type SubscriptionLoadSubscriptionVariables = Exact<{
  channel?: InputMaybe<Scalars['String']['input']>;
}>;


export type SubscriptionLoadSubscription = { __typename?: 'Subscription', newOrderPending?: string | null };

export type OrderSubscriptSubscriptionVariables = Exact<{
  channel?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrderSubscriptSubscription = { __typename?: 'Subscription', orderSubscript?: any | null };


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($data: ProductInput) {
  createProduct(data: $data)
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($updateProductId: Int!, $data: ProductInput) {
  updateProduct(id: $updateProductId, data: $data)
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductId: // value for 'updateProductId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryId: Int!, $data: CategoryInput, $isActive: Boolean) {
  updateCategory(id: $updateCategoryId, data: $data, isActive: $isActive)
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryId: // value for 'updateCategoryId'
 *      data: // value for 'data'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($data: CategoryInput) {
  createCategory(data: $data)
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($data: OrderInput) {
  createOrder(data: $data)
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const AddOrderItemDocument = gql`
    mutation addOrderItem($orderId: Int!, $data: CartItemInput) {
  addOrderItem(orderId: $orderId, data: $data)
}
    `;
export type AddOrderItemMutationFn = Apollo.MutationFunction<AddOrderItemMutation, AddOrderItemMutationVariables>;

/**
 * __useAddOrderItemMutation__
 *
 * To run a mutation, you first call `useAddOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrderItemMutation, { data, loading, error }] = useAddOrderItemMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<AddOrderItemMutation, AddOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrderItemMutation, AddOrderItemMutationVariables>(AddOrderItemDocument, options);
      }
export type AddOrderItemMutationHookResult = ReturnType<typeof useAddOrderItemMutation>;
export type AddOrderItemMutationResult = Apollo.MutationResult<AddOrderItemMutation>;
export type AddOrderItemMutationOptions = Apollo.BaseMutationOptions<AddOrderItemMutation, AddOrderItemMutationVariables>;
export const MarkOrderItemStatusDocument = gql`
    mutation markOrderItemStatus($markOrderItemStatusId: Int!, $status: StatusOrderItem) {
  markOrderItemStatus(id: $markOrderItemStatusId, status: $status)
}
    `;
export type MarkOrderItemStatusMutationFn = Apollo.MutationFunction<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>;

/**
 * __useMarkOrderItemStatusMutation__
 *
 * To run a mutation, you first call `useMarkOrderItemStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkOrderItemStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markOrderItemStatusMutation, { data, loading, error }] = useMarkOrderItemStatusMutation({
 *   variables: {
 *      markOrderItemStatusId: // value for 'markOrderItemStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useMarkOrderItemStatusMutation(baseOptions?: Apollo.MutationHookOptions<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>(MarkOrderItemStatusDocument, options);
      }
export type MarkOrderItemStatusMutationHookResult = ReturnType<typeof useMarkOrderItemStatusMutation>;
export type MarkOrderItemStatusMutationResult = Apollo.MutationResult<MarkOrderItemStatusMutation>;
export type MarkOrderItemStatusMutationOptions = Apollo.BaseMutationOptions<MarkOrderItemStatusMutation, MarkOrderItemStatusMutationVariables>;
export const IncreaseOrderItemDocument = gql`
    mutation increaseOrderItem($increaseOrderItemId: Int!) {
  increaseOrderItem(id: $increaseOrderItemId)
}
    `;
export type IncreaseOrderItemMutationFn = Apollo.MutationFunction<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>;

/**
 * __useIncreaseOrderItemMutation__
 *
 * To run a mutation, you first call `useIncreaseOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreaseOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increaseOrderItemMutation, { data, loading, error }] = useIncreaseOrderItemMutation({
 *   variables: {
 *      increaseOrderItemId: // value for 'increaseOrderItemId'
 *   },
 * });
 */
export function useIncreaseOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>(IncreaseOrderItemDocument, options);
      }
export type IncreaseOrderItemMutationHookResult = ReturnType<typeof useIncreaseOrderItemMutation>;
export type IncreaseOrderItemMutationResult = Apollo.MutationResult<IncreaseOrderItemMutation>;
export type IncreaseOrderItemMutationOptions = Apollo.BaseMutationOptions<IncreaseOrderItemMutation, IncreaseOrderItemMutationVariables>;
export const DecreaseOrderItemDocument = gql`
    mutation decreaseOrderItem($decreaseOrderItemId: Int!) {
  decreaseOrderItem(id: $decreaseOrderItemId)
}
    `;
export type DecreaseOrderItemMutationFn = Apollo.MutationFunction<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>;

/**
 * __useDecreaseOrderItemMutation__
 *
 * To run a mutation, you first call `useDecreaseOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecreaseOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decreaseOrderItemMutation, { data, loading, error }] = useDecreaseOrderItemMutation({
 *   variables: {
 *      decreaseOrderItemId: // value for 'decreaseOrderItemId'
 *   },
 * });
 */
export function useDecreaseOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>(DecreaseOrderItemDocument, options);
      }
export type DecreaseOrderItemMutationHookResult = ReturnType<typeof useDecreaseOrderItemMutation>;
export type DecreaseOrderItemMutationResult = Apollo.MutationResult<DecreaseOrderItemMutation>;
export type DecreaseOrderItemMutationOptions = Apollo.BaseMutationOptions<DecreaseOrderItemMutation, DecreaseOrderItemMutationVariables>;
export const ChangeOrderStatusDocument = gql`
    mutation changeOrderStatus($data: ChangeOrderInput) {
  changeOrderStatus(data: $data)
}
    `;
export type ChangeOrderStatusMutationFn = Apollo.MutationFunction<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;

/**
 * __useChangeOrderStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderStatusMutation, { data, loading, error }] = useChangeOrderStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>(ChangeOrderStatusDocument, options);
      }
export type ChangeOrderStatusMutationHookResult = ReturnType<typeof useChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationResult = Apollo.MutationResult<ChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;
export const GenerateTokenOrderDocument = gql`
    mutation generateTokenOrder($set: Int!) {
  generateTokenOrder(set: $set)
}
    `;
export type GenerateTokenOrderMutationFn = Apollo.MutationFunction<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>;

/**
 * __useGenerateTokenOrderMutation__
 *
 * To run a mutation, you first call `useGenerateTokenOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTokenOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTokenOrderMutation, { data, loading, error }] = useGenerateTokenOrderMutation({
 *   variables: {
 *      set: // value for 'set'
 *   },
 * });
 */
export function useGenerateTokenOrderMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>(GenerateTokenOrderDocument, options);
      }
export type GenerateTokenOrderMutationHookResult = ReturnType<typeof useGenerateTokenOrderMutation>;
export type GenerateTokenOrderMutationResult = Apollo.MutationResult<GenerateTokenOrderMutation>;
export type GenerateTokenOrderMutationOptions = Apollo.BaseMutationOptions<GenerateTokenOrderMutation, GenerateTokenOrderMutationVariables>;
export const VerifyOtpOrderDocument = gql`
    mutation verifyOtpOrder($token: String!, $code: String!) {
  verifyOtpOrder(token: $token, code: $code)
}
    `;
export type VerifyOtpOrderMutationFn = Apollo.MutationFunction<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>;

/**
 * __useVerifyOtpOrderMutation__
 *
 * To run a mutation, you first call `useVerifyOtpOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpOrderMutation, { data, loading, error }] = useVerifyOtpOrderMutation({
 *   variables: {
 *      token: // value for 'token'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyOtpOrderMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>(VerifyOtpOrderDocument, options);
      }
export type VerifyOtpOrderMutationHookResult = ReturnType<typeof useVerifyOtpOrderMutation>;
export type VerifyOtpOrderMutationResult = Apollo.MutationResult<VerifyOtpOrderMutation>;
export type VerifyOtpOrderMutationOptions = Apollo.BaseMutationOptions<VerifyOtpOrderMutation, VerifyOtpOrderMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    display
    contact
    gender
    role {
      id
      name
    }
    createdDate
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductListDocument = gql`
    query ProductList($offset: Int, $limit: Int, $code: String, $filter: FilterProduct) {
  productList(offset: $offset, limit: $limit, code: $code, filter: $filter) {
    id
    title
    description
    type
    category {
      id
      name
      root
    }
    sku {
      id
      name
      price
      discount
      unit
    }
    code
    images
    addons {
      value
      name
      isRequired
      id
    }
  }
}
    `;

/**
 * __useProductListQuery__
 *
 * To run a query within a React component, call `useProductListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      code: // value for 'code'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProductListQuery(baseOptions?: Apollo.QueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
      }
export function useProductListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
        }
export function useProductListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
        }
export type ProductListQueryHookResult = ReturnType<typeof useProductListQuery>;
export type ProductListLazyQueryHookResult = ReturnType<typeof useProductListLazyQuery>;
export type ProductListSuspenseQueryHookResult = ReturnType<typeof useProductListSuspenseQuery>;
export type ProductListQueryResult = Apollo.QueryResult<ProductListQuery, ProductListQueryVariables>;
export const ProductDocument = gql`
    query product($productId: Int!) {
  product(id: $productId) {
    id
    title
    description
    type
    stockAlter
    category {
      id
      name
      root
    }
    sku {
      id
      name
      price
      discount
      unit
    }
    code
    images
    integrates {
      qty
      product {
        title
        images
        id
      }
      integrate {
        id
        images
        title
      }
      id
    }
    addons {
      value
      name
      isRequired
      id
    }
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const CategoryListDocument = gql`
    query categoryList {
  categoryList
}
    `;

/**
 * __useCategoryListQuery__
 *
 * To run a query within a React component, call `useCategoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryListQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoryListQuery(baseOptions?: Apollo.QueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
      }
export function useCategoryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
        }
export function useCategoryListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
        }
export type CategoryListQueryHookResult = ReturnType<typeof useCategoryListQuery>;
export type CategoryListLazyQueryHookResult = ReturnType<typeof useCategoryListLazyQuery>;
export type CategoryListSuspenseQueryHookResult = ReturnType<typeof useCategoryListSuspenseQuery>;
export type CategoryListQueryResult = Apollo.QueryResult<CategoryListQuery, CategoryListQueryVariables>;
export const CategoryDocument = gql`
    query category($categoryId: Int!) {
  category(id: $categoryId) {
    id
    name
    root
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables> & ({ variables: CategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export function useCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategorySuspenseQueryHookResult = ReturnType<typeof useCategorySuspenseQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const OrderListDocument = gql`
    query orderList($offset: Int, $limit: Int, $viewBy: OrderViewBy, $status: [StatusOrder], $orderId: String) {
  orderList(
    offset: $offset
    limit: $limit
    viewBy: $viewBy
    status: $status
    orderId: $orderId
  ) {
    id
    code
    items {
      id
      price
      product {
        id
        images
        title
        code
      }
      qty
      discount
      addons
      remark
      sku {
        name
      }
      status
    }
    status
    name
    paid
    set
    total
    uuid
    note
    vat
    log {
      date
      text
      by {
        id
        display
      }
    }
  }
}
    `;

/**
 * __useOrderListQuery__
 *
 * To run a query within a React component, call `useOrderListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      viewBy: // value for 'viewBy'
 *      status: // value for 'status'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderListQuery(baseOptions?: Apollo.QueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
      }
export function useOrderListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
        }
export function useOrderListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
        }
export type OrderListQueryHookResult = ReturnType<typeof useOrderListQuery>;
export type OrderListLazyQueryHookResult = ReturnType<typeof useOrderListLazyQuery>;
export type OrderListSuspenseQueryHookResult = ReturnType<typeof useOrderListSuspenseQuery>;
export type OrderListQueryResult = Apollo.QueryResult<OrderListQuery, OrderListQueryVariables>;
export const OrderDocument = gql`
    query order($token: String, $orderId: Int) {
  order(token: $token, id: $orderId) {
    id
    address
    status
    name
    paid
    set
    total
    uuid
    note
    code
    vat
    log {
      date
      text
      by {
        id
        display
      }
    }
    items {
      id
      qty
      sku {
        price
        discount
        id
        unit
        name
      }
      product {
        title
        images
        code
        description
        id
      }
      price
      discount
      status
      addons
      remark
    }
  }
}
    `;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      token: // value for 'token'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderQuery(baseOptions?: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export function useOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderSuspenseQueryHookResult = ReturnType<typeof useOrderSuspenseQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQuery, OrderQueryVariables>;
export const SettingListDocument = gql`
    query settingList {
  settingList {
    value
    type
    option
  }
}
    `;

/**
 * __useSettingListQuery__
 *
 * To run a query within a React component, call `useSettingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingListQuery(baseOptions?: Apollo.QueryHookOptions<SettingListQuery, SettingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingListQuery, SettingListQueryVariables>(SettingListDocument, options);
      }
export function useSettingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingListQuery, SettingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingListQuery, SettingListQueryVariables>(SettingListDocument, options);
        }
export function useSettingListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SettingListQuery, SettingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SettingListQuery, SettingListQueryVariables>(SettingListDocument, options);
        }
export type SettingListQueryHookResult = ReturnType<typeof useSettingListQuery>;
export type SettingListLazyQueryHookResult = ReturnType<typeof useSettingListLazyQuery>;
export type SettingListSuspenseQueryHookResult = ReturnType<typeof useSettingListSuspenseQuery>;
export type SettingListQueryResult = Apollo.QueryResult<SettingListQuery, SettingListQueryVariables>;
export const SubscriptionLoadDocument = gql`
    subscription subscriptionLoad($channel: String) {
  newOrderPending(channel: $channel)
}
    `;

/**
 * __useSubscriptionLoadSubscription__
 *
 * To run a query within a React component, call `useSubscriptionLoadSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionLoadSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionLoadSubscription({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useSubscriptionLoadSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptionLoadSubscription, SubscriptionLoadSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptionLoadSubscription, SubscriptionLoadSubscriptionVariables>(SubscriptionLoadDocument, options);
      }
export type SubscriptionLoadSubscriptionHookResult = ReturnType<typeof useSubscriptionLoadSubscription>;
export type SubscriptionLoadSubscriptionResult = Apollo.SubscriptionResult<SubscriptionLoadSubscription>;
export const OrderSubscriptDocument = gql`
    subscription orderSubscript($channel: String) {
  orderSubscript(channel: $channel)
}
    `;

/**
 * __useOrderSubscriptSubscription__
 *
 * To run a query within a React component, call `useOrderSubscriptSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderSubscriptSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderSubscriptSubscription({
 *   variables: {
 *      channel: // value for 'channel'
 *   },
 * });
 */
export function useOrderSubscriptSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OrderSubscriptSubscription, OrderSubscriptSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderSubscriptSubscription, OrderSubscriptSubscriptionVariables>(OrderSubscriptDocument, options);
      }
export type OrderSubscriptSubscriptionHookResult = ReturnType<typeof useOrderSubscriptSubscription>;
export type OrderSubscriptSubscriptionResult = Apollo.SubscriptionResult<OrderSubscriptSubscription>;