import { IOC } from '../../config/IOC';

export const importSave = () => {
  const ioc = new IOC();

  ioc.configure();

  console.log('calling compiled code');
  // Get primary key from game name
  // Request serialised save contents from client machine
  // Look up game in indexedDB
  // Overwrite serialised contents in IndexedDB
};
