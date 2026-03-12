ALTER TABLE `error_logs` ADD `signature` text NOT NULL;--> statement-breakpoint
ALTER TABLE `error_logs` ADD `occurrences` integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE `error_logs` ADD `updatedAt` integer DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE UNIQUE INDEX `error_logs_signature_unique` ON `error_logs` (`signature`);--> statement-breakpoint
ALTER TABLE `users` ADD `currentTrackId` text DEFAULT 'ma-2bac-math';