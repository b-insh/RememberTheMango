class RemoveImgFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :img
  end
end
