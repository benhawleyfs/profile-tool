# Athlete Data Tooling Prototype Spec

## Purpose
Current tools enable technical users to debug and verify internal validity of systems as implemented. This tool enables both technical and non-technical users to understand and modify how we model real-world concepts (athletes, their identities, their associations) — independent of implementation details.

Prototype to validate UX before engineering investment.

## Context
Current implementation (interim for ongoing season):
- Source provider records are converted to flo360 people first
- Then flo360 people are merged with each other
- Merges tab shows flo360 person ↔ flo360 person relationships

Future state (out of scope):
- Merging will happen directly with source provider IDs
- No intermediate flo360 person conversion
- Relationships between flo360 people, source people, and event participants will be redesigned

## Scope

### Stage 1: Build now (prototype)

#### Profile selector
- Search/select a flo360 person
- Dummy data: single profile (e.g., Jordan Burroughs)
- Selected profile persists across all tabs

#### Tab 1: Overview & Edit
- Display flo360 person's current data
- List all provider-to-OFP mappings (source system IDs)
- For each source ID: show source system type + key data fields from that source
- Editable form for flo360 person fields (human-readable labels)
- Save action (mocked in prototype)
- Purpose: debugging entry point + editing in one place

**Fields:**
- Profile Photo (upload)
- First Name
- Last Name
- Nickname
- Gender
- Date of Birth
- HS Grad Year
- Team (see open questions)
- Weight Class
- Location (single field — see open questions)

#### Tab 2: Merges
- List of other flo360 people merged with this one
- Side-by-side comparison view
- Each merged person shows human-readable profile data (default collapsed)
- "Show raw JSON" toggle to expand underlying data
- Unmerge action on each
- Optional: filter dropdown by profile type

**Note:** Design screenshots available - ask for them when implementing the merge review UI.
