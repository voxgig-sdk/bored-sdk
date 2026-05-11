# Bored SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module BoredFeatures
  def self.make_feature(name)
    case name
    when "base"
      BoredBaseFeature.new
    when "test"
      BoredTestFeature.new
    else
      BoredBaseFeature.new
    end
  end
end
