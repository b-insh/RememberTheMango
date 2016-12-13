# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(fname: "Mango", lname: "Lover", email: "mangosforever@gmail.com", username: "mangomango", password: "ilovemangoes123")

List.destroy_all
List.create(title: "App Academy", author_id: User.find_by(username: "mangomango").id )
List.create(title: "Get it together", author_id: User.find_by(username: "mangomango").id)
List.create(title: "desserts to eat", author_id: User.find_by(username: "mangomango").id)

Task.destroy_all
Task.create(title: "walk the dog", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get it together").id, due_date: Date.new(2016, 12,28), estimate: 5)

Task.create(title: "get groceries", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get it together").id, estimate: 45, location: "Wegmans")

Task.create(title: "go to the gym", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get it together").id, location: "Work Train Fight", estimate: 60)

Task.create(title: "finish fullstack project", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "App Academy").id, due_date: Date.new(2016, 12, 16) , start_date: Date.new(2016, 12, 06), estimate: 7200)

Task.create(title: "take more picture together", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "App Academy").id)

Task.create(title: "linzer tarts", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, estimate: 20)
Task.create(title: "cookies", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, estimate: 4)
Task.create(title: "fudge", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, estimate: 45)
