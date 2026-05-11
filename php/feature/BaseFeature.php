<?php
declare(strict_types=1);

// Bored SDK base feature

class BoredBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BoredContext $ctx, array $options): void {}
    public function PostConstruct(BoredContext $ctx): void {}
    public function PostConstructEntity(BoredContext $ctx): void {}
    public function SetData(BoredContext $ctx): void {}
    public function GetData(BoredContext $ctx): void {}
    public function GetMatch(BoredContext $ctx): void {}
    public function SetMatch(BoredContext $ctx): void {}
    public function PrePoint(BoredContext $ctx): void {}
    public function PreSpec(BoredContext $ctx): void {}
    public function PreRequest(BoredContext $ctx): void {}
    public function PreResponse(BoredContext $ctx): void {}
    public function PreResult(BoredContext $ctx): void {}
    public function PreDone(BoredContext $ctx): void {}
    public function PreUnexpected(BoredContext $ctx): void {}
}
