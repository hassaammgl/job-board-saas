import { env } from "@/data/env/server";
import { inngest } from "../client";
import { Webhook } from "svix";
import { NonRetriableError } from "inngest";
import { insertUser } from "@/features/users/db/users";

function verifyWebhook({
  raw,
  headers,
}: {
  raw: string;
  headers: Record<string, string>;
}) {
  return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
}

export const clerkCreateUser = inngest.createFunction(
  {
    id: "clerk/create-db-user",
    name: "Clerk - Create DB User",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event, step }) => {
    await step.run("Verify Webhook", () => {
      try {
        verifyWebhook({ raw: event.data.raw, headers: event.data.header });
      } catch (error) {
        throw new NonRetriableError("Invalid webhook");
      }
    });
   const userId = await step.run("create-user", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses?.find(
        (email) => email.id === userData.primary_email_address_id
      );

      if (email == null) {
        throw new NonRetriableError("No primary email found");
      }

      await insertUser({
        id: userData.id,
        name: `${userData.first_name} ${userData.last_name}`,
        imageUrl: userData.image_url,
        email: email.email_address,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      })

      return userData.id

    });
  }
);
