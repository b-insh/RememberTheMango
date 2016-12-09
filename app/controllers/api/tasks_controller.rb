class Api::TasksController < ApplicationController
  def index
    @tasks = Task.all
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
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render :index, status: 200
    else
      render json: @task.errors, status: 422
    end
  end

  def show
    @task = Task.find(params[:id])
  end

  def destroy
    @task = Task.find(params[:id])
    @task.delete
    render :show
  end

  private
  def task_params
    params.require(:task).permit(:title, :start_date, :due_date, :estimate, :location, :completed, :list_id)
  end
end
