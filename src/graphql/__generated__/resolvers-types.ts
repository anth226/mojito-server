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
  name?: Maybe<Scalars['String']['output']>;
};

export type Alert = {
  __typename?: 'Alert';
  _id: Scalars['String']['output'];
  connection: Connection;
  createdAt?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  operation: AlertOperation;
  value: Scalars['String']['output'];
};

export enum AlertOperation {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  LessThan = 'LESS_THAN'
}

export type Connection = {
  __typename?: 'Connection';
  _id: Scalars['String']['output'];
  client: User;
  createdAt: Scalars['String']['output'];
  source: ConnectionSource;
};

export enum ConnectionSource {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Meta = 'META',
  Tiktok = 'TIKTOK'
}

export type CreateAlertInput = {
  client?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAlertPayload = {
  __typename?: 'CreateAlertPayload';
  alert?: Maybe<Alert>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type CreateConnectionInput = {
  clientId: Scalars['String']['input'];
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
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
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
};

export type Mutation = {
  __typename?: 'Mutation';
  createAlert?: Maybe<CreateAlertPayload>;
  createConnection?: Maybe<CreateConnectionPayload>;
  inviteClient?: Maybe<InviteClientPayload>;
  login?: Maybe<LoginPayload>;
  registerAgency?: Maybe<RegisterAgencyPayload>;
};


export type MutationCreateAlertArgs = {
  input?: InputMaybe<CreateAlertInput>;
};


export type MutationCreateConnectionArgs = {
  input: CreateConnectionInput;
};


export type MutationInviteClientArgs = {
  input: InviteClientInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterAgencyArgs = {
  input: RegisterAgencyInput;
};

export type Query = {
  __typename?: 'Query';
  alert?: Maybe<Alert>;
  connection?: Maybe<Connection>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
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


export type QueryUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterAgencyInput = {
  agencyName: Scalars['String']['input'];
  alerts?: InputMaybe<Array<CreateAlertInput>>;
  clients?: InputMaybe<Array<InviteClientInput>>;
  connections?: InputMaybe<Array<CreateConnectionInput>>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterAgencyPayload = {
  __typename?: 'RegisterAgencyPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  accountType: AccountType;
  agency?: Maybe<Agency>;
  agencyId?: Maybe<Scalars['String']['output']>;
  clients?: Maybe<Array<User>>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Connection: ResolverTypeWrapper<Connection>;
  ConnectionSource: ConnectionSource;
  CreateAlertInput: CreateAlertInput;
  CreateAlertPayload: ResolverTypeWrapper<CreateAlertPayload>;
  CreateConnectionInput: CreateConnectionInput;
  CreateConnectionPayload: ResolverTypeWrapper<CreateConnectionPayload>;
  InviteClientInput: InviteClientInput;
  InviteClientPayload: ResolverTypeWrapper<InviteClientPayload>;
  LoginInput: LoginInput;
  LoginPayload: ResolverTypeWrapper<LoginPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterAgencyInput: RegisterAgencyInput;
  RegisterAgencyPayload: ResolverTypeWrapper<RegisterAgencyPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Agency: Agency;
  Alert: Alert;
  Boolean: Scalars['Boolean']['output'];
  Connection: Connection;
  CreateAlertInput: CreateAlertInput;
  CreateAlertPayload: CreateAlertPayload;
  CreateConnectionInput: CreateConnectionInput;
  CreateConnectionPayload: CreateConnectionPayload;
  InviteClientInput: InviteClientInput;
  InviteClientPayload: InviteClientPayload;
  LoginInput: LoginInput;
  LoginPayload: LoginPayload;
  Mutation: {};
  Query: {};
  RegisterAgencyInput: RegisterAgencyInput;
  RegisterAgencyPayload: RegisterAgencyPayload;
  String: Scalars['String']['output'];
  User: User;
}>;

export type AgencyResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Agency'] = ResolversParentTypes['Agency']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlertResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  connection?: Resolver<ResolversTypes['Connection'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operation?: Resolver<ResolversTypes['AlertOperation'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectionResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['ConnectionSource'], ParentType, ContextType>;
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
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAlert?: Resolver<Maybe<ResolversTypes['CreateAlertPayload']>, ParentType, ContextType, Partial<MutationCreateAlertArgs>>;
  createConnection?: Resolver<Maybe<ResolversTypes['CreateConnectionPayload']>, ParentType, ContextType, RequireFields<MutationCreateConnectionArgs, 'input'>>;
  inviteClient?: Resolver<Maybe<ResolversTypes['InviteClientPayload']>, ParentType, ContextType, RequireFields<MutationInviteClientArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  registerAgency?: Resolver<Maybe<ResolversTypes['RegisterAgencyPayload']>, ParentType, ContextType, RequireFields<MutationRegisterAgencyArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  alert?: Resolver<Maybe<ResolversTypes['Alert']>, ParentType, ContextType, RequireFields<QueryAlertArgs, 'id'>>;
  connection?: Resolver<Maybe<ResolversTypes['Connection']>, ParentType, ContextType, RequireFields<QueryConnectionArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserByEmailArgs>>;
}>;

export type RegisterAgencyPayloadResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['RegisterAgencyPayload'] = ResolversParentTypes['RegisterAgencyPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = RequestContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountType?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  agency?: Resolver<Maybe<ResolversTypes['Agency']>, ParentType, ContextType>;
  agencyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clients?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = RequestContext> = ResolversObject<{
  Agency?: AgencyResolvers<ContextType>;
  Alert?: AlertResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  CreateAlertPayload?: CreateAlertPayloadResolvers<ContextType>;
  CreateConnectionPayload?: CreateConnectionPayloadResolvers<ContextType>;
  InviteClientPayload?: InviteClientPayloadResolvers<ContextType>;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterAgencyPayload?: RegisterAgencyPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

