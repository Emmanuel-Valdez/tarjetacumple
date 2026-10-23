## MODIFIED Requirements

### Requirement: Add track suggestion
The system SHALL let guests submit a track title and artist to be stored, and SHALL report a failed request to the guest instead of leaving the guest without an answer or with an empty list that looks like a real result.

#### Scenario: Track submitted
- **WHEN** a guest submits a title and artist
- **THEN** the track is saved and appears in the list

#### Scenario: Track appears with search link
- **WHEN** a track is listed
- **THEN** it includes a link to search it on Spotify

#### Scenario: Submission fails
- **WHEN** the request cannot reach the server or the server rejects the data
- **THEN** a visible message tells the guest that the track could not be added, and the track is not listed

#### Scenario: Listing fails
- **WHEN** the list of tracks cannot be loaded
- **THEN** the guest sees that the list is unavailable instead of an empty list
