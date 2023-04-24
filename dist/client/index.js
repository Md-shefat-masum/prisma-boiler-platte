import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import "./polyfill";
const trpc = createTRPCProxyClient({
    links: [
        httpBatchLink({
            url: "http://localhost:3000",
        }),
    ],
});
async function main() {
    /**
     * Inferring types
     */
    const users = await trpc.userList.query();
    //    ^?
    console.log("Users:", users);
    const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
    //    ^?
    console.log("Created user:", createdUser);
    const user = await trpc.userById.query("1");
    //    ^?
    console.log("User 1:", user);
}
main().catch(console.error);
