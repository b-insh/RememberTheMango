class Api::TasksController < ApplicationController
  def index
    @tasks = current_user.tasks.includes(:list)
    render :index
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render :show
    else
      render json: @task.errors, status: 422
    end
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
