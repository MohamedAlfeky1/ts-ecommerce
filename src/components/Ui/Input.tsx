interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: Iprops) {
  return (
    <input
      className="border-2 border-gray-400 p-1 rounded-md outline-0"
      {...rest}
    />
  );
}
export default Input;
