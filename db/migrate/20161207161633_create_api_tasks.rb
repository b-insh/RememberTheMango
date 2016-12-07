class CreateApiTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.date :start_date
      t.date :due_date
      t.string :estimate
      t.string :location
      t.boolean :completed, null: false, default: false
      t.integer :author_id, null: false, index: true
      t.integer :list_id, null: false, index: true

      t.timestamps null: false
    end
    add_index :tasks, [:title, :author_id], unique: true
  end
end
