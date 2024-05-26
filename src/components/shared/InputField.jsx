function InputField({type, label, name, inputValue, setInputValue, handleChange, w, help}) {
  return (
    <div className={`mb-4 last:mb-0 w-full`}>
      {label && (
        <label className="block mb-2 dark:text-white">
          {label}{" "}
        </label>
      )}
          <input
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(name, e.target.value)}
            onBlur={handleChange}
            className={`dark:text-white px-3 py-2 focus:outline-none border border-gray-700 rounded  dark:placeholder-gray-400 h-12 ${
              w ? w : ""
            }`}
          />
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );
}

export default InputField