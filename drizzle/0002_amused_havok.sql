ALTER TABLE `users` RENAME TO `user`;--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN "displayName" TO "name";--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN "photoUrl" TO "image";--> statement-breakpoint
CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `otp_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phoneNumber` text NOT NULL,
	`code` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD `emailVerified` integer;--> statement-breakpoint
ALTER TABLE `user` ADD `phoneNumber` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_phoneNumber_unique` ON `user` (`phoneNumber`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_error_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text,
	`message` text NOT NULL,
	`stack` text,
	`signature` text NOT NULL,
	`occurrences` integer DEFAULT 1,
	`resolved` integer DEFAULT 0,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_error_logs`("id", "userId", "message", "stack", "signature", "occurrences", "resolved", "updatedAt", "createdAt") SELECT "id", "userId", "message", "stack", "signature", "occurrences", "resolved", "updatedAt", "createdAt" FROM `error_logs`;--> statement-breakpoint
DROP TABLE `error_logs`;--> statement-breakpoint
ALTER TABLE `__new_error_logs` RENAME TO `error_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `error_logs_signature_unique` ON `error_logs` (`signature`);--> statement-breakpoint
CREATE TABLE `__new_feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'pending',
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_feedback`("id", "userId", "type", "message", "status", "createdAt") SELECT "id", "userId", "type", "message", "status", "createdAt" FROM `feedback`;--> statement-breakpoint
DROP TABLE `feedback`;--> statement-breakpoint
ALTER TABLE `__new_feedback` RENAME TO `feedback`;--> statement-breakpoint
CREATE TABLE `__new_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`unitId` text NOT NULL,
	`isCompleted` integer DEFAULT 0,
	`score` integer DEFAULT 0,
	`updatedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_progress`("id", "userId", "unitId", "isCompleted", "score", "updatedAt") SELECT "id", "userId", "unitId", "isCompleted", "score", "updatedAt" FROM `progress`;--> statement-breakpoint
DROP TABLE `progress`;--> statement-breakpoint
ALTER TABLE `__new_progress` RENAME TO `progress`;--> statement-breakpoint
CREATE UNIQUE INDEX `progress_userId_unitId_unique` ON `progress` (`userId`,`unitId`);