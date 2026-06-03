<?php

namespace App\Enums;

enum TournamentFormat: string
{
    case SingleElimination = 'single_elimination';
    case DoubleElimination = 'double_elimination';
    case RoundRobin = 'round_robin';

    public function label(): string
    {
        return match ($this) {
            TournamentFormat::SingleElimination => 'Single Elimination',
            TournamentFormat::DoubleElimination => 'Double Elimination',
            TournamentFormat::RoundRobin => 'Round Robin',
        };
    }
}
