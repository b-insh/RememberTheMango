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

  private
  def task_params
    params.require(:task).permit(:title, :start_date, :due_date, :estimate, :location, :completed, :list_id)
  end
end
