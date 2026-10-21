## Purpose

Photo gallery with a minimalist horizontal carousel (infinite scroll, no buttons) and persistent likes.

## ADDED Requirements

### Requirement: Horizontal carousel
The system SHALL display the photos in a single horizontal track that scrolls sideways, without navigation buttons.

#### Scenario: Track renders
- **WHEN** a visitor views the gallery
- **THEN** several photos are visible at once in one horizontal row

#### Scenario: Scroll works
- **WHEN** the visitor swipes, scrolls the trackpad or drags with the mouse
- **THEN** the photos move horizontally

### Requirement: Infinite scroll
The system SHALL keep the track scrollable without showing an end.

#### Scenario: No visible boundary
- **WHEN** the visitor scrolls past the last photo
- **THEN** the track seamlessly continues with more photos and never shows an empty edge

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
The system SHALL let admins list, upload and delete gallery photos.

#### Scenario: Upload is optimized
- **WHEN** an admin uploads an image
- **THEN** it is resized to at most 1600px on its longest edge, stored as WebP and appears in the gallery

#### Scenario: Delete removes the photo
- **WHEN** an admin deletes a photo
- **THEN** it is removed from the gallery

### Requirement: Seeded example photos
The system SHALL ship the example photos converted to WebP and register them in the database on startup.

#### Scenario: Seed is idempotent
- **WHEN** the app starts more than once
- **THEN** each example photo is registered only once
