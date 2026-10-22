## Purpose

Photo gallery of contest candidate photos managed from the admin panel, stored as a single optimized version per photo.

## Requirements

### Requirement: Admin photo management
The system SHALL let admins list, upload and delete uploaded contest-candidate photos that have no votes. Repository images used as fixed landing or movie-carousel assets SHALL NOT be managed as contest photos or deletable from the admin panel.

#### Scenario: Upload is optimized
- **WHEN** an admin uploads a contest-candidate image
- **THEN** it is converted to WebP, resized so that its longest edge is at most 1440px without enlarging, and stored as the only version of that photo

#### Scenario: Delete removes the photo
- **WHEN** an admin deletes an uploaded contest-candidate photo that has no votes
- **THEN** it is removed from the candidate list and its stored file is deleted

#### Scenario: Repository photos cannot be deleted
- **WHEN** an admin tries to delete a repository image used as a fixed landing or movie-carousel asset
- **THEN** the request is rejected with an error and the image stays available to the site

#### Scenario: Repository images are not contest photos
- **WHEN** an admin opens photo management
- **THEN** fixed repository images used on the landing or movie carousel are not listed as contest candidates

#### Scenario: Photos with votes cannot be deleted
- **WHEN** an admin tries to delete a photo that has votes in the contest
- **THEN** the request is rejected with an error and the photo stays available to the contest

### Requirement: Single immutable stored version
The system SHALL store exactly one optimized file per uploaded photo, under a unique name that is never reused, so a stored photo can never change while it is referenced.

#### Scenario: Uploads never overwrite
- **WHEN** an admin uploads a photo with the same file name as an existing one
- **THEN** it is stored under a different name and the existing photo is untouched

#### Scenario: No second copy is kept
- **WHEN** an admin uploads a photo
- **THEN** the original file is not stored and no additional resized copy is kept next to the optimized one
