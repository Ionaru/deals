import { CredentialKey } from '@passwordless-id/webauthn/dist/esm/types';
import { Column } from 'typeorm';

export class Credential implements CredentialKey {
    @Column({ type: 'string' })
    id!: string;
    @Column({ type: 'string' })
    publicKey!: string;
    @Column({ type: 'string' })
    algorithm!: 'RS256' | 'ES256';
}
