function Button({ text, functionToCall }) {
  return (
    <button className="px-4 py-3 bg-teal-800 text-white rounded-md self-end cursor-pointer" onClick={functionToCall}>
      {text}
    </button>
  );
}

export default Button