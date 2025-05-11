import { ArgsType, Field, InputType } from "@nestjs/graphql";
import type {
  AuthenticatorAssertionResponseJSON,
  User,
} from "@passwordless-id/webauthn/dist/esm/types.js";

export const descriptions = {
  id: "ID of the credential, this should be created by the authenticator",
  rawId: "base64 encoded version of the credential ID",
  response: {
    attestationObject:
      "base64 encoded AuthenticatorAttestationResponse.attestationObject",
    authenticatorData:
      "base64 encoded AuthenticatorAttestationResponse.authenticatorData",
    clientDataJSON:
      "base64 encoded AuthenticatorAttestationResponse.clientDataJSON",
    transports: ["AuthenticatorAttestationResponse.transports"],
    publicKey: "base64 encoded AuthenticatorAttestationResponse.getPublicKey",
    publicKeyAlgorithm:
      "The public key algorithm of the credential in COSEAlgorithmIdentifier format, usually a negative number. This server only supports -7 (ES256) and -257 (RS256).",
    signature: "base64 encoded AuthenticatorAttestationResponse.signature",
    userHandle: "base64 encoded AuthenticatorAssertionResponse.userHandle",
  },
  clientExtensionResults: {},
  user: {
    id: "ID of the user",
    name: "Name of the user",
    displayName: "Display name of the user",
  },
  type: 'The credential type, should always be "public-key"',
} as const;

@InputType()
export class AuthenticatorAssertionResponseDTO
  implements AuthenticatorAssertionResponseJSON
{
  @Field(() => String, { description: descriptions.response.clientDataJSON })
  clientDataJSON!: string;

  @Field(() => String, { description: descriptions.response.authenticatorData })
  authenticatorData!: string;

  @Field(() => String, { description: descriptions.response.signature })
  signature!: string;
}

@ArgsType()
export class AuthenticationDTO {
  @Field(() => String, { description: descriptions.id })
  id!: string;

  @Field(() => AuthenticatorAssertionResponseDTO)
  response!: AuthenticatorAssertionResponseDTO;
}

@InputType()
export class UserDTO implements User {
  @Field(() => String, { description: descriptions.user.name })
  name!: string;
}

@InputType()
export class AuthenticatorAttestationResponseDTO {
  @Field(() => String, { description: descriptions.response.clientDataJSON })
  clientDataJSON!: string;

  @Field(() => String, { description: descriptions.response.authenticatorData })
  authenticatorData!: string;

  @Field(() => String, { description: descriptions.response.publicKey })
  publicKey!: string;

  @Field(() => Number, {
    description: descriptions.response.publicKeyAlgorithm,
  })
  publicKeyAlgorithm!: number;
}

@ArgsType()
export class RegistrationDTO {
  @Field(() => String, { description: descriptions.id })
  id!: string;

  @Field(() => AuthenticatorAttestationResponseDTO)
  response!: AuthenticatorAttestationResponseDTO;

  @Field(() => UserDTO)
  user!: UserDTO;
}
