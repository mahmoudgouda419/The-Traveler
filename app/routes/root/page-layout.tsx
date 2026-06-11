import {useNavigate} from "react-router";
import {logoutUser} from "~/appwrite/auth";
import { useLoaderData } from "react-router";
import { getUser } from "~/appwrite/auth";
import { Link } from "react-router";
import { Outlet } from "react-router";

import UserSidebar from "../../../components/UserSidebar";

export const clientLoader = async () => {
    return await getUser();
};

const PageLayout = () => {
    const user = useLoaderData();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate("/sign-in")
    }


    console.log(user);
    console.log(user?.status);
    return (
        <>
            <div className="absolute top-0 left-0 right-0 z-20">
                <div
                    className="
                        max-w-[1400px]
                        mx-auto
                        px-4 md:px-10
                        py-4
                        flex
                        justify-between
                        items-center
                        "
                >

                    <div className="flex items-center gap-3">
                        <img
                            src="/assets/icons/logo.svg"
                            alt="logo"
                            className="size-10"
                        />
                        <h2 className="text-3xl font-bold text-dark-100">
                            The Traveller
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">

                            <div className="text-right">
                                <p className="font-semibold">
                                    {user?.name}
                                </p>

                                <p className="text-sm opacity-70">
                                    {user?.email}
                                </p>
                            </div>

                            <img
                                src={user?.imageUrl || "/assets/images/david.webp"}
                                alt={user?.name}
                                className="w-14 h-14 rounded-full object-cover"
                            />

                        <button
                            onClick={handleLogout}
                            className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
                        >
                            <img
                                src="/assets/icons/logout.svg"
                                alt="logout"
                                className="size-6"
                            />
                        </button>
                        </div>
            <UserSidebar />

                    </div>

                </div>
            </div>

            <Outlet />
        </>

    )


}
export default PageLayout
