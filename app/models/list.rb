class List < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :author, presence: true

  belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id

  has_many :tasks,
    class_name: :Task,
    primary_key: :id,
    foreign_key: :list_id
end
