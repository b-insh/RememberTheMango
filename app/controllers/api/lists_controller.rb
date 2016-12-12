class Api::ListsController < ApplicationController
  def index
    @lists = List.all
    render :index
  end

  def create
    @list = current_user.tasks.new(list_params)
    if @list.save
      render :show
    else
      render json: @list.errors, status: 422
    end
  end

  def show
    @list = List.find(params[:id])
  end

  def destroy
    @list = List.find(params[:id])
    @list.delete
    render :show
  end

  private
  def list_params
    params.require(:list).permit(:title)
  end

end
