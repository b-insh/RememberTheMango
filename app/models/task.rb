class Task < ActiveRecord::Base
  validates :title, :completed, :author, presence: true
  validates :title, uniqueness: { scope: :author }

  # list

  belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id
end
