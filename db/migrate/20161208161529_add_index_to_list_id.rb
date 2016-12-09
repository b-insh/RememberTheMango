class AddIndexToListId < ActiveRecord::Migration
  def change
    add_index :tasks, :list_id
  end
end
