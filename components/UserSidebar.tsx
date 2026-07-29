// @ts-nocheck


import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import UserNavItems from "./UserNavItems";
import { useLoaderData } from "react-router";
import { useRef, useState } from "react";

const UserSidebar = () => {

    const user = useLoaderData() as any;
    const [code, setCode] = useState("");
    const sidebarRef = useRef<SidebarComponent | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showBecomeAdmin, setShowBecomeAdmin] = useState(false);

    const toggleSidebar = () => {
        if (isOpen) {
            sidebarRef.current?.hide();
        } else {
            sidebarRef.current?.show();
        }

        setIsOpen(prev => !prev);
    };
    // @ts-ignore

    const handleVerify = async () => {
        const res = await fetch("/api/become-admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                accountId: user.accountId,
            }),
        })
        const result = await res.json();
        if (!result.success) {
            alert(result.message ?? "Invalid Code");
            return;
        }
        window.location.reload();
    }

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
                <UserNavItems handleClick={toggleSidebar}
                              onBecomeAdmin={() => {
                                  sidebarRef.current?.hide();
                                  setIsOpen(false);
                                  setShowBecomeAdmin(true);
                              }}
                />
            </SidebarComponent>
            {showBecomeAdmin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setShowBecomeAdmin(false)}>
                    <div
                        className="bg-white rounded-2xl p-8 w-[420px] m-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold">
                            Become Admin
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Enter the admin code.
                        </p>
                        <input
                            type="password"
                            placeholder="Admin Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="form-input mt-5 w-full"
                        />
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="button-class-secondary"
                                onClick={() => setShowBecomeAdmin(false)}
                            >
                                Cancel
                            </button>
                            <button className="button-class !text-white p-1 hover:!bg-blue-700" onClick={handleVerify}>
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserSidebar;