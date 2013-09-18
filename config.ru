require 'bundler/setup'
require 'rake-pipeline'
require 'rake-pipeline/middleware'
require 'rack/rewrite'
require 'uglifier'
require 'json'
require File.join(File.dirname(__FILE__), 'ember_pusher')

use Rack::Rewrite do
  rewrite '/', '/tests/index.html'
end

use Rake::Pipeline::Middleware, Rake::Pipeline::Project.new('Assetfile')
run Rack::Directory.new('.')
