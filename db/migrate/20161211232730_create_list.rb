class CreateList < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false, index: true, unique: true
      t.integer :author_id, null: false, index: true

      t.timestamps
    end
  end
end
