import React, {useState, useCallback} from 'react';

type Props = {
  initialValue: string;
};

const CodeEditor = ({initialValue}: Props) => {
  const [value, setValue] = useState(initialValue);
  const handleValueChange = useCallback(e => setValue(e.currentTarget.value), [setValue]);
  return <textarea value={value} onChange={handleValueChange} />;
};

export default CodeEditor;
