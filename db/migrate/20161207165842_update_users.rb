class UpdateUsers < ActiveRecord::Migration
  def change
    add_index :users, :email, unique: true
    add_column :users, :img, :bytea
  end
end
