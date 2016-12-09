class ChangeListIdToNotRequired < ActiveRecord::Migration
  def change
    remove_column :tasks, :list_id
    add_column :tasks, :list_id, :integer, index: true;
  end
end
