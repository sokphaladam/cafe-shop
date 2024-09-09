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

export type Attendance = {
  __typename?: 'Attendance';
  checkDate?: Maybe<Scalars['String']['output']>;
  checkIn?: Maybe<Scalars['String']['output']>;
  checkOut?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  overTimeIn?: Maybe<Scalars['String']['output']>;
  overTimeOut?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type BankInfo = {
  __typename?: 'BankInfo';
  createdDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedDate?: Maybe<Scalars['String']['output']>;
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
  bankId?: InputMaybe<Scalars['Int']['input']>;
  bankType?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  deliverPickupCode?: InputMaybe<Scalars['String']['input']>;
  deliverPickupId?: InputMaybe<Scalars['Int']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  invoice?: InputMaybe<Scalars['Int']['input']>;
  itemStatus?: InputMaybe<StatusOrderItem>;
  orderId: Scalars['Int']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusOrder>;
};

export type CurrencyShift = {
  __typename?: 'CurrencyShift';
  khr?: Maybe<Scalars['Float']['output']>;
  usd?: Maybe<Scalars['Float']['output']>;
};

export type CurrencyShiftInput = {
  khr?: InputMaybe<Scalars['Float']['input']>;
  usd?: InputMaybe<Scalars['Float']['input']>;
};

export type Delivery = {
  __typename?: 'Delivery';
  contact?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type DeliveryInput = {
  contact?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  addDiscountOrder?: Maybe<Scalars['Boolean']['output']>;
  addOrderItem?: Maybe<Scalars['Boolean']['output']>;
  changeOrderStatus?: Maybe<Scalars['Boolean']['output']>;
  checkAttendance?: Maybe<Scalars['Boolean']['output']>;
  createBank?: Maybe<Scalars['Boolean']['output']>;
  createBrand?: Maybe<Scalars['Boolean']['output']>;
  createCategory?: Maybe<Scalars['Boolean']['output']>;
  createDelivery?: Maybe<Scalars['Boolean']['output']>;
  createOrder?: Maybe<Scalars['Boolean']['output']>;
  createPosition?: Maybe<Scalars['Boolean']['output']>;
  createProduct?: Maybe<Scalars['Boolean']['output']>;
  createProductStock?: Maybe<Scalars['Boolean']['output']>;
  createShift?: Maybe<Scalars['Boolean']['output']>;
  createUser?: Maybe<Scalars['Boolean']['output']>;
  decreaseOrderItem?: Maybe<Scalars['Boolean']['output']>;
  generateTableSet?: Maybe<Scalars['Boolean']['output']>;
  generateTokenOrder?: Maybe<Scalars['String']['output']>;
  increaseOrderItem?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  markOrderItemStatus?: Maybe<Scalars['Boolean']['output']>;
  peopleInOrder?: Maybe<Scalars['Boolean']['output']>;
  signatureOrder?: Maybe<Scalars['Boolean']['output']>;
  testSubscription?: Maybe<Scalars['Boolean']['output']>;
  updateBank?: Maybe<Scalars['Boolean']['output']>;
  updateBrand?: Maybe<Scalars['Boolean']['output']>;
  updateCategory?: Maybe<Scalars['Boolean']['output']>;
  updateDelivery?: Maybe<Scalars['Boolean']['output']>;
  updatePosition?: Maybe<Scalars['Boolean']['output']>;
  updateProduct?: Maybe<Scalars['Boolean']['output']>;
  updateProductStock?: Maybe<Scalars['Boolean']['output']>;
  updateSetting?: Maybe<Scalars['Boolean']['output']>;
  updateShift?: Maybe<Scalars['Boolean']['output']>;
  updateUser?: Maybe<Scalars['Boolean']['output']>;
  verifyOtpOrder?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddDiscountOrderArgs = {
  discount: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
};


export type MutationAddOrderItemArgs = {
  data?: InputMaybe<CartItemInput>;
  orderId: Scalars['Int']['input'];
};


export type MutationChangeOrderStatusArgs = {
  data?: InputMaybe<ChangeOrderInput>;
};


export type MutationCheckAttendanceArgs = {
  date: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateBankArgs = {
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateBrandArgs = {
  data?: InputMaybe<BrandInput>;
};


export type MutationCreateCategoryArgs = {
  data?: InputMaybe<CategoryInput>;
};


export type MutationCreateDeliveryArgs = {
  data?: InputMaybe<DeliveryInput>;
};


export type MutationCreateOrderArgs = {
  data?: InputMaybe<OrderInput>;
};


export type MutationCreatePositionArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  data?: InputMaybe<ProductInput>;
};


export type MutationCreateProductStockArgs = {
  data?: InputMaybe<ProductStockInput>;
};


export type MutationCreateShiftArgs = {
  data?: InputMaybe<ShiftInput>;
};


export type MutationCreateUserArgs = {
  data?: InputMaybe<UserInput>;
};


export type MutationDecreaseOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationGenerateTableSetArgs = {
  sets: Scalars['Int']['input'];
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


export type MutationPeopleInOrderArgs = {
  count: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type MutationSignatureOrderArgs = {
  id: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type MutationTestSubscriptionArgs = {
  str?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBankArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
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


export type MutationUpdateDeliveryArgs = {
  data?: InputMaybe<DeliveryInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdatePositionArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
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


export type MutationUpdateShiftArgs = {
  data?: InputMaybe<ShiftInput>;
  expected?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UserInput>;
  id: Scalars['Int']['input'];
};


export type MutationVerifyOtpOrderArgs = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Scalars['String']['output']>;
  bankType?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  delivery?: Maybe<Delivery>;
  deliveryCode?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoice?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<OrderItem>>>;
  log?: Maybe<Array<Maybe<OrderLog>>>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Scalars['Int']['output']>;
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
  isPrint?: Maybe<Scalars['Boolean']['output']>;
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

export type Position = {
  __typename?: 'Position';
  createdDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedDate?: Maybe<Scalars['String']['output']>;
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
  bankInfo?: Maybe<BankInfo>;
  books?: Maybe<Array<Maybe<Book>>>;
  brand?: Maybe<Brand>;
  brandList?: Maybe<Array<Maybe<Brand>>>;
  category?: Maybe<Category>;
  categoryList?: Maybe<Scalars['JSON']['output']>;
  deliveryById?: Maybe<Delivery>;
  deliveryList?: Maybe<Array<Maybe<Delivery>>>;
  getAttendanceAdmin?: Maybe<Scalars['JSON']['output']>;
  getAttendanceStaff?: Maybe<Array<Maybe<Attendance>>>;
  getAttendanceStaffToday?: Maybe<Attendance>;
  getLeaveAdmin?: Maybe<Scalars['JSON']['output']>;
  getPositionList?: Maybe<Array<Maybe<Position>>>;
  getbankList?: Maybe<Array<Maybe<BankInfo>>>;
  me?: Maybe<User>;
  order?: Maybe<Order>;
  orderList?: Maybe<Array<Maybe<Order>>>;
  position?: Maybe<Position>;
  product?: Maybe<Product>;
  productList?: Maybe<Array<Maybe<Product>>>;
  productStock?: Maybe<ProductStock>;
  productStockList?: Maybe<Array<Maybe<ProductStock>>>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  settingList?: Maybe<Array<Maybe<Setting>>>;
  shiftById?: Maybe<Shift>;
  shiftList?: Maybe<Array<Maybe<Shift>>>;
  tableSet?: Maybe<TableSet>;
  tableSetList?: Maybe<Array<Maybe<TableSet>>>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
};


export type QueryBankInfoArgs = {
  id: Scalars['Int']['input'];
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


export type QueryDeliveryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDeliveryListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAttendanceAdminArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAttendanceStaffArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAttendanceStaffTodayArgs = {
  date: Scalars['String']['input'];
};


export type QueryGetPositionListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetbankListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderListArgs = {
  fromDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<InputMaybe<StatusOrder>>>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  viewBy?: InputMaybe<OrderViewBy>;
};


export type QueryPositionArgs = {
  id: Scalars['Int']['input'];
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


export type QueryShiftByIdArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShiftListArgs = {
  fromDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryTableSetArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTableSetListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
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

export type Shift = {
  __typename?: 'Shift';
  bank?: Maybe<Scalars['JSON']['output']>;
  bill?: Maybe<Scalars['Int']['output']>;
  card?: Maybe<Scalars['Int']['output']>;
  close?: Maybe<Scalars['String']['output']>;
  closeCurrency?: Maybe<CurrencyShift>;
  deposit?: Maybe<Scalars['String']['output']>;
  expectedCurrency?: Maybe<CurrencyShift>;
  id?: Maybe<Scalars['Int']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  open?: Maybe<Scalars['String']['output']>;
  openCurrency?: Maybe<CurrencyShift>;
  user?: Maybe<User>;
};

export type ShiftInput = {
  close?: InputMaybe<Scalars['String']['input']>;
  closeCurrency?: InputMaybe<CurrencyShiftInput>;
  deposit?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  open?: InputMaybe<Scalars['String']['input']>;
  openCurrency?: InputMaybe<CurrencyShiftInput>;
  userId: Scalars['Int']['input'];
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

export type TableSet = {
  __typename?: 'TableSet';
  order?: Maybe<Order>;
  set?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  bankAcc?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  bankType?: Maybe<Scalars['String']['output']>;
  baseSalary?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  createdDate?: Maybe<Scalars['String']['output']>;
  display?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  startingAt?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  bankAcc?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  bankType?: InputMaybe<Scalars['String']['input']>;
  baseSalary?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  createdDate?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  startingAt?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
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

export type SignatureOrderMutationVariables = Exact<{
  signatureOrderId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}>;


export type SignatureOrderMutation = { __typename?: 'Mutation', signatureOrder?: boolean | null };

export type UpdateSettingMutationVariables = Exact<{
  option?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting?: boolean | null };

export type GenerateTableSetMutationVariables = Exact<{
  sets: Scalars['Int']['input'];
}>;


export type GenerateTableSetMutation = { __typename?: 'Mutation', generateTableSet?: boolean | null };

export type CreateDeliveryMutationVariables = Exact<{
  data?: InputMaybe<DeliveryInput>;
}>;


export type CreateDeliveryMutation = { __typename?: 'Mutation', createDelivery?: boolean | null };

export type UpdateDeliveryMutationVariables = Exact<{
  updateDeliveryId: Scalars['Int']['input'];
  data?: InputMaybe<DeliveryInput>;
}>;


export type UpdateDeliveryMutation = { __typename?: 'Mutation', updateDelivery?: boolean | null };

export type CreateUserMutationVariables = Exact<{
  data?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: boolean | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data?: InputMaybe<UserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: boolean | null };

export type CreatePositionMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreatePositionMutation = { __typename?: 'Mutation', createPosition?: boolean | null };

export type UpdatePositionMutationVariables = Exact<{
  name: Scalars['String']['input'];
  updatePositionId: Scalars['Int']['input'];
}>;


export type UpdatePositionMutation = { __typename?: 'Mutation', updatePosition?: boolean | null };

export type CreateBankMutationVariables = Exact<{
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBankMutation = { __typename?: 'Mutation', createBank?: boolean | null };

export type UpdateBankMutationVariables = Exact<{
  updateBankId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBankMutation = { __typename?: 'Mutation', updateBank?: boolean | null };

export type CheckAttendanceMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  date: Scalars['String']['input'];
}>;


export type CheckAttendanceMutation = { __typename?: 'Mutation', checkAttendance?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, display?: string | null, contact?: string | null, gender?: string | null, createdDate?: string | null, isActive?: boolean | null, ownerId?: string | null, startingAt?: string | null, bankName?: string | null, bankAcc?: string | null, bankType?: string | null, position?: string | null, baseSalary?: string | null, type?: string | null, profile?: string | null, username?: string | null, role?: { __typename?: 'Role', name?: string | null, id?: number | null } | null } | null };

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


export type OrderListQuery = { __typename?: 'Query', orderList?: Array<{ __typename?: 'Order', id?: number | null, code?: string | null, deliveryCode?: string | null, discount?: number | null, status?: StatusOrder | null, name?: string | null, paid?: string | null, set?: string | null, total?: string | null, uuid?: string | null, note?: string | null, vat?: string | null, bankType?: string | null, invoice?: number | null, delivery?: { __typename?: 'Delivery', id?: number | null, name?: string | null, contact?: string | null } | null, items?: Array<{ __typename?: 'OrderItem', id?: number | null, price?: number | null, qty?: number | null, discount?: number | null, addons?: string | null, remark?: string | null, status?: StatusOrderItem | null, product?: { __typename?: 'Product', id?: number | null, images?: string | null, title?: string | null, code?: string | null } | null, sku?: { __typename?: 'SKU', name?: string | null } | null } | null> | null, log?: Array<{ __typename?: 'OrderLog', date?: string | null, text?: string | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null } | null> | null };

export type OrderQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id?: number | null, address?: string | null, status?: StatusOrder | null, discount?: number | null, name?: string | null, paid?: string | null, set?: string | null, total?: string | null, uuid?: string | null, note?: string | null, code?: string | null, vat?: string | null, invoice?: number | null, bankType?: string | null, deliveryCode?: string | null, log?: Array<{ __typename?: 'OrderLog', date?: string | null, text?: string | null, by?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null, delivery?: { __typename?: 'Delivery', id?: number | null, name?: string | null, contact?: string | null } | null, items?: Array<{ __typename?: 'OrderItem', id?: number | null, qty?: number | null, price?: number | null, discount?: number | null, status?: StatusOrderItem | null, addons?: string | null, remark?: string | null, isPrint?: boolean | null, sku?: { __typename?: 'SKU', price?: number | null, discount?: number | null, id?: number | null, unit?: string | null, name?: string | null } | null, product?: { __typename?: 'Product', title?: string | null, images?: string | null, code?: string | null, description?: string | null, id?: number | null } | null } | null> | null } | null };

export type SettingListQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingListQuery = { __typename?: 'Query', settingList?: Array<{ __typename?: 'Setting', value?: string | null, type?: string | null, option?: string | null } | null> | null };

export type DeliveryListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeliveryListQuery = { __typename?: 'Query', deliveryList?: Array<{ __typename?: 'Delivery', contact?: string | null, id?: number | null, name?: string | null } | null> | null };

export type TableSetListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TableSetListQuery = { __typename?: 'Query', tableSetList?: Array<{ __typename?: 'TableSet', set?: number | null, order?: { __typename?: 'Order', id?: number | null, uuid?: string | null, status?: StatusOrder | null, code?: string | null } | null } | null> | null };

export type DeliveryByIdQueryVariables = Exact<{
  deliveryByIdId: Scalars['Int']['input'];
}>;


export type DeliveryByIdQuery = { __typename?: 'Query', deliveryById?: { __typename?: 'Delivery', contact?: string | null, id?: number | null, name?: string | null } | null };

export type GetPositionListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPositionListQuery = { __typename?: 'Query', getPositionList?: Array<{ __typename?: 'Position', createdDate?: string | null, id?: number | null, name?: string | null, updatedDate?: string | null } | null> | null };

export type PositionQueryVariables = Exact<{
  positionId: Scalars['Int']['input'];
}>;


export type PositionQuery = { __typename?: 'Query', position?: { __typename?: 'Position', createdDate?: string | null, id?: number | null, name?: string | null, updatedDate?: string | null } | null };

export type BankInfoQueryVariables = Exact<{
  bankInfoId: Scalars['Int']['input'];
}>;


export type BankInfoQuery = { __typename?: 'Query', bankInfo?: { __typename?: 'BankInfo', createdDate?: string | null, id?: number | null, name?: string | null, phone?: string | null, updatedDate?: string | null } | null };

export type GetbankListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetbankListQuery = { __typename?: 'Query', getbankList?: Array<{ __typename?: 'BankInfo', createdDate?: string | null, id?: number | null, name?: string | null, phone?: string | null, updatedDate?: string | null } | null> | null };

export type UserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, display?: string | null, gender?: string | null, dob?: string | null, contact?: string | null, ownerId?: string | null, position?: string | null, startingAt?: string | null, type?: string | null, username?: string | null, password?: string | null, profile?: string | null, baseSalary?: string | null, createdDate?: string | null, bankType?: string | null, bankName?: string | null, bankAcc?: string | null, isActive?: boolean | null, role?: { __typename?: 'Role', id?: number | null, name?: string | null } | null } | null };

export type UserListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type UserListQuery = { __typename?: 'Query', userList?: Array<{ __typename?: 'User', id: number, display?: string | null, gender?: string | null, dob?: string | null, contact?: string | null, ownerId?: string | null, position?: string | null, startingAt?: string | null, type?: string | null, username?: string | null, password?: string | null, profile?: string | null, baseSalary?: string | null, createdDate?: string | null, bankType?: string | null, bankName?: string | null, bankAcc?: string | null, isActive?: boolean | null, role?: { __typename?: 'Role', id?: number | null, name?: string | null } | null } | null> | null };

export type RoleListQueryVariables = Exact<{ [key: string]: never; }>;


export type RoleListQuery = { __typename?: 'Query', roleList?: Array<{ __typename?: 'Role', id?: number | null, name?: string | null } | null> | null };

export type GetAttendanceStaffTodayQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetAttendanceStaffTodayQuery = { __typename?: 'Query', getAttendanceStaffToday?: { __typename?: 'Attendance', id?: number | null, checkIn?: string | null, checkOut?: string | null, overTimeIn?: string | null, overTimeOut?: string | null, checkDate?: string | null, user?: { __typename?: 'User', id: number, display?: string | null } | null } | null };

export type GetAttendanceStaffQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAttendanceStaffQuery = { __typename?: 'Query', getAttendanceStaff?: Array<{ __typename?: 'Attendance', id?: number | null, checkIn?: string | null, checkOut?: string | null, overTimeIn?: string | null, overTimeOut?: string | null, checkDate?: string | null, user?: { __typename?: 'User', id: number, display?: string | null } | null } | null> | null };

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
export const SignatureOrderDocument = gql`
    mutation signatureOrder($signatureOrderId: Int!, $password: String!, $username: String!, $userId: Int!) {
  signatureOrder(
    id: $signatureOrderId
    password: $password
    username: $username
    userId: $userId
  )
}
    `;
export type SignatureOrderMutationFn = Apollo.MutationFunction<SignatureOrderMutation, SignatureOrderMutationVariables>;

/**
 * __useSignatureOrderMutation__
 *
 * To run a mutation, you first call `useSignatureOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignatureOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signatureOrderMutation, { data, loading, error }] = useSignatureOrderMutation({
 *   variables: {
 *      signatureOrderId: // value for 'signatureOrderId'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSignatureOrderMutation(baseOptions?: Apollo.MutationHookOptions<SignatureOrderMutation, SignatureOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignatureOrderMutation, SignatureOrderMutationVariables>(SignatureOrderDocument, options);
      }
export type SignatureOrderMutationHookResult = ReturnType<typeof useSignatureOrderMutation>;
export type SignatureOrderMutationResult = Apollo.MutationResult<SignatureOrderMutation>;
export type SignatureOrderMutationOptions = Apollo.BaseMutationOptions<SignatureOrderMutation, SignatureOrderMutationVariables>;
export const UpdateSettingDocument = gql`
    mutation updateSetting($option: String, $value: String) {
  updateSetting(option: $option, value: $value)
}
    `;
export type UpdateSettingMutationFn = Apollo.MutationFunction<UpdateSettingMutation, UpdateSettingMutationVariables>;

/**
 * __useUpdateSettingMutation__
 *
 * To run a mutation, you first call `useUpdateSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingMutation, { data, loading, error }] = useUpdateSettingMutation({
 *   variables: {
 *      option: // value for 'option'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingMutation, UpdateSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingMutation, UpdateSettingMutationVariables>(UpdateSettingDocument, options);
      }
export type UpdateSettingMutationHookResult = ReturnType<typeof useUpdateSettingMutation>;
export type UpdateSettingMutationResult = Apollo.MutationResult<UpdateSettingMutation>;
export type UpdateSettingMutationOptions = Apollo.BaseMutationOptions<UpdateSettingMutation, UpdateSettingMutationVariables>;
export const GenerateTableSetDocument = gql`
    mutation generateTableSet($sets: Int!) {
  generateTableSet(sets: $sets)
}
    `;
export type GenerateTableSetMutationFn = Apollo.MutationFunction<GenerateTableSetMutation, GenerateTableSetMutationVariables>;

/**
 * __useGenerateTableSetMutation__
 *
 * To run a mutation, you first call `useGenerateTableSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTableSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTableSetMutation, { data, loading, error }] = useGenerateTableSetMutation({
 *   variables: {
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGenerateTableSetMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTableSetMutation, GenerateTableSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTableSetMutation, GenerateTableSetMutationVariables>(GenerateTableSetDocument, options);
      }
export type GenerateTableSetMutationHookResult = ReturnType<typeof useGenerateTableSetMutation>;
export type GenerateTableSetMutationResult = Apollo.MutationResult<GenerateTableSetMutation>;
export type GenerateTableSetMutationOptions = Apollo.BaseMutationOptions<GenerateTableSetMutation, GenerateTableSetMutationVariables>;
export const CreateDeliveryDocument = gql`
    mutation createDelivery($data: DeliveryInput) {
  createDelivery(data: $data)
}
    `;
export type CreateDeliveryMutationFn = Apollo.MutationFunction<CreateDeliveryMutation, CreateDeliveryMutationVariables>;

/**
 * __useCreateDeliveryMutation__
 *
 * To run a mutation, you first call `useCreateDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliveryMutation, { data, loading, error }] = useCreateDeliveryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDeliveryMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeliveryMutation, CreateDeliveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeliveryMutation, CreateDeliveryMutationVariables>(CreateDeliveryDocument, options);
      }
export type CreateDeliveryMutationHookResult = ReturnType<typeof useCreateDeliveryMutation>;
export type CreateDeliveryMutationResult = Apollo.MutationResult<CreateDeliveryMutation>;
export type CreateDeliveryMutationOptions = Apollo.BaseMutationOptions<CreateDeliveryMutation, CreateDeliveryMutationVariables>;
export const UpdateDeliveryDocument = gql`
    mutation updateDelivery($updateDeliveryId: Int!, $data: DeliveryInput) {
  updateDelivery(id: $updateDeliveryId, data: $data)
}
    `;
export type UpdateDeliveryMutationFn = Apollo.MutationFunction<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>;

/**
 * __useUpdateDeliveryMutation__
 *
 * To run a mutation, you first call `useUpdateDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeliveryMutation, { data, loading, error }] = useUpdateDeliveryMutation({
 *   variables: {
 *      updateDeliveryId: // value for 'updateDeliveryId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDeliveryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>(UpdateDeliveryDocument, options);
      }
export type UpdateDeliveryMutationHookResult = ReturnType<typeof useUpdateDeliveryMutation>;
export type UpdateDeliveryMutationResult = Apollo.MutationResult<UpdateDeliveryMutation>;
export type UpdateDeliveryMutationOptions = Apollo.BaseMutationOptions<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($data: UserInput) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: Int!, $data: UserInput) {
  updateUser(id: $id, data: $data)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreatePositionDocument = gql`
    mutation createPosition($name: String!) {
  createPosition(name: $name)
}
    `;
export type CreatePositionMutationFn = Apollo.MutationFunction<CreatePositionMutation, CreatePositionMutationVariables>;

/**
 * __useCreatePositionMutation__
 *
 * To run a mutation, you first call `useCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPositionMutation, { data, loading, error }] = useCreatePositionMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreatePositionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePositionMutation, CreatePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePositionMutation, CreatePositionMutationVariables>(CreatePositionDocument, options);
      }
export type CreatePositionMutationHookResult = ReturnType<typeof useCreatePositionMutation>;
export type CreatePositionMutationResult = Apollo.MutationResult<CreatePositionMutation>;
export type CreatePositionMutationOptions = Apollo.BaseMutationOptions<CreatePositionMutation, CreatePositionMutationVariables>;
export const UpdatePositionDocument = gql`
    mutation updatePosition($name: String!, $updatePositionId: Int!) {
  updatePosition(name: $name, id: $updatePositionId)
}
    `;
export type UpdatePositionMutationFn = Apollo.MutationFunction<UpdatePositionMutation, UpdatePositionMutationVariables>;

/**
 * __useUpdatePositionMutation__
 *
 * To run a mutation, you first call `useUpdatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePositionMutation, { data, loading, error }] = useUpdatePositionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      updatePositionId: // value for 'updatePositionId'
 *   },
 * });
 */
export function useUpdatePositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePositionMutation, UpdatePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePositionMutation, UpdatePositionMutationVariables>(UpdatePositionDocument, options);
      }
export type UpdatePositionMutationHookResult = ReturnType<typeof useUpdatePositionMutation>;
export type UpdatePositionMutationResult = Apollo.MutationResult<UpdatePositionMutation>;
export type UpdatePositionMutationOptions = Apollo.BaseMutationOptions<UpdatePositionMutation, UpdatePositionMutationVariables>;
export const CreateBankDocument = gql`
    mutation createBank($name: String!, $phone: String) {
  createBank(name: $name, phone: $phone)
}
    `;
export type CreateBankMutationFn = Apollo.MutationFunction<CreateBankMutation, CreateBankMutationVariables>;

/**
 * __useCreateBankMutation__
 *
 * To run a mutation, you first call `useCreateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBankMutation, { data, loading, error }] = useCreateBankMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreateBankMutation(baseOptions?: Apollo.MutationHookOptions<CreateBankMutation, CreateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBankMutation, CreateBankMutationVariables>(CreateBankDocument, options);
      }
export type CreateBankMutationHookResult = ReturnType<typeof useCreateBankMutation>;
export type CreateBankMutationResult = Apollo.MutationResult<CreateBankMutation>;
export type CreateBankMutationOptions = Apollo.BaseMutationOptions<CreateBankMutation, CreateBankMutationVariables>;
export const UpdateBankDocument = gql`
    mutation updateBank($updateBankId: Int!, $name: String!, $phone: String) {
  updateBank(id: $updateBankId, name: $name, phone: $phone)
}
    `;
export type UpdateBankMutationFn = Apollo.MutationFunction<UpdateBankMutation, UpdateBankMutationVariables>;

/**
 * __useUpdateBankMutation__
 *
 * To run a mutation, you first call `useUpdateBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankMutation, { data, loading, error }] = useUpdateBankMutation({
 *   variables: {
 *      updateBankId: // value for 'updateBankId'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateBankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBankMutation, UpdateBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBankMutation, UpdateBankMutationVariables>(UpdateBankDocument, options);
      }
export type UpdateBankMutationHookResult = ReturnType<typeof useUpdateBankMutation>;
export type UpdateBankMutationResult = Apollo.MutationResult<UpdateBankMutation>;
export type UpdateBankMutationOptions = Apollo.BaseMutationOptions<UpdateBankMutation, UpdateBankMutationVariables>;
export const CheckAttendanceDocument = gql`
    mutation checkAttendance($userId: Int!, $date: String!) {
  checkAttendance(userId: $userId, date: $date)
}
    `;
export type CheckAttendanceMutationFn = Apollo.MutationFunction<CheckAttendanceMutation, CheckAttendanceMutationVariables>;

/**
 * __useCheckAttendanceMutation__
 *
 * To run a mutation, you first call `useCheckAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkAttendanceMutation, { data, loading, error }] = useCheckAttendanceMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCheckAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<CheckAttendanceMutation, CheckAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckAttendanceMutation, CheckAttendanceMutationVariables>(CheckAttendanceDocument, options);
      }
export type CheckAttendanceMutationHookResult = ReturnType<typeof useCheckAttendanceMutation>;
export type CheckAttendanceMutationResult = Apollo.MutationResult<CheckAttendanceMutation>;
export type CheckAttendanceMutationOptions = Apollo.BaseMutationOptions<CheckAttendanceMutation, CheckAttendanceMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    display
    contact
    gender
    role {
      name
      id
    }
    createdDate
    isActive
    ownerId
    startingAt
    bankName
    bankAcc
    bankType
    position
    baseSalary
    type
    profile
    username
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
    deliveryCode
    discount
    delivery {
      id
      name
      contact
    }
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
    bankType
    invoice
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
    discount
    name
    paid
    set
    total
    uuid
    note
    code
    vat
    invoice
    bankType
    log {
      date
      text
      by {
        id
        display
      }
    }
    deliveryCode
    delivery {
      id
      name
      contact
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
      isPrint
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
export const DeliveryListDocument = gql`
    query deliveryList($offset: Int, $limit: Int) {
  deliveryList(offset: $offset, limit: $limit) {
    contact
    id
    name
  }
}
    `;

/**
 * __useDeliveryListQuery__
 *
 * To run a query within a React component, call `useDeliveryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useDeliveryListQuery(baseOptions?: Apollo.QueryHookOptions<DeliveryListQuery, DeliveryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryListQuery, DeliveryListQueryVariables>(DeliveryListDocument, options);
      }
export function useDeliveryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryListQuery, DeliveryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryListQuery, DeliveryListQueryVariables>(DeliveryListDocument, options);
        }
export function useDeliveryListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeliveryListQuery, DeliveryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeliveryListQuery, DeliveryListQueryVariables>(DeliveryListDocument, options);
        }
export type DeliveryListQueryHookResult = ReturnType<typeof useDeliveryListQuery>;
export type DeliveryListLazyQueryHookResult = ReturnType<typeof useDeliveryListLazyQuery>;
export type DeliveryListSuspenseQueryHookResult = ReturnType<typeof useDeliveryListSuspenseQuery>;
export type DeliveryListQueryResult = Apollo.QueryResult<DeliveryListQuery, DeliveryListQueryVariables>;
export const TableSetListDocument = gql`
    query tableSetList($limit: Int, $offset: Int) {
  tableSetList(limit: $limit, offset: $offset) {
    set
    order {
      id
      uuid
      status
      code
    }
  }
}
    `;

/**
 * __useTableSetListQuery__
 *
 * To run a query within a React component, call `useTableSetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTableSetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTableSetListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTableSetListQuery(baseOptions?: Apollo.QueryHookOptions<TableSetListQuery, TableSetListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TableSetListQuery, TableSetListQueryVariables>(TableSetListDocument, options);
      }
export function useTableSetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TableSetListQuery, TableSetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TableSetListQuery, TableSetListQueryVariables>(TableSetListDocument, options);
        }
export function useTableSetListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TableSetListQuery, TableSetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TableSetListQuery, TableSetListQueryVariables>(TableSetListDocument, options);
        }
export type TableSetListQueryHookResult = ReturnType<typeof useTableSetListQuery>;
export type TableSetListLazyQueryHookResult = ReturnType<typeof useTableSetListLazyQuery>;
export type TableSetListSuspenseQueryHookResult = ReturnType<typeof useTableSetListSuspenseQuery>;
export type TableSetListQueryResult = Apollo.QueryResult<TableSetListQuery, TableSetListQueryVariables>;
export const DeliveryByIdDocument = gql`
    query deliveryById($deliveryByIdId: Int!) {
  deliveryById(id: $deliveryByIdId) {
    contact
    id
    name
  }
}
    `;

/**
 * __useDeliveryByIdQuery__
 *
 * To run a query within a React component, call `useDeliveryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryByIdQuery({
 *   variables: {
 *      deliveryByIdId: // value for 'deliveryByIdId'
 *   },
 * });
 */
export function useDeliveryByIdQuery(baseOptions: Apollo.QueryHookOptions<DeliveryByIdQuery, DeliveryByIdQueryVariables> & ({ variables: DeliveryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryByIdQuery, DeliveryByIdQueryVariables>(DeliveryByIdDocument, options);
      }
export function useDeliveryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryByIdQuery, DeliveryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryByIdQuery, DeliveryByIdQueryVariables>(DeliveryByIdDocument, options);
        }
export function useDeliveryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeliveryByIdQuery, DeliveryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeliveryByIdQuery, DeliveryByIdQueryVariables>(DeliveryByIdDocument, options);
        }
export type DeliveryByIdQueryHookResult = ReturnType<typeof useDeliveryByIdQuery>;
export type DeliveryByIdLazyQueryHookResult = ReturnType<typeof useDeliveryByIdLazyQuery>;
export type DeliveryByIdSuspenseQueryHookResult = ReturnType<typeof useDeliveryByIdSuspenseQuery>;
export type DeliveryByIdQueryResult = Apollo.QueryResult<DeliveryByIdQuery, DeliveryByIdQueryVariables>;
export const GetPositionListDocument = gql`
    query getPositionList($offset: Int = 0, $limit: Int = 30) {
  getPositionList(offset: $offset, limit: $limit) {
    createdDate
    id
    name
    updatedDate
  }
}
    `;

/**
 * __useGetPositionListQuery__
 *
 * To run a query within a React component, call `useGetPositionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPositionListQuery(baseOptions?: Apollo.QueryHookOptions<GetPositionListQuery, GetPositionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositionListQuery, GetPositionListQueryVariables>(GetPositionListDocument, options);
      }
export function useGetPositionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositionListQuery, GetPositionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositionListQuery, GetPositionListQueryVariables>(GetPositionListDocument, options);
        }
export function useGetPositionListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPositionListQuery, GetPositionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPositionListQuery, GetPositionListQueryVariables>(GetPositionListDocument, options);
        }
export type GetPositionListQueryHookResult = ReturnType<typeof useGetPositionListQuery>;
export type GetPositionListLazyQueryHookResult = ReturnType<typeof useGetPositionListLazyQuery>;
export type GetPositionListSuspenseQueryHookResult = ReturnType<typeof useGetPositionListSuspenseQuery>;
export type GetPositionListQueryResult = Apollo.QueryResult<GetPositionListQuery, GetPositionListQueryVariables>;
export const PositionDocument = gql`
    query position($positionId: Int!) {
  position(id: $positionId) {
    createdDate
    id
    name
    updatedDate
  }
}
    `;

/**
 * __usePositionQuery__
 *
 * To run a query within a React component, call `usePositionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionQuery({
 *   variables: {
 *      positionId: // value for 'positionId'
 *   },
 * });
 */
export function usePositionQuery(baseOptions: Apollo.QueryHookOptions<PositionQuery, PositionQueryVariables> & ({ variables: PositionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
      }
export function usePositionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionQuery, PositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
        }
export function usePositionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PositionQuery, PositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
        }
export type PositionQueryHookResult = ReturnType<typeof usePositionQuery>;
export type PositionLazyQueryHookResult = ReturnType<typeof usePositionLazyQuery>;
export type PositionSuspenseQueryHookResult = ReturnType<typeof usePositionSuspenseQuery>;
export type PositionQueryResult = Apollo.QueryResult<PositionQuery, PositionQueryVariables>;
export const BankInfoDocument = gql`
    query bankInfo($bankInfoId: Int!) {
  bankInfo(id: $bankInfoId) {
    createdDate
    id
    name
    phone
    updatedDate
  }
}
    `;

/**
 * __useBankInfoQuery__
 *
 * To run a query within a React component, call `useBankInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankInfoQuery({
 *   variables: {
 *      bankInfoId: // value for 'bankInfoId'
 *   },
 * });
 */
export function useBankInfoQuery(baseOptions: Apollo.QueryHookOptions<BankInfoQuery, BankInfoQueryVariables> & ({ variables: BankInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
      }
export function useBankInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BankInfoQuery, BankInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
        }
export function useBankInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BankInfoQuery, BankInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BankInfoQuery, BankInfoQueryVariables>(BankInfoDocument, options);
        }
export type BankInfoQueryHookResult = ReturnType<typeof useBankInfoQuery>;
export type BankInfoLazyQueryHookResult = ReturnType<typeof useBankInfoLazyQuery>;
export type BankInfoSuspenseQueryHookResult = ReturnType<typeof useBankInfoSuspenseQuery>;
export type BankInfoQueryResult = Apollo.QueryResult<BankInfoQuery, BankInfoQueryVariables>;
export const GetbankListDocument = gql`
    query getbankList($offset: Int = 0, $limit: Int = 30) {
  getbankList(offset: $offset, limit: $limit) {
    createdDate
    id
    name
    phone
    updatedDate
  }
}
    `;

/**
 * __useGetbankListQuery__
 *
 * To run a query within a React component, call `useGetbankListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetbankListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetbankListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetbankListQuery(baseOptions?: Apollo.QueryHookOptions<GetbankListQuery, GetbankListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetbankListQuery, GetbankListQueryVariables>(GetbankListDocument, options);
      }
export function useGetbankListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetbankListQuery, GetbankListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetbankListQuery, GetbankListQueryVariables>(GetbankListDocument, options);
        }
export function useGetbankListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetbankListQuery, GetbankListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetbankListQuery, GetbankListQueryVariables>(GetbankListDocument, options);
        }
export type GetbankListQueryHookResult = ReturnType<typeof useGetbankListQuery>;
export type GetbankListLazyQueryHookResult = ReturnType<typeof useGetbankListLazyQuery>;
export type GetbankListSuspenseQueryHookResult = ReturnType<typeof useGetbankListSuspenseQuery>;
export type GetbankListQueryResult = Apollo.QueryResult<GetbankListQuery, GetbankListQueryVariables>;
export const UserDocument = gql`
    query user($userId: Int!) {
  user(id: $userId) {
    id
    display
    gender
    dob
    contact
    ownerId
    position
    role {
      id
      name
    }
    startingAt
    type
    username
    password
    profile
    baseSalary
    createdDate
    bankType
    bankName
    bankAcc
    isActive
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserListDocument = gql`
    query userList($offset: Int, $limit: Int, $roles: [Int]) {
  userList(offset: $offset, limit: $limit, roles: $roles) {
    id
    display
    gender
    dob
    contact
    ownerId
    position
    role {
      id
      name
    }
    startingAt
    type
    username
    password
    profile
    baseSalary
    createdDate
    bankType
    bankName
    bankAcc
    isActive
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export function useUserListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListSuspenseQueryHookResult = ReturnType<typeof useUserListSuspenseQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;
export const RoleListDocument = gql`
    query roleList {
  roleList {
    id
    name
  }
}
    `;

/**
 * __useRoleListQuery__
 *
 * To run a query within a React component, call `useRoleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoleListQuery(baseOptions?: Apollo.QueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
      }
export function useRoleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
        }
export function useRoleListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
        }
export type RoleListQueryHookResult = ReturnType<typeof useRoleListQuery>;
export type RoleListLazyQueryHookResult = ReturnType<typeof useRoleListLazyQuery>;
export type RoleListSuspenseQueryHookResult = ReturnType<typeof useRoleListSuspenseQuery>;
export type RoleListQueryResult = Apollo.QueryResult<RoleListQuery, RoleListQueryVariables>;
export const GetAttendanceStaffTodayDocument = gql`
    query getAttendanceStaffToday($date: String!) {
  getAttendanceStaffToday(date: $date) {
    user {
      id
      display
    }
    id
    checkIn
    checkOut
    overTimeIn
    overTimeOut
    checkDate
  }
}
    `;

/**
 * __useGetAttendanceStaffTodayQuery__
 *
 * To run a query within a React component, call `useGetAttendanceStaffTodayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceStaffTodayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendanceStaffTodayQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetAttendanceStaffTodayQuery(baseOptions: Apollo.QueryHookOptions<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables> & ({ variables: GetAttendanceStaffTodayQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>(GetAttendanceStaffTodayDocument, options);
      }
export function useGetAttendanceStaffTodayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>(GetAttendanceStaffTodayDocument, options);
        }
export function useGetAttendanceStaffTodaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>(GetAttendanceStaffTodayDocument, options);
        }
export type GetAttendanceStaffTodayQueryHookResult = ReturnType<typeof useGetAttendanceStaffTodayQuery>;
export type GetAttendanceStaffTodayLazyQueryHookResult = ReturnType<typeof useGetAttendanceStaffTodayLazyQuery>;
export type GetAttendanceStaffTodaySuspenseQueryHookResult = ReturnType<typeof useGetAttendanceStaffTodaySuspenseQuery>;
export type GetAttendanceStaffTodayQueryResult = Apollo.QueryResult<GetAttendanceStaffTodayQuery, GetAttendanceStaffTodayQueryVariables>;
export const GetAttendanceStaffDocument = gql`
    query getAttendanceStaff($limit: Int, $offset: Int, $from: String, $to: String) {
  getAttendanceStaff(limit: $limit, offset: $offset, from: $from, to: $to) {
    id
    user {
      id
      display
    }
    checkIn
    checkOut
    overTimeIn
    overTimeOut
    checkDate
  }
}
    `;

/**
 * __useGetAttendanceStaffQuery__
 *
 * To run a query within a React component, call `useGetAttendanceStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendanceStaffQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGetAttendanceStaffQuery(baseOptions?: Apollo.QueryHookOptions<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>(GetAttendanceStaffDocument, options);
      }
export function useGetAttendanceStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>(GetAttendanceStaffDocument, options);
        }
export function useGetAttendanceStaffSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>(GetAttendanceStaffDocument, options);
        }
export type GetAttendanceStaffQueryHookResult = ReturnType<typeof useGetAttendanceStaffQuery>;
export type GetAttendanceStaffLazyQueryHookResult = ReturnType<typeof useGetAttendanceStaffLazyQuery>;
export type GetAttendanceStaffSuspenseQueryHookResult = ReturnType<typeof useGetAttendanceStaffSuspenseQuery>;
export type GetAttendanceStaffQueryResult = Apollo.QueryResult<GetAttendanceStaffQuery, GetAttendanceStaffQueryVariables>;
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