
import {Link, NavLink, useLoaderData, useNavigate} from "react-router";
import {cn} from "../lib/utils";
import {logoutUser} from "../app/appwrite/auth";
const NavItems = ({handleClick, onBecomeAdmin}: {
    handleClick?: () => void;
    onBecomeAdmin: () => void;
}) => {
    const user = useLoaderData()
    const isAdmin = user?.status === "admin";


    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate("/sign-in")
    }
    const userSidebarItems = [
        {
            id: 1,
            href: "/",
            icon: "/assets/icons/home.svg",
            label: "Home",
        },
        {
            id: 2,
            href: "/create-trip",
            icon: "/assets/icons/magic-star.png",
            label: "Create Trip",
        },

        ...(user?.status === "admin"
            ? [{
                id: 3,
                href: "/dashboard",
                icon: "/assets/icons/users.svg",
                label: "Admin",
            }]
            : []),
    ];

    console.log("USER DATA", user);
    return (

        <section className="nav-items">
            <Link to='/' className="link-logo">
                <img src = "/assets/icons/logo.svg" alt = "logo" className = "size-[30px]" />
                <h1>The Traveller</h1>
            </Link>
            <div className="container">
                <nav>{userSidebarItems.map(({id, href, icon, label}) =>
                    <NavLink to={href} key={id}>
                        {({ isActive }: { isActive: boolean }) => (
                            <div className={cn('group nav-item', {
                                'bg-primary-100 !text-white': isActive
                            })} onClick={handleClick}>
                                <img
                                    src={icon}
                                    alt={label}
                                    className={`group-hover:brightness-0 size-5 group-hover:invert ${
                                        isActive ? 'brightness-0 invert' : 'text-dark-200'
                                    }`}
                                />
                                {label}
                            </div>
                        )}
                    </NavLink>
                )}
                    {!isAdmin && (
                        <button onClick={onBecomeAdmin} className="group nav-item w-full text-left cursor-pointer">
                            <img src = "/assets/icons/lock.png" alt = "become admin" className = "group-hover:brightness-0 size-5 group-hover:invert" />
                        Become Admin
                        </button>
                    )}
                </nav>
                <footer className="nav-footer">
                    <img src={user?.imageUrl || '/assets/images/david.webp'}  alt={user?.name || 'Mahmoud'} />

                    <article>
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </article>
                    <button
                        className="cursor-pointer"
                        onClick={handleLogout}
                    >
                        <img
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            className="size-6"
                        />
                    </button>
                </footer>
            </div>


        </section>
    )
}


export default NavItems
