class EmberPusher

  BUILD_ORDER = %w{
    namespace.js
    initializer.js
    route.js
    controller.js
    listener.js
    trigger.js
  }

  def self.production?
    ENV['BUILD_ENV'] == 'production'
  end

  def self.development?
    return true unless ENV['BUILD_ENV']
    ENV['BUILD_ENV'] == 'development'
  end

end
