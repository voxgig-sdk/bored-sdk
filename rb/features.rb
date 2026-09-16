# Bored SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module BoredFeatures
  def self.make_feature(name)
    case name
    when "base"
      BoredBaseFeature.new
    when "ratelimit"
      BoredRatelimitFeature.new
    when "retry"
      BoredRetryFeature.new
    when "test"
      BoredTestFeature.new
    when "timeout"
      BoredTimeoutFeature.new
    else
      BoredBaseFeature.new
    end
  end
end
