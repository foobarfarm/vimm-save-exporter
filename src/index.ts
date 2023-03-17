import { exportSave } from './use-cases/export-save/exportSave';

(window as any).exportSave = () => {
  (async () => {
    await exportSave();
  })();
};
