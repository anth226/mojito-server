import { GraphQLResolveInfo } from 'graphql';
import { RequestContext } from '../../types/request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum AccountType {
  Agency = 'AGENCY',
  Business = 'BUSINESS',
  Client = 'CLIENT'
}

export type Agency = {
  __typename?: 'Agency';
  _id: Scalars['String']['output'];
  clients?: Maybe<UserConnection>;
  connections?: Maybe<ConnectionConnection>;
  createdAt: Scalars['String']['output'];
  members?: Maybe<UserConnection>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};


export type AgencyClientsArgs = {
  nameOrEmail?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<UserOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type AgencyConnectionsArgs = {
  orderBy?: InputMaybe<ConnectionOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type AgencyMembersArgs = {
  nameOrEmail?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<UserOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Alert = {
  __typename?: 'Alert';
  _id: Scalars['String']['output'];
  connection: Connection;
  createdAt: Scalars['String']['output'];
  name: Scalars['String']['output'];
  operation: AlertOperation;
  parameter: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum AlertOperation {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  LessThan = 'LESS_THAN'
}

export enum BillingPlan {
  Professional = 'PROFESSIONAL',
  Scale = 'SCALE',
  Starter = 'STARTER'
}

export type Business = {
  __typename?: 'Business';
  _id: Scalars['String']['output'];
  connections?: Maybe<ConnectionConnection>;
  createdAt: Scalars['String']['output'];
  members?: Maybe<UserConnection>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};


export type BusinessConnectionsArgs = {
  orderBy?: InputMaybe<ConnectionOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type BusinessMembersArgs = {
  nameOrEmail?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<UserOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Connection = {
  __typename?: 'Connection';
  _id: Scalars['String']['output'];
  client?: Maybe<User>;
  createdAt: Scalars['String']['output'];
  source: ConnectionSource;
  updatedAt: Scalars['String']['output'];
};

export type ConnectionConnection = {
  __typename?: 'ConnectionConnection';
  hasMore: Scalars['Boolean']['output'];
  nodes?: Maybe<Array<Maybe<Connection>>>;
  totalCount: Scalars['Int']['output'];
};

export type ConnectionOrder = {
  direction: OrderDirection;
  field: ConnectionOrderField;
};

export enum ConnectionOrderField {
  CreatedAt = 'CREATED_AT'
}

export enum ConnectionSource {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Meta = 'META',
  Tiktok = 'TIKTOK'
}

export type CreateAlertInput = {
  connectionId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  operation: AlertOperation;
  parameter: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateAlertPayload = {
  __typename?: 'CreateAlertPayload';
  alert?: Maybe<Alert>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type CreateConnectionInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  secretKey: Scalars['String']['input'];
  source: ConnectionSource;
};

export type CreateConnectionPayload = {
  __typename?: 'CreateConnectionPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  connection?: Maybe<Connection>;
};

export type InviteClientInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InviteClientPayload = {
  __typename?: 'InviteClientPayload';
  client?: Maybe<User>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type InviteMemberInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InviteMemberPayload = {
  __typename?: 'InviteMemberPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  member?: Maybe<User>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAlert?: Maybe<CreateAlertPayload>;
  createConnection?: Maybe<CreateConnectionPayload>;
  inviteClient?: Maybe<InviteClientPayload>;
  inviteMember?: Maybe<InviteMemberPayload>;
  login?: Maybe<LoginPayload>;
  registerAgency?: Maybe<RegisterAgencyPayload>;
  registerBusiness?: Maybe<RegisterBusinessPayload>;
};


export type MutationCreateAlertArgs = {
  input: CreateAlertInput;
};


export type MutationCreateConnectionArgs = {
  input: CreateConnectionInput;
};


export type MutationInviteClientArgs = {
  input: InviteClientInput;
};


export type MutationInviteMemberArgs = {
  input: InviteMemberInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterAgencyArgs = {
  input: RegisterAgencyInput;
};


export type MutationRegisterBusinessArgs = {
  input: RegisterBusinessInput;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  alert?: Maybe<Alert>;
  connection?: Maybe<Connection>;
  connectionAuthUrl?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  viewer?: Maybe<User>;
};


export type QueryAlertArgs = {
  id: Scalars['String']['input'];
};


export type QueryConnectionArgs = {
  id: Scalars['String']['input'];
};


export type QueryConnectionAuthUrlArgs = {
  source: ConnectionSource;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type RegisterAgencyInput = {
  agencyName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterAgencyPayload = {
  __typename?: 'RegisterAgencyPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type RegisterBusinessInput = {
  businessName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterBusinessPayload = {
  __typename?: 'RegisterBusinessPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  accountType: AccountType;
  agency?: Maybe<Agency>;
  business?: Maybe<Business>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: UserStatus;
  updatedAt: Scalars['String']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  hasMore: Scalars['Boolean']['output'];
  nodes?: Maybe<Array<Maybe<User>>>;
  totalCount: Scalars['Int']['output'];
};

export type UserOrder = {
  direction: OrderDirection;
  field: UserOrderField;
};

export enum UserOrderField {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Invited = 'INVITED'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountType: AccountType;
  Agency: ResolverTypeWrapper<Agency>;
  Alert: ResolverTypeWrapper<Alert>;
  AlertOperation: AlertOperation;
  BillingPlan: BillingPlan;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Business: ResolverTypeWrapper<Business>;
  Connection: ResolverTypeWrapper<Connection>;
  ConnectionConnection: ResolverTypeWrapper<ConnectionConnection>;
  ConnectionOrder: ConnectionOrder;
  ConnectionOrderField: ConnectionOrderField;
  ConnectionSource: ConnectionSource;
  CreateAlertInput: CreateAlertInput;
  CreateAlertPayload: ResolverTypeWrapper<CreateAlertPayload>;
  CreateConnectionInput: CreateConnectionInput;
  CreateConnectionPayload: ResolverTypeWrapper<CreateConnectionPayload>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InviteClientInput: InviteClientInput;
  InviteClientPayload: ResolverTypeWrapper<InviteClientPayload>;
  InviteMemberInput: InviteMemberInput;
  InviteMemberPayload: ResolverTypeWrapper<InviteMemberPayload>;
  LoginInput: LoginInput;
  LoginPayload: ResolverTypeWrapper<LoginPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  RegisterAgencyInput: RegisterAgencyInput;
  RegisterAgencyPayload: ResolverTypeWrapper<RegisterAgencyPayload>;
  RegisterBusinessInput: RegisterBusinessInput;
  RegisterBusinessPayload: ResolverTypeWrapper<RegisterBusinessPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserOrder: UserOrder;
  UserOrderField: UserOrderField;
  UserStatus: UserStatus;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Agency: Agency;
  Alert: Alert;
  Boolean: Scalars['Boolean']['output'];
  Business: Business;
  Connection: Connection;
  ConnectionConnection: ConnectionConnection;
  ConnectionOrder: ConnectionOrder;
  CreateAlertInput: CreateAlertInput;
  CreateAlertPayload: CreateAlertPayload;
  CreateConnectionInput: CreateConnectionInput;
  CreateConnectionPayload: CreateConnectionPayload;
  Int: Scalars['Int']['output'];
  InviteClientInput: InviteClientInput;
  InviteClientPayload: InviteClientPayload;
  InviteMemberInput: InviteMemberInput;
  InviteMemberPayload: InviteMemberPayload;
  LoginInput: LoginInput;
  LoginPayload: LoginPayload;
  Mutation: {};
  Query: {};
  RegisterAgencyInput: RegisterAgencyInput;
  RegisterAgencyPayload: RegisterAgencyPayload;
  RegisterBusinessInput: RegisterBusinessInput;
  RegisterBusinessPayload: RegisterBusinessPayload;
  String: Scalars['String']['output'];
  User: User;
  UserConnection: UserConnection;
  UserOrder: UserOrder;
}>;

export type AgencyResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Agency'] = ResolversParentTypes['Agency']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clients?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType, Partial<AgencyClientsArgs>>;
  connections?: Resolver<Maybe<ResolversTypes['ConnectionConnection']>, ParentType, ContextType, Partial<AgencyConnectionsArgs>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType, Partial<AgencyMembersArgs>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlertResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  connection?: Resolver<ResolversTypes['Connection'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operation?: Resolver<ResolversTypes['AlertOperation'], ParentType, ContextType>;
  parameter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BusinessResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Business'] = ResolversParentTypes['Business']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  connections?: Resolver<Maybe<ResolversTypes['ConnectionConnection']>, ParentType, ContextType, Partial<BusinessConnectionsArgs>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType, Partial<BusinessMembersArgs>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectionResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['ConnectionSource'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectionConnectionResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['ConnectionConnection'] = ResolversParentTypes['ConnectionConnection']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Connection']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateAlertPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['CreateAlertPayload'] = ResolversParentTypes['CreateAlertPayload']> = ResolversObject<{
  alert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateConnectionPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['CreateConnectionPayload'] = ResolversParentTypes['CreateConnectionPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connection?: Resolver<Maybe<ResolversTypes['Connection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InviteClientPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['InviteClientPayload'] = ResolversParentTypes['InviteClientPayload']> = ResolversObject<{
  client?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InviteMemberPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['InviteMemberPayload'] = ResolversParentTypes['InviteMemberPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAlert?: Resolver<Maybe<ResolversTypes['CreateAlertPayload']>, ParentType, ContextType, RequireFields<MutationCreateAlertArgs, 'input'>>;
  createConnection?: Resolver<Maybe<ResolversTypes['CreateConnectionPayload']>, ParentType, ContextType, RequireFields<MutationCreateConnectionArgs, 'input'>>;
  inviteClient?: Resolver<Maybe<ResolversTypes['InviteClientPayload']>, ParentType, ContextType, RequireFields<MutationInviteClientArgs, 'input'>>;
  inviteMember?: Resolver<Maybe<ResolversTypes['InviteMemberPayload']>, ParentType, ContextType, RequireFields<MutationInviteMemberArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  registerAgency?: Resolver<Maybe<ResolversTypes['RegisterAgencyPayload']>, ParentType, ContextType, RequireFields<MutationRegisterAgencyArgs, 'input'>>;
  registerBusiness?: Resolver<Maybe<ResolversTypes['RegisterBusinessPayload']>, ParentType, ContextType, RequireFields<MutationRegisterBusinessArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  alert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<QueryAlertArgs, 'id'>>;
  connection?: Resolver<Maybe<ResolversTypes['Connection']>, ParentType, ContextType, RequireFields<QueryConnectionArgs, 'id'>>;
  connectionAuthUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryConnectionAuthUrlArgs, 'source'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type RegisterAgencyPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['RegisterAgencyPayload'] = ResolversParentTypes['RegisterAgencyPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegisterBusinessPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['RegisterBusinessPayload'] = ResolversParentTypes['RegisterBusinessPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountType?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  agency?: Resolver<Maybe<ResolversTypes['Agency']>, ParentType, ContextType>;
  business?: Resolver<Maybe<ResolversTypes['Business']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserConnectionResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = RequestContext> = ResolversObject<{
  Agency?: AgencyResolvers<ContextType>;
  Alert?: AlertResolvers<ContextType>;
  Business?: BusinessResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ConnectionConnection?: ConnectionConnectionResolvers<ContextType>;
  CreateAlertPayload?: CreateAlertPayloadResolvers<ContextType>;
  CreateConnectionPayload?: CreateConnectionPayloadResolvers<ContextType>;
  InviteClientPayload?: InviteClientPayloadResolvers<ContextType>;
  InviteMemberPayload?: InviteMemberPayloadResolvers<ContextType>;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterAgencyPayload?: RegisterAgencyPayloadResolvers<ContextType>;
  RegisterBusinessPayload?: RegisterBusinessPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
}>;

