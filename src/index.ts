import { exportSave } from './use-cases/export-save/exportSave';

(async () => {
  try {
    await exportSave();
  } catch (error) {
    console.error('error occured', error);
  }
})();
