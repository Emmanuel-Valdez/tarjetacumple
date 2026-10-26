## ADDED Requirements

### Requirement: Award category management
The system SHALL let an authenticated admin view, create, edit and delete award categories while the contest is idle, before it opens.

#### Scenario: Categories are visible before opening
- **WHEN** an admin opens the category management section
- **THEN** all currently managed categories are listed, including before the contest has been opened

#### Scenario: Default categories are available initially
- **WHEN** the contest is idle and no categories have been managed yet
- **THEN** the default award categories are available for viewing and editing

#### Scenario: Create a category
- **WHEN** an admin submits a category with a title, emoji and teaser
- **THEN** the category is added to the managed list

#### Scenario: Invalid category is rejected
- **WHEN** an admin submits a category without a title, emoji or teaser
- **THEN** the request is rejected and no category is created

#### Scenario: Edit a category while idle
- **WHEN** the contest is idle and an admin edits a managed category
- **THEN** the category is updated

#### Scenario: Edit is blocked while the contest is open
- **WHEN** the contest is open or closed and an admin tries to edit a category
- **THEN** the request is rejected and the category stays unchanged

#### Scenario: Delete a category while idle
- **WHEN** the contest is idle and an admin deletes a managed category
- **THEN** the category is removed from the managed list

#### Scenario: Delete is blocked while the contest is open
- **WHEN** the contest is open or closed and an admin tries to delete a category
- **THEN** the request is rejected and the category stays in the list
