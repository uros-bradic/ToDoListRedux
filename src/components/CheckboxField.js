import React from "react";

export const CheckBoxField = React.forwardRef(function CheckBoxField(
  props,
  ref
) {
  const { readOnly, title, type = "checkbox", ...inputProps } = props;
  const input = (
    <input
      {...{
        ref,
        type,
        disabled: readOnly,
        ...inputProps
      }}
    />
  );
  return (
    <label
      htmlFor={inputProps.id}
      className={inputProps.checked ? "is-checked" : ""}
    >
      {title} {input}
    </label>
  );
});
