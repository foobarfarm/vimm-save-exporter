export const uploadFile: UploadFile = async () => {
  const [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: 'JSON Files',
        accept: {
          'text/json': ['.json'],
        },
      },
    ],
  });

  const file = await fileHandle.getFile();
  const contents = await file.text();

  return contents;
};
