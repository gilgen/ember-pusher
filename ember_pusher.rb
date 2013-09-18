class EmberPusher

  BUILD_INFO = JSON.parse(File.read(
    File.join(File.dirname(__FILE__), 'build.json')
  ))

  @environment = ENV['BUILD_ENV'] || 'development'

  def self.build_info(key)
    BUILD_INFO[key.to_s]
  end

  def self.production?
    @environment == 'production'
  end

  def self.development?
    @environment == 'development'
  end

end
