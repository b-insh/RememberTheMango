# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
fname           | string    | not null
lname           | string    | not null
email           | string    | not null, indexed, unique
img             | bytea     |

## tasks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, unique in scope of author
start_date  | date      |
due_date    | date      |
estimate    | string    |
location    | string    |  
completed   | boolean   | not null, default: false
author_id   | integer   | not null, foreign key (references users), indexed
list_id     | integer   | foreign key (references lists), indexed

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, indexed, unique
author_id   | integer   | not null, foreign key (references users), indexed

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
task_id     | integer   | not null, foreign key (references tasks), indexed

<!-- ## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
task_id     | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed -->
