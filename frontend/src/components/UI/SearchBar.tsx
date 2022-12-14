type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  className?: string
}

const SearchBar = ({ onChange, value, className }: Props) => {
  return (
    <input
      className={`border-border-color border-2 p-2 focus:outline-none  rounded-sm w-[20%]  ${className}`}
      value={value}
      onChange={onChange}
    />
  )
}

export { SearchBar }
