CREATE TABLE `contest` (
	`id` integer PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'idle' NOT NULL,
	`opened_at` integer,
	`closed_at` integer
);
--> statement-breakpoint
CREATE TABLE `contest_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`emoji` text NOT NULL,
	`teaser` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`winner_photo_id` integer,
	`winner_votes` integer,
	FOREIGN KEY (`winner_photo_id`) REFERENCES `photos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contest_categories_slug_unique` ON `contest_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `contest_votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`photo_id` integer NOT NULL,
	`visitor_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `contest_categories`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`photo_id`) REFERENCES `photos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contest_votes_category_visitor_idx` ON `contest_votes` (`category_id`,`visitor_id`);--> statement-breakpoint
CREATE INDEX `contest_votes_photo_idx` ON `contest_votes` (`photo_id`);--> statement-breakpoint
ALTER TABLE `photos` ADD `kind` text DEFAULT 'backstage' NOT NULL;--> statement-breakpoint
CREATE INDEX `photos_kind_idx` ON `photos` (`kind`);