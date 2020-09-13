import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

function Input({ name, ...rest }, ref) {
  const inputElementRef = useRef(null);

  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <TextInput
      ref={inputElementRef}
      defaultValue={defaultValue}
      onChangeText={(value) => {
        inputValueRef.current.value = value;
      }}
      {...rest}
    />
  );
}

export default forwardRef(Input);

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
