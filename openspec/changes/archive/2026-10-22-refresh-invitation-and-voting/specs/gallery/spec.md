## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Persistent like
**Reason**: Likes are only used by the public photo strips, which are removed.
**Migration**: Stop displaying and accepting likes for strip photos; contest votes remain a separate feature.

### Requirement: One like per visitor
**Reason**: This requirement only supports likes on the removed public photo strips.
**Migration**: Retire the strip-like interaction and its public endpoint; contest voting continues to enforce its own one-vote-per-category rule.

### Requirement: Seeded example photos
**Reason**: The static gallery catalog is no longer needed once repository photos are not seeded for public strips.
**Migration**: Serve the two featured Juli images directly as fixed landing assets; remove unused photo-gallery assets and registrations while preserving all resources referenced by the movie carousel.

### Requirement: Photo strips between sections
**Reason**: The public strips and their like cards are removed in favor of one featured Juli photo and the separate contest view.
**Migration**: Remove the public strip presentation and do not delete movie-carousel assets.

### Requirement: Photo destination
**Reason**: Admin photo management is limited to contest candidates; strip photos are no longer a supported destination.
**Migration**: Stop exposing strip destinations and retire existing strip-only registrations from public/admin photo views. Preserve any fixed asset still referenced by the landing or movie carousel.
