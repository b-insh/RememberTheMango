class Api::TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: :index, status: 200
    else
      render json: @task.errors, status: 422
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render json: :index, status: 200
    else
      render json: @task.errors, status: 422
    end
  end

  def show
    @task = Task.find(params[:id])
    render json: :show
  end

  def destroy
    @task = Task.find(params[:id])
    @task.delete!
    render json: :index
  end

  private
  def task_params
    params.require(:task).permit(:title, :start_date, :due_date, :estimate, :location, :completed)
  end
end
