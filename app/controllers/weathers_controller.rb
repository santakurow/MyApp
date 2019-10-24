class WeathersController < ApplicationController
  def index
    @citys = City.all
    
  end
end
