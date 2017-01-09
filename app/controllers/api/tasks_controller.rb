class Api::TasksController < ApplicationController
  def index
    @tasks = current_user.tasks.includes(:list)
    render :index
  end

  def create
    # if params[:filter]
    #   @task = current_user.tasks.new(task_params)
    #   @task.list_id = params[:filter].to_i
    #   @task.save
    #   @list = List.find(params[:filter])
    #   render "api/lists/show"
    # else
      @task = current_user.tasks.new(task_params)
      if @task.save
        render :show
      else
        render json: @task.errors, status: 422
      end
    # end
  end

  def update
    @task = current_user.tasks.find(params[:id])
    if @task.update(task_params)
      render :show
    else
      render json: @task.errors, status: 422
    end
  end

  def show
    @task = current_user.tasks.find(params[:id])
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.delete
    render :show
  end

  def search
    @tasks = Task.where("LOWER(title) ~ ?", params[:query])
    render :search
  end

  private
  def task_params
    params.require(:task).permit(:title, :start_date, :due_date, :estimate, :location, :google_location, :completed, :list_id, :priority)
  end
end
