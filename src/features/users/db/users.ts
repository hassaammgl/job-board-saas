import { UserTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export async function insertUser(user: typeof UserTable.$inferInsert) {
    await db.insert(UserTable).values(user).onConflictDoUpdate({
        target: UserTable.id,
        set: user
    })
}