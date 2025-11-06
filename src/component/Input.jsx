import React from "react";
import { useId } from "react";

const Input = (
  { label = "", className = "", type = "text", ...props },
  ref
) => {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="inline-block text-gray-500 mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 h-10 py-2 rounded-lg  bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        id={id}
        ref={ref}
      />
    </div>
  );
};

export default React.forwardRef(Input);
