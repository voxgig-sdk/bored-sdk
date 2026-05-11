<?php
declare(strict_types=1);

// Bored SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BoredMakeContext
{
    public static function call(array $ctxmap, ?BoredContext $basectx): BoredContext
    {
        return new BoredContext($ctxmap, $basectx);
    }
}
