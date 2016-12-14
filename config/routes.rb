Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, default: { format: :json } do
    resources :users, only: [:create]
    resources :tasks, only: [:create, :update, :show, :destroy, :index]
    resources :lists, only: [:create, :destroy, :show, :index] do
      # resources :tasks, only: [:index]
      member do
        post 'task'
        delete 'remove_task'
      end
    end
    resource :session, only: [:create, :destroy]

  end
end
