class EmberPusher

  PACKAGE = JSON.parse(File.read(
    File.join(File.dirname(__FILE__), 'package.json')
  ))

  def self.package(key)
    PACKAGE[key.to_s]
  end

  def self.production?
    ENV['BUILD_ENV'] == 'production'
  end

  def self.development?
    return true unless ENV['BUILD_ENV']
    ENV['BUILD_ENV'] == 'development'
  end

end
