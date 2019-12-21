import React from "react";
export const TextField = React.forwardRef(function TextField(props, ref) {
  const { readOnly, type = "text", ...inputProps } = props;
  return (
    <input
      {...{
        ref,
        type,
        disabled: readOnly,
        ...inputProps
      }}
    />
  );
});
