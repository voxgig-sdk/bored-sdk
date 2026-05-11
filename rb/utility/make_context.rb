# Bored SDK utility: make_context
require_relative '../core/context'
module BoredUtilities
  MakeContext = ->(ctxmap, basectx) {
    BoredContext.new(ctxmap, basectx)
  }
end
