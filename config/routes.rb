Rails.application.routes.draw do
  get 'home/login'
  get 'home/signup'
  post "/signup", to: 'users#create'
  post "/login", to: 'sessions#create'
  get "/authorised", to: 'sessions#show'
  get "/dashboard", to: 'users#show'
  #resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
