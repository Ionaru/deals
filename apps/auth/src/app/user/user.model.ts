/* eslint-disable max-classes-per-file */
import { CredentialKey } from '@passwordless-id/webauthn/dist/esm/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
} from 'typeorm';

export class Credential implements CredentialKey {
    @Column({ type: 'string' })
    id!: string;
    @Column({ type: 'string' })
    publicKey!: string;
    @Column({ type: 'string' })
    algorithm!: 'RS256' | 'ES256';
}

@Entity()
export class User {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ type: 'string' })
    username!: string;

    // @Type(() => Credential)
    @Column(() => Credential, { array: true })
    credentials!: Credential[];

    @CreateDateColumn()
    createdAt!: string;
}
