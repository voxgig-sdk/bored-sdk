<?php
declare(strict_types=1);

// Bored SDK exists test

require_once __DIR__ . '/../bored_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = BoredSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
