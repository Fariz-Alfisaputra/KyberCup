<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Captain = 'captain';
    case Member = 'member';

    public function label(): string
    {
        return match ($this) {
            UserRole::Admin => 'Administrator',
            UserRole::Captain => 'Captain',
            UserRole::Member => 'Member',
        };
    }

    public function color(): string
    {
        return match ($this) {
            UserRole::Admin => 'red',
            UserRole::Captain => 'yellow',
            UserRole::Member => 'blue',
        };
    }
}
