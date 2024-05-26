function Title({title, className, upperCase = true}) {
  return (
    <h1 className={className}>{upperCase ? title.toUpperCase() : title}</h1>
  )
}

export default Title