// @ts-nocheck

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import UserNavItems from "./UserNavItems";

import { useRef, useState } from "react";
const UserSidebar = () => {


    const sidebarRef = useRef<SidebarComponent | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        if (isOpen) {
            sidebarRef.current?.hide();
        } else {
            sidebarRef.current?.show();
        }

        setIsOpen(prev => !prev);
    };
    // @ts-ignore
    return (
        <>
            <button
                onClick={toggleSidebar}
                className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
            >
                <img
                    src="/assets/icons/menu.svg"
                    alt="menu"
                    className="size-6"
                />
            </button>

            <SidebarComponent
                width={270}
                ref={sidebarRef}
                created={() => {
                    sidebarRef.current?.hide();
                    setIsOpen(false);
                }}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="over"
            >
                <UserNavItems handleClick={toggleSidebar} />
            </SidebarComponent>
        </>
    );
};

export default UserSidebar;