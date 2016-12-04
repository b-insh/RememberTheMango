# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## tasks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, unique
start       | date      |
due         | date      |
estimate    | string    |
location    | string    |  <!-- how does this work?  like would the locations be stored as strings here ("app academy") and elsewhere I store the location string with it's actual coordinates/address or something? -->
completed   | boolean   | not null, default: false
author_id   | integer   | not null, foreign key (references users), indexed
list_id     | integer   | not null, foreign key (references lists), indexed

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
