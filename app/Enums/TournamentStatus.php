<?php

namespace App\Enums;

enum TournamentStatus: string
{
    case Draft = 'draft';
    case Open = 'open';
    case Ongoing = 'ongoing';
    case Selesai = 'selesai';

    public function label(): string
    {
        return match ($this) {
            TournamentStatus::Draft => 'Draft',
            TournamentStatus::Open => 'Open Registration',
            TournamentStatus::Ongoing => 'Ongoing',
            TournamentStatus::Selesai => 'Selesai',
        };
    }

    public function color(): string
    {
        return match ($this) {
            TournamentStatus::Draft => 'zinc',
            TournamentStatus::Open => 'emerald',
            TournamentStatus::Ongoing => 'violet',
            TournamentStatus::Selesai => 'blue',
        };
    }
}
