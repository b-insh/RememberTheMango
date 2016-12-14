class Api::ListsController < ApplicationController
  def index
    @lists = current_user.lists
    render :index
  end

  def create
    @list = current_user.lists.new(list_params)
    if @list.save
      render :show
    else
      render json: @list.errors, status: 422
    end
  end

  def show
    @list = current_user.lists.find(params[:id])
    render "api/lists/show"
  end

  def destroy
    @list = current_user.lists.find(params[:id])
    @list.delete
    render :show
  end

  def remove_task
    @task = Task.find(params[:filter])
    if Task.destroy(@task)
      @list = List.find(params[:id])
      render 'api/lists/show'
    end
  end

  private
  def list_params
    params.require(:list).permit(:title)
  end

end
