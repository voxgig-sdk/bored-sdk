# Bored SDK feature factory

from bored_sdk.feature.base_feature import BoredBaseFeature
from bored_sdk.feature.test_feature import BoredTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BoredBaseFeature(),
        "test": lambda: BoredTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
