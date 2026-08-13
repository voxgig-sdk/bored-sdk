# Bored SDK utility: make_context

from bored_sdk.core.context import BoredContext


def make_context_util(ctxmap, basectx):
    return BoredContext(ctxmap, basectx)
