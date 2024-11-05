// @ts-nocheck
/* eslint-disable */

import { AllTypesProps, ReturnTypes, Ops } from './const';


export const HOST="Specify host"


export const HEADERS = {}
export const apiSubscription = (options: chainOptions) => (query: string) => {
  try {
    const queryString = options[0] + '?query=' + encodeURIComponent(query);
    const wsString = queryString.replace('http', 'ws');
    const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
    const webSocketOptions = options[1]?.websocket || [host];
    const ws = new WebSocket(...webSocketOptions);
    return {
      ws,
      on: (e: (args: any) => void) => {
        ws.onmessage = (event: any) => {
          if (event.data) {
            const parsed = JSON.parse(event.data);
            const data = parsed.data;
            return e(data);
          }
        };
      },
      off: (e: (args: any) => void) => {
        ws.onclose = e;
      },
      error: (e: (args: any) => void) => {
        ws.onerror = e;
      },
      open: (e: () => void) => {
        ws.onopen = e;
      },
    };
  } catch {
    throw new Error('No websockets implemented');
  }
};
const handleFetchResponse = (response: Response): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response
        .text()
        .then((text) => {
          try {
            reject(JSON.parse(text));
          } catch (err) {
            reject(text);
          }
        })
        .catch(reject);
    });
  }
  return response.json() as Promise<GraphQLResponse>;
};

export const apiFetch =
  (options: fetchOptions) =>
  (query: string, variables: Record<string, unknown> = {}) => {
    const fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      return fetch(`${options[0]}?query=${encodeURIComponent(query)}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetch(`${options[0]}`, {
      body: JSON.stringify({ query, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };

export const InternalsBuildQuery = ({
  ops,
  props,
  returns,
  options,
  scalars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  options?: OperationOptions;
  scalars?: ScalarDefinition;
}) => {
  const ibb = (
    k: string,
    o: InputValueType | VType,
    p = '',
    root = true,
    vars: Array<{ name: string; graphQLType: string }> = [],
  ): string => {
    const keyForPath = purifyGraphQLKey(k);
    const newPath = [p, keyForPath].join(SEPARATOR);
    if (!o) {
      return '';
    }
    if (typeof o === 'boolean' || typeof o === 'number') {
      return k;
    }
    if (typeof o === 'string') {
      return `${k} ${o}`;
    }
    if (Array.isArray(o)) {
      const args = InternalArgsBuilt({
        props,
        returns,
        ops,
        scalars,
        vars,
      })(o[0], newPath);
      return `${ibb(args ? `${k}(${args})` : k, o[1], p, false, vars)}`;
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(`${alias}:${operationName}`, operation, p, false, vars);
        })
        .join('\n');
    }
    const hasOperationName = root && options?.operationName ? ' ' + options.operationName : '';
    const keyForDirectives = o.__directives ?? '';
    const query = `{${Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map((e) => ibb(...e, [p, `field<>${keyForPath}`].join(SEPARATOR), false, vars))
      .join('\n')}}`;
    if (!root) {
      return `${k} ${keyForDirectives}${hasOperationName} ${query}`;
    }
    const varsString = vars.map((v) => `${v.name}: ${v.graphQLType}`).join(', ');
    return `${k} ${keyForDirectives}${hasOperationName}${varsString ? `(${varsString})` : ''} ${query}`;
  };
  return ibb;
};

type UnionOverrideKeys<T, U> = Omit<T, keyof U> & U;

export const Thunder =
  <SCLR extends ScalarDefinition>(fn: FetchFunction, thunderGraphQLOptions?: ThunderGraphQLOptions<SCLR>) =>
  <O extends keyof typeof Ops, OVERRIDESCLR extends SCLR, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<OVERRIDESCLR>,
  ) =>
  <Z extends ValueTypes[R]>(
    o: Z & {
      [P in keyof Z]: P extends keyof ValueTypes[R] ? Z[P] : never;
    },
    ops?: OperationOptions & { variables?: Record<string, unknown> },
  ) => {
    const options = {
      ...thunderGraphQLOptions,
      ...graphqlOptions,
    };
    return fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: options?.scalars,
      }),
      ops?.variables,
    ).then((data) => {
      if (options?.scalars) {
        return decodeScalarsInResponse({
          response: data,
          initialOp: operation,
          initialZeusQuery: o as VType,
          returns: ReturnTypes,
          scalars: options.scalars,
          ops: Ops,
        });
      }
      return data;
    }) as Promise<InputType<GraphQLTypes[R], Z, UnionOverrideKeys<SCLR, OVERRIDESCLR>>>;
  };

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));

export const SubscriptionThunder =
  <SCLR extends ScalarDefinition>(fn: SubscriptionFunction, thunderGraphQLOptions?: ThunderGraphQLOptions<SCLR>) =>
  <O extends keyof typeof Ops, OVERRIDESCLR extends SCLR, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<OVERRIDESCLR>,
  ) =>
  <Z extends ValueTypes[R]>(
    o: Z & {
      [P in keyof Z]: P extends keyof ValueTypes[R] ? Z[P] : never;
    },
    ops?: OperationOptions & { variables?: ExtractVariables<Z> },
  ) => {
    const options = {
      ...thunderGraphQLOptions,
      ...graphqlOptions,
    };
    type CombinedSCLR = UnionOverrideKeys<SCLR, OVERRIDESCLR>;
    const returnedFunction = fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: options?.scalars,
      }),
    ) as SubscriptionToGraphQL<Z, GraphQLTypes[R], CombinedSCLR>;
    if (returnedFunction?.on && options?.scalars) {
      const wrapped = returnedFunction.on;
      returnedFunction.on = (fnToCall: (args: InputType<GraphQLTypes[R], Z, CombinedSCLR>) => void) =>
        wrapped((data: InputType<GraphQLTypes[R], Z, CombinedSCLR>) => {
          if (options?.scalars) {
            return fnToCall(
              decodeScalarsInResponse({
                response: data,
                initialOp: operation,
                initialZeusQuery: o as VType,
                returns: ReturnTypes,
                scalars: options.scalars,
                ops: Ops,
              }),
            );
          }
          return fnToCall(data);
        });
    }
    return returnedFunction;
  };

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends keyof typeof Ops,
  R extends keyof ValueTypes = GenericOperation<O>,
>(
  operation: O,
  o: Z,
  ops?: {
    operationOptions?: OperationOptions;
    scalars?: ScalarDefinition;
  },
) =>
  InternalsBuildQuery({
    props: AllTypesProps,
    returns: ReturnTypes,
    ops: Ops,
    options: ops?.operationOptions,
    scalars: ops?.scalars,
  })(operation, o as VType);

export const ZeusSelect = <T>() => ((t: unknown) => t) as SelectionFunction<T>;

export const Selector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();

export const TypeFromSelector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();
export const Gql = Chain(HOST, {
  headers: {
    'Content-Type': 'application/json',
    ...HEADERS,
  },
});

export const ZeusScalars = ZeusSelect<ScalarCoders>();

type ScalarsSelector<T> = {
  [X in Required<{
    [P in keyof T]: T[P] extends number | string | undefined | boolean ? P : never;
  }>[keyof T]]: true;
};

export const fields = <T extends keyof ModelTypes>(k: T) => {
  const t = ReturnTypes[k];
  const o = Object.fromEntries(
    Object.entries(t)
      .filter(([, value]) => {
        const isReturnType = ReturnTypes[value as string];
        if (!isReturnType || (typeof isReturnType === 'string' && isReturnType.startsWith('scalar.'))) {
          return true;
        }
      })
      .map(([key]) => [key, true as const]),
  );
  return o as ScalarsSelector<ModelTypes[T]>;
};

export const decodeScalarsInResponse = <O extends Operations>({
  response,
  scalars,
  returns,
  ops,
  initialZeusQuery,
  initialOp,
}: {
  ops: O;
  response: any;
  returns: ReturnTypesType;
  scalars?: Record<string, ScalarResolver | undefined>;
  initialOp: keyof O;
  initialZeusQuery: InputValueType | VType;
}) => {
  if (!scalars) {
    return response;
  }
  const builder = PrepareScalarPaths({
    ops,
    returns,
  });

  const scalarPaths = builder(initialOp as string, ops[initialOp], initialZeusQuery);
  if (scalarPaths) {
    const r = traverseResponse({ scalarPaths, resolvers: scalars })(initialOp as string, response, [ops[initialOp]]);
    return r;
  }
  return response;
};

export const traverseResponse = ({
  resolvers,
  scalarPaths,
}: {
  scalarPaths: { [x: string]: `scalar.${string}` };
  resolvers: {
    [x: string]: ScalarResolver | undefined;
  };
}) => {
  const ibb = (k: string, o: InputValueType | VType, p: string[] = []): unknown => {
    if (Array.isArray(o)) {
      return o.map((eachO) => ibb(k, eachO, p));
    }
    if (o == null) {
      return o;
    }
    const scalarPathString = p.join(SEPARATOR);
    const currentScalarString = scalarPaths[scalarPathString];
    if (currentScalarString) {
      const currentDecoder = resolvers[currentScalarString.split('.')[1]]?.decode;
      if (currentDecoder) {
        return currentDecoder(o);
      }
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string' || !o) {
      return o;
    }
    const entries = Object.entries(o).map(([k, v]) => [k, ibb(k, v, [...p, purifyGraphQLKey(k)])] as const);
    const objectFromEntries = entries.reduce<Record<string, unknown>>((a, [k, v]) => {
      a[k] = v;
      return a;
    }, {});
    return objectFromEntries;
  };
  return ibb;
};

export type AllTypesPropsType = {
  [x: string]:
    | undefined
    | `scalar.${string}`
    | 'enum'
    | {
        [x: string]:
          | undefined
          | string
          | {
              [x: string]: string | undefined;
            };
      };
};

export type ReturnTypesType = {
  [x: string]:
    | {
        [x: string]: string | undefined;
      }
    | `scalar.${string}`
    | undefined;
};
export type InputValueType = {
  [x: string]: undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
};
export type VType =
  | undefined
  | boolean
  | string
  | number
  | [any, undefined | boolean | InputValueType]
  | InputValueType;

export type PlainType = boolean | number | string | null | undefined;
export type ZeusArgsType =
  | PlainType
  | {
      [x: string]: ZeusArgsType;
    }
  | Array<ZeusArgsType>;

export type Operations = Record<string, string>;

export type VariableDefinition = {
  [x: string]: unknown;
};

export const SEPARATOR = '|';

export type fetchOptions = Parameters<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export type chainOptions = [fetchOptions[0], fetchOptions[1] & { websocket?: websocketOptions }] | [fetchOptions[0]];
export type FetchFunction = (query: string, variables?: Record<string, unknown>) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type OperationOptions = {
  operationName?: string;
};

export type ScalarCoder = Record<string, (s: unknown) => string>;

export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
export class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super('');
    console.error(response);
  }
  toString() {
    return 'GraphQL Response Error';
  }
}
export type GenericOperation<O> = O extends keyof typeof Ops ? typeof Ops[O] : never;
export type ThunderGraphQLOptions<SCLR extends ScalarDefinition> = {
  scalars?: SCLR | ScalarCoders;
};

const ExtractScalar = (mappedParts: string[], returns: ReturnTypesType): `scalar.${string}` | undefined => {
  if (mappedParts.length === 0) {
    return;
  }
  const oKey = mappedParts[0];
  const returnP1 = returns[oKey];
  if (typeof returnP1 === 'object') {
    const returnP2 = returnP1[mappedParts[1]];
    if (returnP2) {
      return ExtractScalar([returnP2, ...mappedParts.slice(2)], returns);
    }
    return undefined;
  }
  return returnP1 as `scalar.${string}` | undefined;
};

export const PrepareScalarPaths = ({ ops, returns }: { returns: ReturnTypesType; ops: Operations }) => {
  const ibb = (
    k: string,
    originalKey: string,
    o: InputValueType | VType,
    p: string[] = [],
    pOriginals: string[] = [],
    root = true,
  ): { [x: string]: `scalar.${string}` } | undefined => {
    if (!o) {
      return;
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
      const extractionArray = [...pOriginals, originalKey];
      const isScalar = ExtractScalar(extractionArray, returns);
      if (isScalar?.startsWith('scalar')) {
        const partOfTree = {
          [[...p, k].join(SEPARATOR)]: isScalar,
        };
        return partOfTree;
      }
      return {};
    }
    if (Array.isArray(o)) {
      return ibb(k, k, o[1], p, pOriginals, false);
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(alias, operationName, operation, p, pOriginals, false);
        })
        .reduce((a, b) => ({
          ...a,
          ...b,
        }));
    }
    const keyName = root ? ops[k] : k;
    return Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map(([k, v]) => {
        // Inline fragments shouldn't be added to the path as they aren't a field
        const isInlineFragment = originalKey.match(/^...\s*on/) != null;
        return ibb(
          k,
          k,
          v,
          isInlineFragment ? p : [...p, purifyGraphQLKey(keyName || k)],
          isInlineFragment ? pOriginals : [...pOriginals, purifyGraphQLKey(originalKey)],
          false,
        );
      })
      .reduce((a, b) => ({
        ...a,
        ...b,
      }));
  };
  return ibb;
};

export const purifyGraphQLKey = (k: string) => k.replace(/\([^)]*\)/g, '').replace(/^[^:]*\:/g, '');

const mapPart = (p: string) => {
  const [isArg, isField] = p.split('<>');
  if (isField) {
    return {
      v: isField,
      __type: 'field',
    } as const;
  }
  return {
    v: isArg,
    __type: 'arg',
  } as const;
};

type Part = ReturnType<typeof mapPart>;

export const ResolveFromPath = (props: AllTypesPropsType, returns: ReturnTypesType, ops: Operations) => {
  const ResolvePropsType = (mappedParts: Part[]) => {
    const oKey = ops[mappedParts[0].v];
    const propsP1 = oKey ? props[oKey] : props[mappedParts[0].v];
    if (propsP1 === 'enum' && mappedParts.length === 1) {
      return 'enum';
    }
    if (typeof propsP1 === 'string' && propsP1.startsWith('scalar.') && mappedParts.length === 1) {
      return propsP1;
    }
    if (typeof propsP1 === 'object') {
      if (mappedParts.length < 2) {
        return 'not';
      }
      const propsP2 = propsP1[mappedParts[1].v];
      if (typeof propsP2 === 'string') {
        return rpp(
          `${propsP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
      if (typeof propsP2 === 'object') {
        if (mappedParts.length < 3) {
          return 'not';
        }
        const propsP3 = propsP2[mappedParts[2].v];
        if (propsP3 && mappedParts[2].__type === 'arg') {
          return rpp(
            `${propsP3}${SEPARATOR}${mappedParts
              .slice(3)
              .map((mp) => mp.v)
              .join(SEPARATOR)}`,
          );
        }
      }
    }
  };
  const ResolveReturnType = (mappedParts: Part[]) => {
    if (mappedParts.length === 0) {
      return 'not';
    }
    const oKey = ops[mappedParts[0].v];
    const returnP1 = oKey ? returns[oKey] : returns[mappedParts[0].v];
    if (typeof returnP1 === 'object') {
      if (mappedParts.length < 2) return 'not';
      const returnP2 = returnP1[mappedParts[1].v];
      if (returnP2) {
        return rpp(
          `${returnP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
    }
  };
  const rpp = (path: string): 'enum' | 'not' | `scalar.${string}` => {
    const parts = path.split(SEPARATOR).filter((l) => l.length > 0);
    const mappedParts = parts.map(mapPart);
    const propsP1 = ResolvePropsType(mappedParts);
    if (propsP1) {
      return propsP1;
    }
    const returnP1 = ResolveReturnType(mappedParts);
    if (returnP1) {
      return returnP1;
    }
    return 'not';
  };
  return rpp;
};

export const InternalArgsBuilt = ({
  props,
  ops,
  returns,
  scalars,
  vars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  scalars?: ScalarDefinition;
  vars: Array<{ name: string; graphQLType: string }>;
}) => {
  const arb = (a: ZeusArgsType, p = '', root = true): string => {
    if (typeof a === 'string') {
      if (a.startsWith(START_VAR_NAME)) {
        const [varName, graphQLType] = a.replace(START_VAR_NAME, '$').split(GRAPHQL_TYPE_SEPARATOR);
        const v = vars.find((v) => v.name === varName);
        if (!v) {
          vars.push({
            name: varName,
            graphQLType,
          });
        } else {
          if (v.graphQLType !== graphQLType) {
            throw new Error(
              `Invalid variable exists with two different GraphQL Types, "${v.graphQLType}" and ${graphQLType}`,
            );
          }
        }
        return varName;
      }
    }
    const checkType = ResolveFromPath(props, returns, ops)(p);
    if (checkType.startsWith('scalar.')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...splittedScalar] = checkType.split('.');
      const scalarKey = splittedScalar.join('.');
      return (scalars?.[scalarKey]?.encode?.(a) as string) || JSON.stringify(a);
    }
    if (Array.isArray(a)) {
      return `[${a.map((arr) => arb(arr, p, false)).join(', ')}]`;
    }
    if (typeof a === 'string') {
      if (checkType === 'enum') {
        return a;
      }
      return `${JSON.stringify(a)}`;
    }
    if (typeof a === 'object') {
      if (a === null) {
        return `null`;
      }
      const returnedObjectString = Object.entries(a)
        .filter(([, v]) => typeof v !== 'undefined')
        .map(([k, v]) => `${k}: ${arb(v, [p, k].join(SEPARATOR), false)}`)
        .join(',\n');
      if (!root) {
        return `{${returnedObjectString}}`;
      }
      return returnedObjectString;
    }
    return `${a}`;
  };
  return arb;
};

export const resolverFor = <X, T extends keyof ResolverInputTypes, Z extends keyof ResolverInputTypes[T]>(
  type: T,
  field: Z,
  fn: (
    args: Required<ResolverInputTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : never,
) => fn as (args?: any, source?: any) => ReturnType<typeof fn>;

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<UnwrapPromise<ReturnType<T>>>;
export type ZeusHook<
  T extends (...args: any[]) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>,
> = ZeusState<ReturnType<T>[N]>;

export type WithTypeNameValue<T> = T & {
  __typename?: boolean;
  __directives?: string;
};
export type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
export type ScalarDefinition = Record<string, ScalarResolver>;

type IsScalar<S, SCLR extends ScalarDefinition> = S extends 'scalar' & { name: infer T }
  ? T extends keyof SCLR
    ? SCLR[T]['decode'] extends (s: unknown) => unknown
      ? ReturnType<SCLR[T]['decode']>
      : unknown
    : unknown
  : S;
type IsArray<T, U, SCLR extends ScalarDefinition> = T extends Array<infer R>
  ? InputType<R, U, SCLR>[]
  : InputType<T, U, SCLR>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;
type BaseZeusResolver = boolean | 1 | string | Variable<any, string>;

type IsInterfaced<SRC extends DeepAnify<DST>, DST, SCLR extends ScalarDefinition> = FlattenArray<SRC> extends
  | ZEUS_INTERFACES
  | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P], SCLR>
          : IsArray<R, '__typename' extends keyof DST ? { __typename: true } : Record<string, never>, SCLR>
        : never;
    }[keyof SRC] & {
      [P in keyof Omit<
        Pick<
          SRC,
          {
            [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
          }[keyof DST]
        >,
        '__typename'
      >]: IsPayLoad<DST[P]> extends BaseZeusResolver ? IsScalar<SRC[P], SCLR> : IsArray<SRC[P], DST[P], SCLR>;
    }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends BaseZeusResolver
        ? IsScalar<SRC[P], SCLR>
        : IsArray<SRC[P], DST[P], SCLR>;
    };

export type MapType<SRC, DST, SCLR extends ScalarDefinition> = SRC extends DeepAnify<DST>
  ? IsInterfaced<SRC, DST, SCLR>
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
export type InputType<SRC, DST, SCLR extends ScalarDefinition = {}> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P], SCLR>[keyof MapType<SRC, R[P], SCLR>];
    } & MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>, SCLR>
  : MapType<SRC, IsPayLoad<DST>, SCLR>;
export type SubscriptionToGraphQL<Z, T, SCLR extends ScalarDefinition> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z, SCLR>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z, SCLR>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z, SCLR>; errors?: string[] }) => void) => void;
  open: () => void;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type FromSelector<SELECTOR, NAME extends keyof GraphQLTypes, SCLR extends ScalarDefinition = {}> = InputType<
  GraphQLTypes[NAME],
  SELECTOR,
  SCLR
>;

export type ScalarResolver = {
  encode?: (s: unknown) => string;
  decode?: (s: unknown) => unknown;
};

export type SelectionFunction<V> = <Z extends V>(
  t: Z & {
    [P in keyof Z]: P extends keyof V ? Z[P] : never;
  },
) => Z;

type BuiltInVariableTypes = {
  ['String']: string;
  ['Int']: number;
  ['Float']: number;
  ['ID']: unknown;
  ['Boolean']: boolean;
};
type AllVariableTypes = keyof BuiltInVariableTypes | keyof ZEUS_VARIABLES;
type VariableRequired<T extends string> = `${T}!` | T | `[${T}]` | `[${T}]!` | `[${T}!]` | `[${T}!]!`;
type VR<T extends string> = VariableRequired<VariableRequired<T>>;

export type GraphQLVariableType = VR<AllVariableTypes>;

type ExtractVariableTypeString<T extends string> = T extends VR<infer R1>
  ? R1 extends VR<infer R2>
    ? R2 extends VR<infer R3>
      ? R3 extends VR<infer R4>
        ? R4 extends VR<infer R5>
          ? R5
          : R4
        : R3
      : R2
    : R1
  : T;

type DecomposeType<T, Type> = T extends `[${infer R}]`
  ? Array<DecomposeType<R, Type>> | undefined
  : T extends `${infer R}!`
  ? NonNullable<DecomposeType<R, Type>>
  : Type | undefined;

type ExtractTypeFromGraphQLType<T extends string> = T extends keyof ZEUS_VARIABLES
  ? ZEUS_VARIABLES[T]
  : T extends keyof BuiltInVariableTypes
  ? BuiltInVariableTypes[T]
  : any;

export type GetVariableType<T extends string> = DecomposeType<
  T,
  ExtractTypeFromGraphQLType<ExtractVariableTypeString<T>>
>;

type UndefinedKeys<T> = {
  [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? never : K;
}[keyof T];

type WithNullableKeys<T> = Pick<T, UndefinedKeys<T>>;
type WithNonNullableKeys<T> = Omit<T, UndefinedKeys<T>>;

type OptionalKeys<T> = {
  [P in keyof T]?: T[P];
};

export type WithOptionalNullables<T> = OptionalKeys<WithNullableKeys<T>> & WithNonNullableKeys<T>;

export type Variable<T extends GraphQLVariableType, Name extends string> = {
  ' __zeus_name': Name;
  ' __zeus_type': T;
};

export type ExtractVariablesDeep<Query> = Query extends Variable<infer VType, infer VName>
  ? { [key in VName]: GetVariableType<VType> }
  : Query extends string | number | boolean | Array<string | number | boolean>
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : UnionToIntersection<{ [K in keyof Query]: WithOptionalNullables<ExtractVariablesDeep<Query[K]>> }[keyof Query]>;

export type ExtractVariables<Query> = Query extends Variable<infer VType, infer VName>
  ? { [key in VName]: GetVariableType<VType> }
  : Query extends [infer Inputs, infer Outputs]
  ? ExtractVariablesDeep<Inputs> & ExtractVariables<Outputs>
  : Query extends string | number | boolean | Array<string | number | boolean>
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : UnionToIntersection<{ [K in keyof Query]: WithOptionalNullables<ExtractVariables<Query[K]>> }[keyof Query]>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export const START_VAR_NAME = `$ZEUS_VAR`;
export const GRAPHQL_TYPE_SEPARATOR = `__$GRAPHQL__`;

export const $ = <Type extends GraphQLVariableType, Name extends string>(name: Name, graphqlType: Type) => {
  return (START_VAR_NAME + name + GRAPHQL_TYPE_SEPARATOR + graphqlType) as unknown as Variable<Type, Name>;
};
type ZEUS_INTERFACES = never
export type ScalarCoders = {
}
type ZEUS_UNIONS = never

export type ValueTypes = {
    ["DealDTO"]: AliasType<{
	dealPrice?:boolean | `@${string}`,
	dealQuantity?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	product?:ValueTypes["ProductDTO"],
		__typename?: boolean | `@${string}`
}>;
	["DealPaginatedType"]: AliasType<{
	items?:ValueTypes["DealDTO"],
	meta?:ValueTypes["PaginationMeta"],
		__typename?: boolean | `@${string}`
}>;
	["DealSortChoices"]:DealSortChoices;
	["ExtendedProductDTO"]: AliasType<{
	dealHistory?:ValueTypes["ProductDealHistoryDTO"],
	id?:boolean | `@${string}`,
	imageUrl?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
	priceHistory?:ValueTypes["ProductPriceHistoryDTO"],
	productUrl?:boolean | `@${string}`,
	shop?:ValueTypes["ShopDTO"],
		__typename?: boolean | `@${string}`
}>;
	["Mutation"]: AliasType<{
addPasskey?: [{	registration: string | Variable<any, string>},boolean | `@${string}`],
loginUser?: [{	authentication: string | Variable<any, string>},boolean | `@${string}`],
	logoutUser?:boolean | `@${string}`,
registerUser?: [{	registration: string | Variable<any, string>},boolean | `@${string}`],
resolveUnknownDeal?: [{	id: string | Variable<any, string>},boolean | `@${string}`],
startScraper?: [{	name: string | Variable<any, string>},boolean | `@${string}`],
startTask?: [{	name: string | Variable<any, string>},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["Order"]:Order;
	["PaginationMeta"]: AliasType<{
	currentPage?:boolean | `@${string}`,
	itemCount?:boolean | `@${string}`,
	itemsPerPage?:boolean | `@${string}`,
	totalItems?:boolean | `@${string}`,
	totalPages?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ProductDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	imageUrl?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
	productUrl?:boolean | `@${string}`,
	shop?:ValueTypes["ShopDTO"],
		__typename?: boolean | `@${string}`
}>;
	["ProductDealHistoryDTO"]: AliasType<{
	createdOn?:boolean | `@${string}`,
	dealPrice?:boolean | `@${string}`,
	dealQuantity?:boolean | `@${string}`,
	deletedOn?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ProductPaginatedType"]: AliasType<{
	items?:ValueTypes["ProductDTO"],
	meta?:ValueTypes["PaginationMeta"],
		__typename?: boolean | `@${string}`
}>;
	["ProductPriceHistoryDTO"]: AliasType<{
	createdOn?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ProductSortChoices"]:ProductSortChoices;
	["Query"]: AliasType<{
	challenge?:boolean | `@${string}`,
deal?: [{	id: string | Variable<any, string>},ValueTypes["DealDTO"]],
deals?: [{	limit?: number | undefined | null | Variable<any, string>,	order?: ValueTypes["Order"] | undefined | null | Variable<any, string>,	page?: number | undefined | null | Variable<any, string>,	query?: string | undefined | null | Variable<any, string>,	shop?: string | undefined | null | Variable<any, string>,	sort?: Array<ValueTypes["DealSortChoices"]> | undefined | null | Variable<any, string>},ValueTypes["DealPaginatedType"]],
product?: [{	id: string | Variable<any, string>},ValueTypes["ExtendedProductDTO"]],
products?: [{	limit?: number | undefined | null | Variable<any, string>,	order?: ValueTypes["Order"] | undefined | null | Variable<any, string>,	page?: number | undefined | null | Variable<any, string>,	query?: string | undefined | null | Variable<any, string>,	shop?: string | undefined | null | Variable<any, string>,	sort?: Array<ValueTypes["ProductSortChoices"]> | undefined | null | Variable<any, string>},ValueTypes["ProductPaginatedType"]],
service?: [{	id: string | Variable<any, string>},ValueTypes["ServiceHealthDTO"]],
	services?:ValueTypes["ServiceHealthDTO"],
	session?:ValueTypes["SessionDTO"],
	shops?:ValueTypes["ShopDTO"],
task?: [{	name: string | Variable<any, string>},ValueTypes["TaskDTO"]],
	tasks?:ValueTypes["TaskDTO"],
	unknownDeals?:ValueTypes["UnknownDealDTO"],
user?: [{	id?: string | undefined | null | Variable<any, string>},ValueTypes["UserDTO"]],
	users?:ValueTypes["UserDTO"],
		__typename?: boolean | `@${string}`
}>;
	["ServiceHealthDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	queue?:boolean | `@${string}`,
	status?:ValueTypes["StatusDTO"],
	type?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ServiceType"]:ServiceType;
	["SessionDTO"]: AliasType<{
	user?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ShopDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["StatusDTO"]: AliasType<{
	status?:boolean | `@${string}`,
	uptime?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["TaskDTO"]: AliasType<{
	lastRun?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	nextRun?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UnknownDealDTO"]: AliasType<{
	deal?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	productUrl?:boolean | `@${string}`,
	shop?:ValueTypes["ShopDTO"],
		__typename?: boolean | `@${string}`
}>;
	["UserDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	isAdmin?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>
  }

export type ResolverInputTypes = {
    ["DealDTO"]: AliasType<{
	dealPrice?:boolean | `@${string}`,
	dealQuantity?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	product?:ResolverInputTypes["ProductDTO"],
		__typename?: boolean | `@${string}`
}>;
	["DealPaginatedType"]: AliasType<{
	items?:ResolverInputTypes["DealDTO"],
	meta?:ResolverInputTypes["PaginationMeta"],
		__typename?: boolean | `@${string}`
}>;
	["DealSortChoices"]:DealSortChoices;
	["ExtendedProductDTO"]: AliasType<{
	dealHistory?:ResolverInputTypes["ProductDealHistoryDTO"],
	id?:boolean | `@${string}`,
	imageUrl?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
	priceHistory?:ResolverInputTypes["ProductPriceHistoryDTO"],
	productUrl?:boolean | `@${string}`,
	shop?:ResolverInputTypes["ShopDTO"],
		__typename?: boolean | `@${string}`
}>;
	["Mutation"]: AliasType<{
addPasskey?: [{	registration: string},boolean | `@${string}`],
loginUser?: [{	authentication: string},boolean | `@${string}`],
	logoutUser?:boolean | `@${string}`,
registerUser?: [{	registration: string},boolean | `@${string}`],
resolveUnknownDeal?: [{	id: string},boolean | `@${string}`],
startScraper?: [{	name: string},boolean | `@${string}`],
startTask?: [{	name: string},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["Order"]:Order;
	["PaginationMeta"]: AliasType<{
	currentPage?:boolean | `@${string}`,
	itemCount?:boolean | `@${string}`,
	itemsPerPage?:boolean | `@${string}`,
	totalItems?:boolean | `@${string}`,
	totalPages?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ProductDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	imageUrl?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
	productUrl?:boolean | `@${string}`,
	shop?:ResolverInputTypes["ShopDTO"],
		__typename?: boolean | `@${string}`
}>;
	["ProductDealHistoryDTO"]: AliasType<{
	createdOn?:boolean | `@${string}`,
	dealPrice?:boolean | `@${string}`,
	dealQuantity?:boolean | `@${string}`,
	deletedOn?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ProductPaginatedType"]: AliasType<{
	items?:ResolverInputTypes["ProductDTO"],
	meta?:ResolverInputTypes["PaginationMeta"],
		__typename?: boolean | `@${string}`
}>;
	["ProductPriceHistoryDTO"]: AliasType<{
	createdOn?:boolean | `@${string}`,
	price?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ProductSortChoices"]:ProductSortChoices;
	["Query"]: AliasType<{
	challenge?:boolean | `@${string}`,
deal?: [{	id: string},ResolverInputTypes["DealDTO"]],
deals?: [{	limit?: number | undefined | null,	order?: ResolverInputTypes["Order"] | undefined | null,	page?: number | undefined | null,	query?: string | undefined | null,	shop?: string | undefined | null,	sort?: Array<ResolverInputTypes["DealSortChoices"]> | undefined | null},ResolverInputTypes["DealPaginatedType"]],
product?: [{	id: string},ResolverInputTypes["ExtendedProductDTO"]],
products?: [{	limit?: number | undefined | null,	order?: ResolverInputTypes["Order"] | undefined | null,	page?: number | undefined | null,	query?: string | undefined | null,	shop?: string | undefined | null,	sort?: Array<ResolverInputTypes["ProductSortChoices"]> | undefined | null},ResolverInputTypes["ProductPaginatedType"]],
service?: [{	id: string},ResolverInputTypes["ServiceHealthDTO"]],
	services?:ResolverInputTypes["ServiceHealthDTO"],
	session?:ResolverInputTypes["SessionDTO"],
	shops?:ResolverInputTypes["ShopDTO"],
task?: [{	name: string},ResolverInputTypes["TaskDTO"]],
	tasks?:ResolverInputTypes["TaskDTO"],
	unknownDeals?:ResolverInputTypes["UnknownDealDTO"],
user?: [{	id?: string | undefined | null},ResolverInputTypes["UserDTO"]],
	users?:ResolverInputTypes["UserDTO"],
		__typename?: boolean | `@${string}`
}>;
	["ServiceHealthDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	queue?:boolean | `@${string}`,
	status?:ResolverInputTypes["StatusDTO"],
	type?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ServiceType"]:ServiceType;
	["SessionDTO"]: AliasType<{
	user?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["ShopDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["StatusDTO"]: AliasType<{
	status?:boolean | `@${string}`,
	uptime?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["TaskDTO"]: AliasType<{
	lastRun?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	nextRun?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["UnknownDealDTO"]: AliasType<{
	deal?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	productUrl?:boolean | `@${string}`,
	shop?:ResolverInputTypes["ShopDTO"],
		__typename?: boolean | `@${string}`
}>;
	["UserDTO"]: AliasType<{
	id?:boolean | `@${string}`,
	isAdmin?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	["schema"]: AliasType<{
	query?:ResolverInputTypes["Query"],
	mutation?:ResolverInputTypes["Mutation"],
		__typename?: boolean | `@${string}`
}>
  }

export type ModelTypes = {
    ["DealDTO"]: {
		dealPrice: number,
	dealQuantity: number,
	id: string,
	product: ModelTypes["ProductDTO"]
};
	["DealPaginatedType"]: {
		items: Array<ModelTypes["DealDTO"]>,
	meta: ModelTypes["PaginationMeta"]
};
	["DealSortChoices"]:DealSortChoices;
	["ExtendedProductDTO"]: {
		dealHistory: Array<ModelTypes["ProductDealHistoryDTO"]>,
	id: string,
	imageUrl: string,
	name: string,
	price: number,
	priceHistory: Array<ModelTypes["ProductPriceHistoryDTO"]>,
	productUrl: string,
	shop: ModelTypes["ShopDTO"]
};
	["Mutation"]: {
		addPasskey: boolean,
	loginUser: boolean,
	logoutUser: boolean,
	registerUser: boolean,
	resolveUnknownDeal: boolean,
	startScraper: boolean,
	startTask: boolean
};
	["Order"]:Order;
	["PaginationMeta"]: {
		currentPage: number,
	itemCount: number,
	itemsPerPage: number,
	totalItems?: number | undefined | null,
	totalPages?: number | undefined | null
};
	["ProductDTO"]: {
		id: string,
	imageUrl: string,
	name: string,
	price: number,
	productUrl: string,
	shop: ModelTypes["ShopDTO"]
};
	["ProductDealHistoryDTO"]: {
		createdOn: string,
	dealPrice: number,
	dealQuantity: number,
	deletedOn?: string | undefined | null
};
	["ProductPaginatedType"]: {
		items: Array<ModelTypes["ProductDTO"]>,
	meta: ModelTypes["PaginationMeta"]
};
	["ProductPriceHistoryDTO"]: {
		createdOn: string,
	price: number
};
	["ProductSortChoices"]:ProductSortChoices;
	["Query"]: {
		challenge: string,
	deal?: ModelTypes["DealDTO"] | undefined | null,
	deals: ModelTypes["DealPaginatedType"],
	product?: ModelTypes["ExtendedProductDTO"] | undefined | null,
	products: ModelTypes["ProductPaginatedType"],
	service?: ModelTypes["ServiceHealthDTO"] | undefined | null,
	services: Array<ModelTypes["ServiceHealthDTO"]>,
	session: ModelTypes["SessionDTO"],
	shops: Array<ModelTypes["ShopDTO"]>,
	task?: ModelTypes["TaskDTO"] | undefined | null,
	tasks: Array<ModelTypes["TaskDTO"]>,
	unknownDeals: Array<ModelTypes["UnknownDealDTO"]>,
	user?: ModelTypes["UserDTO"] | undefined | null,
	users: Array<ModelTypes["UserDTO"]>
};
	["ServiceHealthDTO"]: {
		id: string,
	name: string,
	queue: string,
	status: ModelTypes["StatusDTO"],
	type: ModelTypes["ServiceType"]
};
	["ServiceType"]:ServiceType;
	["SessionDTO"]: {
		user?: string | undefined | null
};
	["ShopDTO"]: {
		id: string,
	name: string
};
	["StatusDTO"]: {
		status: string,
	uptime?: number | undefined | null
};
	["TaskDTO"]: {
		lastRun?: string | undefined | null,
	name: string,
	nextRun: string
};
	["UnknownDealDTO"]: {
		deal: string,
	id: string,
	productUrl: string,
	shop: ModelTypes["ShopDTO"]
};
	["UserDTO"]: {
		id: string,
	isAdmin: boolean,
	username: string
};
	["schema"]: {
	query?: ModelTypes["Query"] | undefined | null,
	mutation?: ModelTypes["Mutation"] | undefined | null
}
    }

export type GraphQLTypes = {
    // ------------------------------------------------------;
	// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY);
	// ------------------------------------------------------;
	["DealDTO"]: {
	__typename: "DealDTO",
	dealPrice: number,
	dealQuantity: number,
	id: string,
	product: GraphQLTypes["ProductDTO"]
};
	["DealPaginatedType"]: {
	__typename: "DealPaginatedType",
	items: Array<GraphQLTypes["DealDTO"]>,
	meta: GraphQLTypes["PaginationMeta"]
};
	["DealSortChoices"]: DealSortChoices;
	["ExtendedProductDTO"]: {
	__typename: "ExtendedProductDTO",
	dealHistory: Array<GraphQLTypes["ProductDealHistoryDTO"]>,
	id: string,
	imageUrl: string,
	name: string,
	price: number,
	priceHistory: Array<GraphQLTypes["ProductPriceHistoryDTO"]>,
	productUrl: string,
	shop: GraphQLTypes["ShopDTO"]
};
	["Mutation"]: {
	__typename: "Mutation",
	addPasskey: boolean,
	loginUser: boolean,
	logoutUser: boolean,
	registerUser: boolean,
	resolveUnknownDeal: boolean,
	startScraper: boolean,
	startTask: boolean
};
	["Order"]: Order;
	["PaginationMeta"]: {
	__typename: "PaginationMeta",
	currentPage: number,
	itemCount: number,
	itemsPerPage: number,
	totalItems?: number | undefined | null,
	totalPages?: number | undefined | null
};
	["ProductDTO"]: {
	__typename: "ProductDTO",
	id: string,
	imageUrl: string,
	name: string,
	price: number,
	productUrl: string,
	shop: GraphQLTypes["ShopDTO"]
};
	["ProductDealHistoryDTO"]: {
	__typename: "ProductDealHistoryDTO",
	createdOn: string,
	dealPrice: number,
	dealQuantity: number,
	deletedOn?: string | undefined | null
};
	["ProductPaginatedType"]: {
	__typename: "ProductPaginatedType",
	items: Array<GraphQLTypes["ProductDTO"]>,
	meta: GraphQLTypes["PaginationMeta"]
};
	["ProductPriceHistoryDTO"]: {
	__typename: "ProductPriceHistoryDTO",
	createdOn: string,
	price: number
};
	["ProductSortChoices"]: ProductSortChoices;
	["Query"]: {
	__typename: "Query",
	challenge: string,
	deal?: GraphQLTypes["DealDTO"] | undefined | null,
	deals: GraphQLTypes["DealPaginatedType"],
	product?: GraphQLTypes["ExtendedProductDTO"] | undefined | null,
	products: GraphQLTypes["ProductPaginatedType"],
	service?: GraphQLTypes["ServiceHealthDTO"] | undefined | null,
	services: Array<GraphQLTypes["ServiceHealthDTO"]>,
	session: GraphQLTypes["SessionDTO"],
	shops: Array<GraphQLTypes["ShopDTO"]>,
	task?: GraphQLTypes["TaskDTO"] | undefined | null,
	tasks: Array<GraphQLTypes["TaskDTO"]>,
	unknownDeals: Array<GraphQLTypes["UnknownDealDTO"]>,
	user?: GraphQLTypes["UserDTO"] | undefined | null,
	users: Array<GraphQLTypes["UserDTO"]>
};
	["ServiceHealthDTO"]: {
	__typename: "ServiceHealthDTO",
	id: string,
	name: string,
	queue: string,
	status: GraphQLTypes["StatusDTO"],
	type: GraphQLTypes["ServiceType"]
};
	["ServiceType"]: ServiceType;
	["SessionDTO"]: {
	__typename: "SessionDTO",
	user?: string | undefined | null
};
	["ShopDTO"]: {
	__typename: "ShopDTO",
	id: string,
	name: string
};
	["StatusDTO"]: {
	__typename: "StatusDTO",
	status: string,
	uptime?: number | undefined | null
};
	["TaskDTO"]: {
	__typename: "TaskDTO",
	lastRun?: string | undefined | null,
	name: string,
	nextRun: string
};
	["UnknownDealDTO"]: {
	__typename: "UnknownDealDTO",
	deal: string,
	id: string,
	productUrl: string,
	shop: GraphQLTypes["ShopDTO"]
};
	["UserDTO"]: {
	__typename: "UserDTO",
	id: string,
	isAdmin: boolean,
	username: string
}
    }
export enum DealSortChoices {
	DEAL_PRICE = "DEAL_PRICE",
	PRODUCT_NAME = "PRODUCT_NAME",
	PRODUCT_PRICE = "PRODUCT_PRICE",
	SAVINGS = "SAVINGS",
	SAVINGS_PERCENTAGE = "SAVINGS_PERCENTAGE"
}
export enum Order {
	ASCENDING = "ASCENDING",
	DESCENDING = "DESCENDING"
}
export enum ProductSortChoices {
	PRODUCT_NAME = "PRODUCT_NAME",
	PRODUCT_PRICE = "PRODUCT_PRICE"
}
export enum ServiceType {
	CORE = "CORE",
	SCRAPER = "SCRAPER"
}

type ZEUS_VARIABLES = {
	["DealSortChoices"]: ValueTypes["DealSortChoices"];
	["Order"]: ValueTypes["Order"];
	["ProductSortChoices"]: ValueTypes["ProductSortChoices"];
	["ServiceType"]: ValueTypes["ServiceType"];
}