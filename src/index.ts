import { exportSave } from './use-cases/export-save/exportSave';
import { importSave } from './use-cases/import-save/importSave';

const gameHeading = document.querySelector(
  '#main > div.innerMain > div > div.mainContent > h2'
);

const exportButton = document.createElement('button');
exportButton.innerText = 'Export Save';
exportButton.onclick = () => {
  (async () => {
    await exportSave();
  })();
};

gameHeading.append(exportButton);

const importButton = document.createElement('button');
importButton.innerText = 'Import Save';
importButton.onclick = () => {
  (async () => {
    await importSave();

    location.reload();
  })();
};

gameHeading.append(importButton);
