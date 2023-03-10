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
      get: (id: string) => Promise<any>;
      add: (record: any) => Promise<void>;
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

  for (let record of records) {
    await objectStore.add(record);
  }

  return database;
};
