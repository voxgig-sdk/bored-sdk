# Bored SDK feature factory

from bored_sdk.feature.base_feature import BoredBaseFeature
from bored_sdk.feature.ratelimit_feature import BoredRatelimitFeature
from bored_sdk.feature.retry_feature import BoredRetryFeature
from bored_sdk.feature.test_feature import BoredTestFeature
from bored_sdk.feature.timeout_feature import BoredTimeoutFeature


_FEATURES = {
    "base": lambda: BoredBaseFeature(),
    "ratelimit": lambda: BoredRatelimitFeature(),
    "retry": lambda: BoredRetryFeature(),
    "test": lambda: BoredTestFeature(),
    "timeout": lambda: BoredTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
