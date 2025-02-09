import Opaque from 'ts-opaque';

export type DatabaseTableName = Opaque<string, 'database-table-name'>;

export type DatabaseEntity<IdType> = {
  id: IdType;
  createdAt: number;
  lock?: boolean;
};
