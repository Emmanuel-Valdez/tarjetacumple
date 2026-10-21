## Purpose

Music section embedding Spotify and letting guests suggest tracks.

## ADDED Requirements

### Requirement: Spotify embed
The system SHALL embed a Spotify player for listening.

#### Scenario: Player renders
- **WHEN** a visitor views the playlist section
- **THEN** a Spotify embed player is displayed

### Requirement: Add track suggestion
The system SHALL let guests submit a track title and artist to be stored.

#### Scenario: Track submitted
- **WHEN** a guest submits a title and artist
- **THEN** the track is saved and appears in the list

#### Scenario: Track appears with search link
- **WHEN** a track is listed
- **THEN** it includes a link to search it on Spotify

### Requirement: v1 mock for Spotify OAuth
In v1 the system SHALL NOT require Spotify authentication; OAuth integration is deferred.

#### Scenario: No OAuth prompt in v1
- **WHEN** a guest uses the playlist in v1
- **THEN** no Spotify login is required