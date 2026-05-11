# ProjectName SDK exists test

import pytest
from bored_sdk import BoredSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BoredSDK.test(None, None)
        assert testsdk is not None
