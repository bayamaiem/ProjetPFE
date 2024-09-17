<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DemandeEtatChange extends Mailable
{
    use Queueable, SerializesModels;

    public $etat;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($etat)
    {
        $this->etat = $etat;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Demande Dechet',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'mail.request-waste',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
    public function build()
    {
        $subject = $this->etat ? 'Votre demande est acceptée' : 'Votre demande est refusée';
        return $this->subject($subject)
            ->view('emails.demandeEtatChange')
            ->with('etat', $this->etat);
    }
}
