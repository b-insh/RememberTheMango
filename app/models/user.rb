# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  fname              :string           not null
#  lname              :string           not null
#  email              :string           not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :username, presence: { message: "" }, uniqueness: true, length: { message: "Minimum is 2 characters", minimum: 2 }
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank" }
  validates :fname, presence: { message: "First name is required" }
  validates :lname, presence: { message: "Last name is required" }
  validates :email, presence: { message: "Invalid email address" }
  validates :password, length: { message: "Miniumum is 5 characters", minimum: 5, allow_nil: true }

  has_attached_file :image, default_url: "hp_person1.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  attr_reader :password
  before_validation :ensure_session_token

  has_many :tasks,
    class_name: :Task,
    primary_key: :id,
    foreign_key: :author_id

  has_many :lists,
    class_name: :List,
    primary_key: :id,
    foreign_key: :author_id

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
