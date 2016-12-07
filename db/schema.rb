# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161207165842) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tasks", force: :cascade do |t|
    t.string   "title",                      null: false
    t.date     "start_date"
    t.date     "due_date"
    t.string   "estimate"
    t.string   "location"
    t.boolean  "completed",  default: false, null: false
    t.integer  "author_id",                  null: false
    t.integer  "list_id",                    null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "tasks", ["author_id"], name: "index_tasks_on_author_id", using: :btree
  add_index "tasks", ["list_id"], name: "index_tasks_on_list_id", using: :btree
  add_index "tasks", ["title", "author_id"], name: "index_tasks_on_title_and_author_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "fname",           null: false
    t.string   "lname",           null: false
    t.string   "email",           null: false
    t.binary   "img"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
