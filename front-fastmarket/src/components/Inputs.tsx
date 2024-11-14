interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}
export function Inputs(props: Props){
    return(
        <input
        className="w-full h-12 rounded-xl bg-gray-800 text-white px-4 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"

        {...props}
      />
    );
}
export default Inputs