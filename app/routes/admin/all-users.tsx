import { Header } from "../../../components";
import { ColumnsDirective, ColumnDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import { cn } from "../../../lib/utils"; // رجعنا cn عشان هنحتاجه في تصميم الحالة
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";

export const loader = async () => {
    const { users, total } = await getAllUsers(10, 0);
    return { users, total };
}

const userProfileTemplate = (props: any) => {
    const userName = props?.name || 'Unknown User';
    const imageUrl = props?.imageUrl || `https://ui-avatars.com/api/?name=${userName}&background=random`;

    return (
        <div className="flex items-center gap-3">
            <img
                src={imageUrl}
                alt="user avatar"
                className="rounded-full w-9 h-9 object-cover"
                referrerPolicy="no-referrer"
            />
            <span className="font-medium text-gray-900">{userName}</span>
        </div>
    );
};


const statusTemplate = (props: any) => {
    const status = props?.status?.toLowerCase() || 'user';
    const isUser = status === 'user';

    return (
        <div className={cn(
            "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium",
            isUser ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-600"
        )}>

            {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
    );
};

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
    const { users } = loaderData;

    const formattedUsers = users.map((user: any) => {
        const dateObj = new Date(user.joinedAt);
        const cleanDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return {
            ...user,
            joinedAt: cleanDate
        };
    });

    return (
        <main className="all-users wrapper">
            <Header
                title="Manage Users"
                description="Filter, sort, and access detailed user profiles"
            />

            <GridComponent dataSource={formattedUsers} gridLines="None">
                <ColumnsDirective>
                    <ColumnDirective
                        field="name"
                        headerText="NAME"
                        width="250"
                        textAlign="Left"
                        template={userProfileTemplate}
                    />
                    <ColumnDirective
                        field="email"
                        headerText="EMAIL ADDRESS"
                        width="200"
                        textAlign="Left"
                    />
                    <ColumnDirective
                        field="joinedAt"
                        headerText="DATE JOINED"
                        width="150"
                        textAlign="Left"
                    />
                    <ColumnDirective
                        field="status"
                        headerText="STATUS"
                        width="120"
                        textAlign="Left"
                        template={statusTemplate}
                    />
                </ColumnsDirective>
            </GridComponent>
        </main>
    );
}

export default AllUsers;