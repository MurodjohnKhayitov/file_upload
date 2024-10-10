import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../firebase/config'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { BiCheck, } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {

    const [consfirmEmail, setConfirmEmail] = useState(false)
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        sendPasswordResetEmail(getAuth(), email)
            .then(() => {
                setConfirmEmail(true)
                toast.success(`Password Send to Email!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(() => {
                toast.error(`Something Wrong!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }
    useEffect(() => {
        window.scrollTo({
          top: 0,
        });
      }, []);
    return (
        <div className='w-full h-[calc(100vh-72px)] flex items-center justify-center border'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={4}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {/* -----------------------Email Verify Modal------------------- */}

            {consfirmEmail &&
                <div className="w-full md:w-1/2 h-fit ">
                    <div
                        onClick={() => { setConfirmEmail(false) }}
                        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${consfirmEmail ? "" : "hidden"
                            }`}
                    ></div>
                    <div className="fixed max-w-[490px] h-[275px]  p-3 bg-white rounded-lg  mx-auto w-full  z-[113] top-[50%] left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] overflow-hidden">
                        <div className="flex items-center justify-end">
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    setConfirmEmail(false);
                                }}
                            >
                                <IoMdClose size={35} colors="#303030" />
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-center flex-col">
                            <button className="flex p-4 items-center justify-center rounded-full mt-4 bg-[#D8EDFF]">
                                <BiCheck size={50} />
                            </button>
                            <p className="text-[#1F1F1F] text-3xl not-italic font-AeonikProMedium mt-5">
                                Biz sizga havola yubordik
                            </p>
                            <p className="text-[#8B8B8B] text-xl not-italic font-AeonikProRegular mt-[30px]">
                                Elektron pochtangizni tekshiring
                            </p>
                        </div>
                    </div>

                </div>}


            <section className='max-w-[440px] w-full sm:min-w-[550px] border border-[#a1a1a1] rounded-lg flex flex-col justify-center items-center p-4'>
                <h1 className='font-bold'>Parolni unutdingizmi</h1>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4  '>
                    <label htmlFor="Email">Email:</label>
                    <input
                        className=" w-full h-10 md:h-12  border border-searchBgColor rounded-lg px-4"
                        type="email"
                        id="Email"
                        autoComplete="on"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder='email'
                    />

                    <button className="mt-2 text-white border cursor-pointer flex items-center justify-center border-[#F2F2F2] w-full h-10 md:h-12 bg-[#0077B6] select-none rounded-lg active:scale-95	active:opacity-70 "
                    >Junatish</button>
                </form>
                <p className='w-full mt-5 flex items-center justify-center'>
                    Sizning accountingiz bormi?
                    <span className="line ml-5">
                        <Link to="/login" className='text-[#0077B6]'>Kirish</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default ForgetPassword
