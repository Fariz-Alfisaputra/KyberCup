<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama_tim', 'slug', 'logo', 'deskripsi', 'captain_id', 'invite_code', 'is_active'])]
class Team extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function captain(): BelongsTo
    {
        return $this->belongsTo(User::class, 'captain_id');
    }

    /** @return BelongsToMany<User, $this> */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members')
            ->withPivot('role', 'joined_at')
            ->withTimestamps();
    }

    /** @return HasMany<TeamMember, $this> */
    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    /** @return HasMany<TournamentRegistration, $this> */
    public function registrations(): HasMany
    {
        return $this->hasMany(TournamentRegistration::class);
    }

    public function getLogoUrlAttribute(): ?string
    {
        if ($this->logo) {
            return asset('storage/'.$this->logo);
        }

        return null;
    }

    public function scopeActive(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where('is_active', true);
    }

    public function generateInviteCode(): string
    {
        $code = strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 6));
        $this->invite_code = $code;
        $this->save();

        return $code;
    }

    public function getMembersCountAttribute(): int
    {
        return $this->members()->count();
    }
}
