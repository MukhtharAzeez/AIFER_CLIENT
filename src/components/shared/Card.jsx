function Card({ children, className, onClickFn, fnParams }) {
  return (
    <div className={`w-[20%] bg-white shadow-md flex justify-center items-center rounded-md  h-44 min-w-[300px] flex-grow md:flex-grow-0 ${className}`} onClick={onClickFn ? () => onClickFn(...fnParams) : null}>
      {children}
    </div>
  );
}

export default Card;
