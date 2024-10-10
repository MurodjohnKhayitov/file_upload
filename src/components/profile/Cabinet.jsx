import { Avatar } from "antd";
import { Popover, } from 'antd';
import { getAuth, signOut } from 'firebase/auth'
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";


const Cabinet = () => {
    const navigate = useNavigate();

    const { auth } = useAuth();
    const logOuthandler = () => {
        signOut(getAuth())
            .then(res => {
                navigate('/login')

            })
            .catch(err => { console.log(err, "err") })
    }
    const content = (
        <div className="flex flex-col gap-y-2">
            <p className="hover:text-[#0077B6] cursor-pointer" >Profile</p>
            <button onClick={logOuthandler} className="w-full   text-start hover:text-[#0077B6] cursor-pointer" >LogOut</button>
        </div>
    );


    return (
        <div className="bg-white   duration-200 relative z-40 border">
            <div className="py-4">
                <div className="container flex justify-between items-center">
                    {/* Logo and Links section */}
                    <div className="flex items-center gap-4">
                        <p className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl" >
                            File Upload
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

        </div >
    );
};

export default Cabinet;

// overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center
