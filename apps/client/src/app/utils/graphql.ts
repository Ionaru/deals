import { TypedDocumentNode } from "apollo-angular";

export type GqlResponse<T> =
  T extends TypedDocumentNode<infer R, never> ? R : never;
