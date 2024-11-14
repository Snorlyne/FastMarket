interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}
export function Buttons(props: Props){
    return(
        <input

        {...props}
      />
    );
}
export default Buttons