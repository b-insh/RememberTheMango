class Task < ActiveRecord::Base
  validates :title, :author, presence: true
  validates :title, uniqueness: { scope: :author }
  validates_inclusion_of :completed, in: [true, false] }
  # list

  belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id
end
