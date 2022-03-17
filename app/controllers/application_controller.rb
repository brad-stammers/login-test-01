class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def jwt_key
    # Rails.application.credentials.jwt-key
    "7L0G8MrXPJNFcEkiysEfy68OP8LSILJdwPQq7Rc3qL0="
  end

  def issue_token(user)
    puts "token: user.id = " + user.id.to_s
    puts "jwt_key = " + jwt_key
    JWT.encode({ user_id: user.id }, jwt_key, "HS256")
  end

  def decoded_token
    begin
      JWT.decode(token, jwt_key, true, { algorithm: 'HS256' })
    rescue => exception
      [{error: "Invalid Token"}]
    end
  end

  def token
    request.headers["Authorization"]
  end

  def user_id
    decoded_token.first["user_id"]
  end

  def current_user
    user ||= User.find_by(id: user_id)
  end

  def logged_in?
    !!current_user
  end
end
