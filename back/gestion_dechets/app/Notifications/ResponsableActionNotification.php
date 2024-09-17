<?php 
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ResponsableActionNotification extends Notification
{
    public $action;

    public function __construct($action)
    {
        $this->action = $action;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'action' => $this->action,
        ]);
    }
}
