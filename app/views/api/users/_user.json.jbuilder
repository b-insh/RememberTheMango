# json.extract! user, :id, :username, :fname, :lname, :email, :tasks, :lists, asset_path(:image.url)
json.id user.id
json.username user.username
json.fname user.fname
json.lname user.lname
json.email user.email
json.tasks user.tasks
json.lists user.lists
json.image_url asset_path(user.image.url(:original))
