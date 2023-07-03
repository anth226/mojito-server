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
  alerts?: Maybe<AlertConnection>;
  clients?: Maybe<UserConnection>;
  connections?: Maybe<ConnectionConnection>;
  createdAt: Scalars['String']['output'];
  members?: Maybe<UserConnection>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};


export type AgencyAlertsArgs = {
  orderBy?: InputMaybe<AlertOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
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
  archived: Scalars['Boolean']['output'];
  connection?: Maybe<Connection>;
  createdAt: Scalars['String']['output'];
  name: Scalars['String']['output'];
  operation: AlertOperation;
  parameter: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AlertConnection = {
  __typename?: 'AlertConnection';
  hasMore: Scalars['Boolean']['output'];
  nodes?: Maybe<Array<Maybe<Alert>>>;
  totalCount: Scalars['Int']['output'];
};

export enum AlertOperation {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  LessThan = 'LESS_THAN'
}

export type AlertOrder = {
  direction: OrderDirection;
  field: AlertOrderField;
};

export enum AlertOrderField {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME'
}

export type ArchiveAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type ArchiveAlertPayload = {
  __typename?: 'ArchiveAlertPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

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
  authUrl?: Maybe<Scalars['String']['output']>;
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

export type CreateAlertsInput = {
  alerts: Array<InputMaybe<CreateAlertInput>>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAlertsPayload = {
  __typename?: 'CreateAlertsPayload';
  alerts?: Maybe<Array<Maybe<Alert>>>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type CreateConnectionInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  source: ConnectionSource;
};

export type CreateConnectionPayload = {
  __typename?: 'CreateConnectionPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  connection?: Maybe<Connection>;
};

export type DeleteConnectionInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type DeleteConnectionPayload = {
  __typename?: 'DeleteConnectionPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type InviteClientInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InviteClientsInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  clients: Array<InputMaybe<InviteClientInput>>;
};

export type InviteClientsPayload = {
  __typename?: 'InviteClientsPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  clients?: Maybe<Array<Maybe<User>>>;
};

export type InviteMemberInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InviteMembersInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  members: Array<InputMaybe<InviteMemberInput>>;
};

export type InviteMembersPayload = {
  __typename?: 'InviteMembersPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Maybe<User>>>;
};

export type LoginInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken?: Maybe<Scalars['String']['output']>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveAlert?: Maybe<ArchiveAlertPayload>;
  createAlerts?: Maybe<CreateAlertsPayload>;
  createConnection?: Maybe<CreateConnectionPayload>;
  deleteConnection?: Maybe<DeleteConnectionPayload>;
  inviteClients?: Maybe<InviteClientsPayload>;
  inviteMembers?: Maybe<InviteMembersPayload>;
  login?: Maybe<LoginPayload>;
  registerAgency?: Maybe<RegisterAgencyPayload>;
  registerBusiness?: Maybe<RegisterBusinessPayload>;
};


export type MutationArchiveAlertArgs = {
  input: ArchiveAlertInput;
};


export type MutationCreateAlertsArgs = {
  input: CreateAlertsInput;
};


export type MutationCreateConnectionArgs = {
  input: CreateConnectionInput;
};


export type MutationDeleteConnectionArgs = {
  input: DeleteConnectionInput;
};


export type MutationInviteClientsArgs = {
  input: InviteClientsInput;
};


export type MutationInviteMembersArgs = {
  input: InviteMembersInput;
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
  user?: Maybe<User>;
  viewer?: Maybe<User>;
};


export type QueryAlertArgs = {
  id: Scalars['String']['input'];
};


export type QueryConnectionArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type RegisterAgencyInput = {
  agencyName: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
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
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
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
  AlertConnection: ResolverTypeWrapper<AlertConnection>;
  AlertOperation: AlertOperation;
  AlertOrder: AlertOrder;
  AlertOrderField: AlertOrderField;
  ArchiveAlertInput: ArchiveAlertInput;
  ArchiveAlertPayload: ResolverTypeWrapper<ArchiveAlertPayload>;
  BillingPlan: BillingPlan;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Business: ResolverTypeWrapper<Business>;
  Connection: ResolverTypeWrapper<Connection>;
  ConnectionConnection: ResolverTypeWrapper<ConnectionConnection>;
  ConnectionOrder: ConnectionOrder;
  ConnectionOrderField: ConnectionOrderField;
  ConnectionSource: ConnectionSource;
  CreateAlertInput: CreateAlertInput;
  CreateAlertsInput: CreateAlertsInput;
  CreateAlertsPayload: ResolverTypeWrapper<CreateAlertsPayload>;
  CreateConnectionInput: CreateConnectionInput;
  CreateConnectionPayload: ResolverTypeWrapper<CreateConnectionPayload>;
  DeleteConnectionInput: DeleteConnectionInput;
  DeleteConnectionPayload: ResolverTypeWrapper<DeleteConnectionPayload>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InviteClientInput: InviteClientInput;
  InviteClientsInput: InviteClientsInput;
  InviteClientsPayload: ResolverTypeWrapper<InviteClientsPayload>;
  InviteMemberInput: InviteMemberInput;
  InviteMembersInput: InviteMembersInput;
  InviteMembersPayload: ResolverTypeWrapper<InviteMembersPayload>;
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
  AlertConnection: AlertConnection;
  AlertOrder: AlertOrder;
  ArchiveAlertInput: ArchiveAlertInput;
  ArchiveAlertPayload: ArchiveAlertPayload;
  Boolean: Scalars['Boolean']['output'];
  Business: Business;
  Connection: Connection;
  ConnectionConnection: ConnectionConnection;
  ConnectionOrder: ConnectionOrder;
  CreateAlertInput: CreateAlertInput;
  CreateAlertsInput: CreateAlertsInput;
  CreateAlertsPayload: CreateAlertsPayload;
  CreateConnectionInput: CreateConnectionInput;
  CreateConnectionPayload: CreateConnectionPayload;
  DeleteConnectionInput: DeleteConnectionInput;
  DeleteConnectionPayload: DeleteConnectionPayload;
  Int: Scalars['Int']['output'];
  InviteClientInput: InviteClientInput;
  InviteClientsInput: InviteClientsInput;
  InviteClientsPayload: InviteClientsPayload;
  InviteMemberInput: InviteMemberInput;
  InviteMembersInput: InviteMembersInput;
  InviteMembersPayload: InviteMembersPayload;
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
  alerts?: Resolver<Maybe<ResolversTypes['AlertConnection']>, ParentType, ContextType, Partial<AgencyAlertsArgs>>;
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
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  connection?: Resolver<Maybe<ResolversTypes['Connection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operation?: Resolver<ResolversTypes['AlertOperation'], ParentType, ContextType>;
  parameter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlertConnectionResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['AlertConnection'] = ResolversParentTypes['AlertConnection']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Alert']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArchiveAlertPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['ArchiveAlertPayload'] = ResolversParentTypes['ArchiveAlertPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  authUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type CreateAlertsPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['CreateAlertsPayload'] = ResolversParentTypes['CreateAlertsPayload']> = ResolversObject<{
  alerts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Alert']>>>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateConnectionPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['CreateConnectionPayload'] = ResolversParentTypes['CreateConnectionPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connection?: Resolver<Maybe<ResolversTypes['Connection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteConnectionPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['DeleteConnectionPayload'] = ResolversParentTypes['DeleteConnectionPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InviteClientsPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['InviteClientsPayload'] = ResolversParentTypes['InviteClientsPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clients?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InviteMembersPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['InviteMembersPayload'] = ResolversParentTypes['InviteMembersPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  archiveAlert?: Resolver<Maybe<ResolversTypes['ArchiveAlertPayload']>, ParentType, ContextType, RequireFields<MutationArchiveAlertArgs, 'input'>>;
  createAlerts?: Resolver<Maybe<ResolversTypes['CreateAlertsPayload']>, ParentType, ContextType, RequireFields<MutationCreateAlertsArgs, 'input'>>;
  createConnection?: Resolver<Maybe<ResolversTypes['CreateConnectionPayload']>, ParentType, ContextType, RequireFields<MutationCreateConnectionArgs, 'input'>>;
  deleteConnection?: Resolver<Maybe<ResolversTypes['DeleteConnectionPayload']>, ParentType, ContextType, RequireFields<MutationDeleteConnectionArgs, 'input'>>;
  inviteClients?: Resolver<Maybe<ResolversTypes['InviteClientsPayload']>, ParentType, ContextType, RequireFields<MutationInviteClientsArgs, 'input'>>;
  inviteMembers?: Resolver<Maybe<ResolversTypes['InviteMembersPayload']>, ParentType, ContextType, RequireFields<MutationInviteMembersArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  registerAgency?: Resolver<Maybe<ResolversTypes['RegisterAgencyPayload']>, ParentType, ContextType, RequireFields<MutationRegisterAgencyArgs, 'input'>>;
  registerBusiness?: Resolver<Maybe<ResolversTypes['RegisterBusinessPayload']>, ParentType, ContextType, RequireFields<MutationRegisterBusinessArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  alert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<QueryAlertArgs, 'id'>>;
  connection?: Resolver<Maybe<ResolversTypes['Connection']>, ParentType, ContextType, RequireFields<QueryConnectionArgs, 'id'>>;
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
  AlertConnection?: AlertConnectionResolvers<ContextType>;
  ArchiveAlertPayload?: ArchiveAlertPayloadResolvers<ContextType>;
  Business?: BusinessResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ConnectionConnection?: ConnectionConnectionResolvers<ContextType>;
  CreateAlertsPayload?: CreateAlertsPayloadResolvers<ContextType>;
  CreateConnectionPayload?: CreateConnectionPayloadResolvers<ContextType>;
  DeleteConnectionPayload?: DeleteConnectionPayloadResolvers<ContextType>;
  InviteClientsPayload?: InviteClientsPayloadResolvers<ContextType>;
  InviteMembersPayload?: InviteMembersPayloadResolvers<ContextType>;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterAgencyPayload?: RegisterAgencyPayloadResolvers<ContextType>;
  RegisterBusinessPayload?: RegisterBusinessPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
}>;

