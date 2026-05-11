<?php
declare(strict_types=1);

// Bored SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class BoredFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BoredBaseFeature();
            case "test":
                return new BoredTestFeature();
            default:
                return new BoredBaseFeature();
        }
    }
}
