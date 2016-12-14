Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, default: { format: :json } do
    resources :users, only: [:create]

    resources :tasks, only: [:create, :update, :show, :destroy, :index] do
      collection do
        get 'search'
      end
    end

    resources :lists, only: [:create, :destroy, :show, :index, :update] do
      member do
        post 'task'
        delete 'remove_task'
        patch 'update_task'
      end
    end

    resource :session, only: [:create, :destroy]

  end
end
