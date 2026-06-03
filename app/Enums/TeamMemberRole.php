<?php

namespace App\Enums;

enum TeamMemberRole: string
{
    case Captain = 'captain';
    case Member = 'member';

    public function label(): string
    {
        return match ($this) {
            TeamMemberRole::Captain => 'Captain',
            TeamMemberRole::Member => 'Member',
        };
    }
}
