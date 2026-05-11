# Bored SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

BoredUtility.registrar = ->(u) {
  u.clean = BoredUtilities::Clean
  u.done = BoredUtilities::Done
  u.make_error = BoredUtilities::MakeError
  u.feature_add = BoredUtilities::FeatureAdd
  u.feature_hook = BoredUtilities::FeatureHook
  u.feature_init = BoredUtilities::FeatureInit
  u.fetcher = BoredUtilities::Fetcher
  u.make_fetch_def = BoredUtilities::MakeFetchDef
  u.make_context = BoredUtilities::MakeContext
  u.make_options = BoredUtilities::MakeOptions
  u.make_request = BoredUtilities::MakeRequest
  u.make_response = BoredUtilities::MakeResponse
  u.make_result = BoredUtilities::MakeResult
  u.make_point = BoredUtilities::MakePoint
  u.make_spec = BoredUtilities::MakeSpec
  u.make_url = BoredUtilities::MakeUrl
  u.param = BoredUtilities::Param
  u.prepare_auth = BoredUtilities::PrepareAuth
  u.prepare_body = BoredUtilities::PrepareBody
  u.prepare_headers = BoredUtilities::PrepareHeaders
  u.prepare_method = BoredUtilities::PrepareMethod
  u.prepare_params = BoredUtilities::PrepareParams
  u.prepare_path = BoredUtilities::PreparePath
  u.prepare_query = BoredUtilities::PrepareQuery
  u.result_basic = BoredUtilities::ResultBasic
  u.result_body = BoredUtilities::ResultBody
  u.result_headers = BoredUtilities::ResultHeaders
  u.transform_request = BoredUtilities::TransformRequest
  u.transform_response = BoredUtilities::TransformResponse
}
