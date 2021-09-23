import { useState, useContext } from "react";
import Context from "../Context/Context";

function useFile(defaultValue = null) {
  const [file, setFile] = useState(defaultValue);
  const { addNot } = useContext(Context);

  function fileSizeHandler() {
    let sizeType = ['B', 'KB', 'MB', 'TB'], 
    size = 0, 
    fileSize = file ? file.size : 0;

    while (fileSize % 1024 === 0) {
      fileSize = fileSize / 1024;
      size++;
    }

    if(fileSize >= 1024) {
      fileSize = fileSize / 1024;
      size++;
    }
    return `${Math.round(fileSize)} ${sizeType[size]}`
  }

  function fileHandler(files) {
    let icon = files[0];

    if (!icon) {
      addNot(1, 'Error: we not upload any file');
      return;
    }

    if (icon.type.replace(/\/.+/, '') === 'image') {
      setFile(icon);
    } else {
      addNot(1, 'Error: we attempt upload not a image type file');
    }
  }

  const fileValue = file ? {
    name: file.name,
    type: file.type,
    img: URL.createObjectURL(file),
    size: file.size,
    sizeMod: fileSizeHandler()
  } : null;

  return {
    bind: {
      type: 'file',
      onChange: (e) => fileHandler(e.target.files)
    },
    clear: () => {
      URL.revokeObjectURL(file);
      setFile(defaultValue);
    },
    value: () => fileValue
  }
}

export default useFile;