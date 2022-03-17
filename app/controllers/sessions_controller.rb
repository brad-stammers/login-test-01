class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: session_params[:email])
    puts "found @user"
    if @user && @user.authenticate(session_params[:password])
      puts "check for authenticate"
      token = issue_token(@user)
      puts "gets token"
      # console.log("New session created for " + session_params[:email])
      render json: {user: UserSerializer.new(@user), jwt: token}
    else
      # console.log("Incorrect username or password.")
      puts "failed authenticate"
      render json: {error: "Incorrect username or password."}
    end
  end

  def show
    if logged_in?
      puts "currently logged in"
      render json: current_user
    else
      puts "not logged in"
      render json: {error: "User is not logged in/could not be found."}
    end
  end

  private
    def session_params
      params.require(:session).permit(:email, :password)
    end
end
