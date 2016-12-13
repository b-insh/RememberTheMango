class MakeEstimateInteger < ActiveRecord::Migration
  def change
    remove_column :tasks, :estimate
    add_column :tasks, :estimate, :integer
  end
end
