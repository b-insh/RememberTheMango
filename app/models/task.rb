 # == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  start_date :date
#  due_date   :date
#  location   :string
#  completed  :boolean          default(FALSE), not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  list_id    :integer
#  estimate   :integer
#  priority   :integer
#

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
