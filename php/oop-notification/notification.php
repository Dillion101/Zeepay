<?php

declare(strict_types=1);

interface NotificationChannel
{
    public function send(): void;
}

abstract class Notification implements NotificationChannel
{
    protected string $recipient;
    protected string $message;

    public function __construct(string $recipient, string $message)
    {
        $this->recipient = $recipient;
        $this->message = $message;
    }

    protected function formatLog(string $channel): string
    {
        return "[{$channel}] To: {$this->recipient} | Message: {$this->message}";
    }

    abstract public function send(): void;
}

class EmailNotification extends Notification
{
    private string $subject;

    public function __construct(
        string $recipient,
        string $message,
        string $subject,
    ) {
        parent::__construct($recipient, $message);
        $this->subject = $subject;
    }

    public function send(): void
    {
        echo $this->formatLog("EMAIL") .
            " | Subject: {$this->subject}" .
            PHP_EOL;
    }
}

class SmsNotification extends Notification
{
    private string $phoneNumber;

    public function __construct(
        string $recipient,
        string $message,
        string $phoneNumber,
    ) {
        parent::__construct($recipient, $message);
        $this->phoneNumber = $phoneNumber;
    }

    public function send(): void
    {
        echo $this->formatLog("SMS") .
            " | Phone: {$this->phoneNumber}" .
            PHP_EOL;
    }
}

class PushNotification extends Notification
{
    private string $deviceToken;

    public function __construct(
        string $recipient,
        string $message,
        string $deviceToken,
    ) {
        parent::__construct($recipient, $message);
        $this->deviceToken = $deviceToken;
    }

    public function send(): void
    {
        echo $this->formatLog("PUSH") .
            " | Token: {$this->deviceToken}" .
            PHP_EOL;
    }
}

class NotificationService
{
    public function dispatch(NotificationChannel $channel): void
    {
        $channel->send();
    }

    public function dispatchAll(array $channels): void
    {
        foreach ($channels as $channel) {
            $channel->send();
        }
    }
}

// --- Usage ---

$service = new NotificationService();

$email = new EmailNotification(
    recipient: "kwame@example.com",
    message: "Your Banku order has been placed. Thank you for buying from us.",
    subject: "Order Update - Burger King",
);

$sms = new SmsNotification(
    recipient: "Kwame Mensah",
    message: "Your Rider has taken the food. Thank you for your patience",
    phoneNumber: "+233241234567",
);

$push = new PushNotification(
    recipient: "Kwame Mensah",
    message: "The disatch rider has arrived at your location",
    deviceToken: "abc123devicetoken",
);

// Dispatch individually
echo "--- Single dispatch ---" . PHP_EOL;
$service->dispatch($email);
$service->dispatch($sms);
$service->dispatch($push);

// Dispatch all at once
echo PHP_EOL . "--- Batch dispatch ---" . PHP_EOL;
$service->dispatchAll([$email, $sms, $push]);
