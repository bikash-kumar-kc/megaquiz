import React from "react";
import { useId } from "react";

const Select = (
  { options, category = false, className = "", label, ...props },
  ref
) => {
  const id = useId();
  console.log(category);
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-gray-500">
          {label}:
        </label>
      )}
      <select
        ref={ref}
        id={id}
        {...props}
        className={`px-3 py-2 h-10 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {category
          ? options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))
          : options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
