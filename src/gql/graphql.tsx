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
  id?: InputMaybe<Scalars['Int']['input']>;
  itemStatus?: InputMaybe<StatusOrderItem>;
  orderId: Scalars['Int']['input'];
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
  changeOrderStatus?: Maybe<Scalars['Boolean']['output']>;
  createBrand?: Maybe<Scalars['Boolean']['output']>;
  createCategory?: Maybe<Scalars['Boolean']['output']>;
  createOrder?: Maybe<Scalars['Boolean']['output']>;
  createProduct?: Maybe<Scalars['Boolean']['output']>;
  createProductStock?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  updateBrand?: Maybe<Scalars['Boolean']['output']>;
  updateCategory?: Maybe<Scalars['Boolean']['output']>;
  updateProduct?: Maybe<Scalars['Boolean']['output']>;
  updateProductStock?: Maybe<Scalars['Boolean']['output']>;
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


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<OrderItem>>>;
  name?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['String']['output']>;
  set?: Maybe<Scalars['String']['output']>;
  status?: Maybe<StatusOrder>;
  total?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
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
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  qty?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Sku>;
  status?: Maybe<StatusOrderItem>;
};

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

export enum StatusOrder {
  Checkout = 'CHECKOUT',
  Delivery = 'DELIVERY',
  Pending = 'PENDING',
  Verify = 'VERIFY'
}

export enum StatusOrderItem {
  Completed = 'COMPLETED',
  Making = 'MAKING',
  OutOfStock = 'OUT_OF_STOCK',
  Pending = 'PENDING',
  RequestChange = 'REQUEST_CHANGE'
}

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


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id?: number | null, title?: string | null, description?: string | null, type?: Array<Type_Product | null> | null, code?: string | null, images?: string | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null, sku?: Array<{ __typename?: 'SKU', id?: number | null, name?: string | null, price?: number | null, discount?: number | null, unit?: string | null } | null> | null, addons?: Array<{ __typename?: 'AddonProduct', value?: string | null, name?: string | null, isRequired?: boolean | null, id?: number | null } | null> | null } | null };

export type CategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryListQuery = { __typename?: 'Query', categoryList?: any | null };

export type CategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id?: number | null, name?: string | null, root?: number | null } | null };


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