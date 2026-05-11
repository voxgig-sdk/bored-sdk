# Bored SDK exists test

require "minitest/autorun"
require_relative "../Bored_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = BoredSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
