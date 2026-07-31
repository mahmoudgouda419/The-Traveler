import { data, type ActionFunctionArgs } from "react-router";
import {Query} from "appwrite";
import {appwriteConfig, database} from "~/appwrite/client";

const ADMIN_CODE =  "travello";
export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const {code, accountId} = await request.json();
        if (code !== ADMIN_CODE) {
            return data(
                {success: false, message: "Wrong code"},
                {status: 401}
            );
        }
        const {documents} = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", accountId)]
        );
        if (documents.length === 0) {
            return data(
                {success: false, message: "No user found"},
                {status: 404}
            );
        }
        const user = documents[0];
        await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.$id,
            {
                status: "admin",
            }
        );
        return data({
            success: true,
        });

    } catch (e) {
        console.error(e);

        return data(
            { success: false },
            { status: 500 }
        );
    }
}