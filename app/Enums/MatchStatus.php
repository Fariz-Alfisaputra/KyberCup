<?php

namespace App\Enums;

enum MatchStatus: string
{
    case Scheduled = 'scheduled';
    case Ongoing = 'ongoing';
    case Selesai = 'selesai';
    case Walkover = 'walkover';

    public function label(): string
    {
        return match ($this) {
            MatchStatus::Scheduled => 'Terjadwal',
            MatchStatus::Ongoing => 'Berlangsung',
            MatchStatus::Selesai => 'Selesai',
            MatchStatus::Walkover => 'Walkover',
        };
    }

    public function color(): string
    {
        return match ($this) {
            MatchStatus::Scheduled => 'blue',
            MatchStatus::Ongoing => 'yellow',
            MatchStatus::Selesai => 'emerald',
            MatchStatus::Walkover => 'zinc',
        };
    }
}
