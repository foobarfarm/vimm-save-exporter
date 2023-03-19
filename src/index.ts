import { exportSave } from './use-cases/export-save/exportSave';
import { importSave } from './use-cases/import-save/importSave';

(window as any).exportSave = () => {
  (async () => {
    await exportSave();
  })();
};

(window as any).importSave = () => {
  (async () => {
    await importSave();
  })();
};
