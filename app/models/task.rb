Rails.application.config.active_record.belongs_to_required_by_default = false


class Task < ActiveRecord::Base
  validates :title, :author, presence: true
  validates :title, uniqueness: { scope: :author }
  validates_inclusion_of :completed, in: [true, false]

  belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id

  belongs_to :list,
    class_name: :List,
    primary_key: :id,
    foreign_key: :list_id

end
