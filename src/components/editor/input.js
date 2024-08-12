// src/MonacoEditorComponent.js
import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';


const MonacoEditorComponent = (props) => {
    const handleEditorChange = (value, event) => {
        props.method(value);
        console.log('Editor content:', value,event);
    };

    useEffect(()=>{
      // 获取当前登陆钱包账户
      handleEditorChange(props.code)
    }, [props])

  return (
    <Editor
      height="40vh"
      defaultLanguage={props.language}
      defaultValue={props.code}
      value={props.code}
      onChange={handleEditorChange}
    />
  );
};

export default MonacoEditorComponent;
