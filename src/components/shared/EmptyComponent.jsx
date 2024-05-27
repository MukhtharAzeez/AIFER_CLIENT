function EmptyComponent({ message = 'No Data Found', minHeight}) {
  return (
    <div className={`w-full bg-white ${minHeight}  flex pl-6 items-center`}>
      {message}
    </div>
  );
}

export default EmptyComponent