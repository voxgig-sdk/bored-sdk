# Bored SDK utility: feature_add
module BoredUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
