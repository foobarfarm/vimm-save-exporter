import { exportSave } from './use-cases/export-save/exportSave';
import { importSave } from './use-cases/import-save/importSave';

const exportSaveButton = document.getElementById('export-save-button');
exportSaveButton.addEventListener(
  'click',
  () => {
    (async () => {
      await exportSave();
    })();
  },
  false
);

const importSaveButton = document.getElementById('import-save-button');
importSaveButton.addEventListener(
  'click',
  () => {
    (async () => {
      await importSave();
    })();
  },
  false
);
