class Api::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    # @task = current_user.tasks.new(task_params)
    @task = Task.new(task_params)
    @task.author_id = current_user.id
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
  end

  def destroy
    @task = Task.find(params[:id])
    @task.delete!
    render json: :index
  end

  private
  def task_params
    params.require(:task).permit(:title, :start_date, :due_date, :estimate, :location, :completed, :list_id)
  end
end
