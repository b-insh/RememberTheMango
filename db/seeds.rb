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
List.create(title: "Get It Together", author_id: User.find_by(username: "mangomango").id)
List.create(title: "desserts to eat", author_id: User.find_by(username: "mangomango").id)
List.create(title: "after a/A", author_id: User.find_by(username: "mangomango").id)
List.create(title: "delete me!", author_id: User.find_by(username: "mangomango").id)

Task.destroy_all
Task.create(title: "walk the dog", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get It Together").id, due_date: Date.new(2016, 12,28), estimate: 5)

Task.create(title: "get groceries", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get It Together").id, estimate: 45, location: "Wegmans", start_date: Date.new(2016, 12, 15) )

Task.create(title: "go to the gym", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get It Together").id, location: "Work Train Fight", estimate: 60)

Task.create(title: "buy twelve mangos", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get It Together").id, location: "Mr. Kiwi", estimate: 15, completed: true)
Task.create(title: "make dinner", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get It Together").id, location: "Home", estimate: 30, completed: true)

Task.create(title: "send thank you note", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "Get It Together").id, estimate: 60, due_date: Date.new(2016, 12, 13))

Task.create(title: "finish fullstack project", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "App Academy").id, due_date: Date.new(2016, 12, 16) , start_date: Date.new(2016, 12, 06), estimate: 7200)

Task.create(title: "take more picture together", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "App Academy").id)

Task.create(title: "linzer tarts", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, estimate: 20)
Task.create(title: "cookies", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, estimate: 4)
Task.create(title: "fudge", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, estimate: 45)
Task.create(title: "chocolate covered pretzels", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, location: "Jen's house" )
Task.create(title: "peanut m&ms", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "desserts to eat").id, start_date: Date.new(2016, 12, 27))

Task.create(title: "i will be deleted when my list gets deleted", author_id: User.find_by(username: "mangomango").id, list_id: List.find_by(title: "delete me!").id)
