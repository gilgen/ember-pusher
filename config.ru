require 'bundler/setup'
require 'rake-pipeline'
require 'rake-pipeline/middleware'
require 'rack/rewrite'

use Rack::Rewrite do
  rewrite '/', '/tests/index.html'
end

use Rake::Pipeline::Middleware, Rake::Pipeline::Project.new('Assetfile')
run Rack::Directory.new('.')
