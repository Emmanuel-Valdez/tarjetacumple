## Purpose

Photo gallery in Instagram style with a carousel and persistent likes.

## ADDED Requirements

### Requirement: Instagram-style grid
The system SHALL display photos in a grid layout similar to Instagram.

#### Scenario: Grid renders
- **WHEN** a visitor views the gallery
- **THEN** photos are shown in a multi-column grid

### Requirement: Carousel view
The system SHALL provide a carousel view of the photos.

#### Scenario: Carousel navigable
- **WHEN** a visitor uses the carousel
- **THEN** they can move between photos

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