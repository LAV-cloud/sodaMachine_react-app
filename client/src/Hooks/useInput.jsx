import { useState } from 'react';

function useInput(defaultValue = '', type = 'text') {
  const [value, setValue] = useState(defaultValue);

  function isEmpty() {
    if (type === 'text') {
      if (value === '') return true;
    }
    return false;
  }

  return {
    bind: {
      value,
      type,
      onChange: (e) => setValue(e.target.value),
    },
    isEmpty: isEmpty(),
    clear: () => setValue(defaultValue),
    value: () => value
  }
}

export default useInput;