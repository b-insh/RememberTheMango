class AddGoogleLocationToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :google_location, :string
  end
end
