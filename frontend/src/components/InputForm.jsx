import React from "react";

const InputForm = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-lg font-medium text-gray-300">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="text-gray-400 h-5 w-5" aria-hidden="true" />
        </div>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputForm;
