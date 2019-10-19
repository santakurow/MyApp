Rails.application.routes.draw do
  root "weathers#index"
  resources "weathers", only: :index
end

