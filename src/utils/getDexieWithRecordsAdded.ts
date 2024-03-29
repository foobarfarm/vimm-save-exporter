import Dexie from 'dexie';

interface GetDexieWithRecordsAddedProps {
  databaseName: string;
  objectStoreName: string;
  objectStoreSchema: string;
  records: any[];
}

type ConfiguredDexie<ObjectStoreName extends string> = Dexie &
  Record<
    ObjectStoreName,
    {
      get: (key: string) => Promise<any>;
      add: (item: any, key: string) => Promise<void>;
    }
  >;

export const getDexieWithRecordsAdded = async ({
  databaseName,
  objectStoreName,
  objectStoreSchema,
  records,
}: GetDexieWithRecordsAddedProps): Promise<
  ConfiguredDexie<typeof objectStoreName>
> => {
  const database = new Dexie(databaseName) as ConfiguredDexie<
    typeof objectStoreName
  >;

  database.version(1).stores({
    [objectStoreName]: objectStoreSchema,
  });

  const objectStore = database[objectStoreName];

  for (let { key, item } of records) {
    await objectStore.add(item, key);
  }

  return database;
};
