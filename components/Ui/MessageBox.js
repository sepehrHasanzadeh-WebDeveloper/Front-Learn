import { PiEmpty } from "react-icons/pi";

export default function MessageBox ({icon , title , message , buttonText}) {
    return (
        <>
            <div className="d-flex justify-center rounded-2xl shadow-2xl p-5 w-50 align-items-center mt-5 mb-5" style={{margin: "0 auto"}}>
                <span className="d-flex justify-center align-items-center text-gray-500 flex-col gap-2 ">
                    {icon ? icon : <PiEmpty size={50} />}
                    {title && <h4>{title}</h4>}
                    {message && <p>{message}</p>}
                    {buttonText && <button className="btn btn-primary">{buttonText}</button>}
                </span>
            </div>
        </>
    )
}