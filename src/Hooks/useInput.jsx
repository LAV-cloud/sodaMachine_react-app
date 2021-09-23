import { useState } from 'react';

function useInput(defaultValue = '', type = 'text') {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      type,
      onChange: (e) => setValue(e.target.value),
    },
    clear: () => setValue(defaultValue),
    value: () => value
  }
}

export default useInput;