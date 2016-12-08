# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Task.destroy_all
Task.create(title: "walk the dog", author_id: 1, list_id: 2)
Task.create(title: "get groceries", author_id: 1, list_id: 2)
Task.create(title: "go to the gym", author_id: 1, list_id: 1)
Task.create(title: "fix car", author_id: 2, list_id: 1)
Task.create(title: "get new tires", author_id: 2, list_id: 1)

User.create(fname: "Mango", lname: "Lover", email: "mangosforever@gmail.com", username: "mangomango", password: "ilovemangoes123")
