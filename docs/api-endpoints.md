# API Endpoints

## HTML API

# Root

- `GET /` - loads React web app

## JSON API

# Users

- `POST /api/users`
- `PATCH /api/users`

# Session

- `POST /api/session`
- `DELETE /api/session`

# Tasks

- `GET /api/tasks`
  - Tasks index
  - Tasks search
  - accepts query params that allow tasks to be ordered by date/priority/alphabetically etc.
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

# Lists

- `GET /api/lists`
- `POST /api/lists`

- `GET /api/lists/:id`
- `DELETE /api/lists/:id`
- `GET /api/lists/:id/tasks`
  - index of all tasks for a list

# Notes

- `GET /api/tasks/:id/notes`
  - tasks can have notes
- `POST /api/tasks/:id/notes`
- `PATCH /api/tasks/:id/notes/:id`
- `DELETE /api/tasks/:id/notes/:id`
