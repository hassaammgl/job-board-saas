import { timestamp } from "drizzle-orm/pg-core";

export const createdAt = timestamp({ withTimezone: true });

export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
