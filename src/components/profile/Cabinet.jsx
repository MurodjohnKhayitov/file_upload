import { Avatar } from "antd";
import { Popover, } from 'antd';
import { getAuth, signOut } from 'firebase/auth'
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cabinet = () => {
    const [fileName, setFileName] = useState('');
    const [fileData, setFileData] = useState('');
    const navigate = useNavigate();

    const { auth } = useAuth();
    const logOuthandler = () => {
        signOut(getAuth())
            .then(res => {
                navigate('/login')
                toast.success(`Success LogOut`, {
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
            .catch(err => {
                toast.error(`LogOut LogOut`, {
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
    const content = (
        <div className="flex flex-col gap-y-2">
            <p className="hover:text-[#0077B6] cursor-pointer" >Profile</p>
            <button onClick={logOuthandler} className="w-full   text-start hover:text-[#0077B6] cursor-pointer" >LogOut</button>
        </div>
    );

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileContent = e.target.result;
                localStorage.setItem('uploadedFile', fileContent);  // Faylni localStorage ga saqlash
                localStorage.setItem('uploadedFileName', file.name);  // Fayl nomini saqlash
                setFileName(file.name);  // Fayl nomini holatga o'rnatish
                toast.success(`File Saqlandi`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            };

            reader.readAsDataURL(file);  // Faylni Base64 formatida o'qish
        }
        const storedFileData = localStorage.getItem('uploadedFile');
        if (storedFileData) {
            setFileData(storedFileData);  // O'qilgan faylni holatga o'rnatish
        }
    };
    useEffect(() => {
        const storedFileData = localStorage.getItem('uploadedFile');
        const storedFileName = localStorage.getItem('uploadedFileName');  // Fayl nomini o'qish

        if (storedFileData && storedFileName) {
            setFileData(storedFileData);  // O'qilgan faylni holatga o'rnatish
            setFileName(storedFileName);  // Fayl nomini holatga o'rnatish
        } else {
            toast.error(`LocalStorage dan fayl topilmadi.  `, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [fileData, fileName])

    return (
        <div className="   duration-200 relative  ">
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
            <div className="py-4 bg-white z-40 border">
                <div className="container flex justify-between items-center">
                    {/* Logo and Links section */}
                    <div className="flex items-center gap-4">
                        <p className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl" >
                            Fayl Yuklash
                        </p>
                    </div>

                    {auth?.email &&
                        <div className="flex justify-between items-center gap-4">
                            <p className="text-[14px]">{auth?.email}</p>
                            <div className="flex items-center">
                                <Popover content={content} title={null} trigger="click" className="cursor-pointer select-none">
                                    <Avatar
                                        style={{
                                            backgroundColor: '#fde3cf',
                                            color: '#f56a00',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {auth?.email?.slice(0, 1)}
                                    </Avatar>
                                </Popover>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="py-10 px-10">
                <div className="flex items-center justify-between">
                    <label htmlFor="fileupload" className="w-[80px] h-[80px] text-[30px] text-[#1C90ED] rounded-md border border-[#1C90ED] flex items-center justify-center cursor-pointer">+</label>
                    <input className="hidden" accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.png,.jpeg" // Qabul qilinadigan fayl formatlari
                        type="file" id="fileupload" onChange={handleFileUpload} />
                    {fileName && <p className="flex items-center mr-1"><span className="mr-1 text-[#1C90ED]">Yuklangan fayl Nomi:</span> {fileName}  </p>}
                    <a href={fileData} download={fileName} className="px-4 py-2 border rounded-md cursor-pointer text-[#1C90ED]">Faylni yuklab olish</a></div>

                {fileData && (
                    <div className="mt-10">

                        {fileData.startsWith('data:image') ? (
                            <img src={fileData} className="max-w-[200px]" alt="Uploaded File" style={{ maxWidth: '300px' }} />
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </div>

        </div >
    );
};

export default Cabinet;

