export const downloadFile: DownloadFile = async (
  name: string,
  contents: string
) => {
  const fileHandle = await getNewFileHandle(name);

  await writeFile(fileHandle, contents);
};

const getNewFileHandle = async (suggestedName: string) => {
  const options: SaveFilePickerOptions = {
    suggestedName,
    types: [
      {
        description: 'JSON Files',
        accept: {
          'text/json': ['.json'],
        },
      },
    ],
  };
  const fileHandle = await window.showSaveFilePicker(options);

  return fileHandle;
};

const writeFile = async (
  fileHandle: FileSystemFileHandle,
  contents: string
) => {
  const writable = await fileHandle.createWritable();

  await writable.write(contents);
  await writable.close();
};
