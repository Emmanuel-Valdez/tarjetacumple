## Purpose

Photo gallery with a minimalist horizontal carousel (infinite scroll, no buttons) and persistent likes.

## Requirements

### Requirement: Persistent like
The system SHALL let visitors like a photo and persist the like count.

#### Scenario: Like increments count
- **WHEN** a visitor clicks like on a photo
- **THEN** the like count increases and is stored

### Requirement: One like per visitor
The system SHALL prevent a visitor from liking the same photo more than once.

#### Scenario: Duplicate like blocked
- **WHEN** a visitor who already liked a photo clicks like again
- **THEN** the like count does not increase

### Requirement: Admin photo management
The system SHALL let admins list and upload photos, and SHALL let them delete uploaded photos that have no votes. Photos shipped with the repository SHALL NOT be deletable from the admin panel.

#### Scenario: Upload is optimized
- **WHEN** an admin uploads an image
- **THEN** it is converted to WebP, resized so that its longest edge is at most 1440px without enlarging, and stored as the only version of that photo

#### Scenario: Delete removes the photo
- **WHEN** an admin deletes an uploaded photo that has no votes
- **THEN** it is removed from the gallery and its stored file is deleted

#### Scenario: Repository photos cannot be deleted
- **WHEN** an admin tries to delete a photo that ships with the repository
- **THEN** the request is rejected with an error and the photo stays visible

#### Scenario: Photos with votes cannot be deleted
- **WHEN** an admin tries to delete a photo that has votes in the contest
- **THEN** the request is rejected with an error and the photo stays visible

### Requirement: Seeded example photos
The system SHALL register the photos shipped with the repository in the database on startup, without creating duplicates, without replacing existing rows and without touching uploaded photos.

#### Scenario: Seed is idempotent
- **WHEN** the app starts more than once
- **THEN** each repository photo is registered only once

#### Scenario: Seed only inserts what is missing
- **WHEN** the app starts and a repository photo row is already present
- **THEN** the existing row is left untouched and no duplicate is created

#### Scenario: Seed never inserts uploaded photos
- **WHEN** the app starts
- **THEN** no row is created for a photo that was uploaded through the admin panel

### Requirement: Photo strips between sections
The system SHALL display the photos as grids placed between the sections that only contain text, instead of a single carousel section.

#### Scenario: Photos spread across the page
- **WHEN** a visitor scrolls the landing page
- **THEN** the photos appear in grids interleaved with the text sections

#### Scenario: Like button on each photo
- **WHEN** a visitor views a photo in a strip
- **THEN** the photo shows the like button with the number of likes and can be liked like any other photo

#### Scenario: Contest candidates are excluded while voting
- **WHEN** the contest is open and a visitor browses the strips
- **THEN** photos marked as contest candidates are not included

### Requirement: Single immutable stored version
The system SHALL store exactly one optimized file per uploaded photo, under a unique name that is never reused, so a stored photo can never change while it is referenced.

#### Scenario: Uploads never overwrite
- **WHEN** an admin uploads a photo with the same file name as an existing one
- **THEN** it is stored under a different name and the existing photo is untouched

#### Scenario: No second copy is kept
- **WHEN** an admin uploads a photo
- **THEN** the original file is not stored and no additional resized copy is kept next to the optimized one

### Requirement: Photo destination
The system SHALL record for each photo whether it belongs to the public photo strips or to the contest candidates, and SHALL use that distinction to decide where the photo is shown.

#### Scenario: Repository photos are strip photos
- **WHEN** the photos shipped with the repository are registered
- **THEN** they are recorded as strip photos

#### Scenario: Destination is chosen at upload
- **WHEN** an admin uploads a photo and chooses the contest as its destination
- **THEN** the photo is recorded as a contest candidate and is not part of the strips while the contest is open
