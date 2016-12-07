Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, default: { format: :json } do
    resources :users, only: [:create]
    resources :tasks, only: [:create, :update, :show, :destroy, :index]
    resource :session, only: [:create, :destroy]

  end
end
