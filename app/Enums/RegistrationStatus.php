<?php

namespace App\Enums;

enum RegistrationStatus: string
{
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';

    public function label(): string
    {
        return match ($this) {
            RegistrationStatus::Pending => 'Menunggu',
            RegistrationStatus::Approved => 'Disetujui',
            RegistrationStatus::Rejected => 'Ditolak',
        };
    }

    public function color(): string
    {
        return match ($this) {
            RegistrationStatus::Pending => 'yellow',
            RegistrationStatus::Approved => 'emerald',
            RegistrationStatus::Rejected => 'red',
        };
    }
}
