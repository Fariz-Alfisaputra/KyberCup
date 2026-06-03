<?php

namespace App\Models;

use App\Enums\TournamentFormat;
use App\Enums\TournamentStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama', 'slug', 'game_id', 'format', 'max_tim', 'hadiah', 'prize_pool', 'deskripsi', 'banner', 'status', 'tanggal_mulai', 'tanggal_selesai', 'registration_deadline', 'created_by'])]
class Tournament extends Model
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
            'status' => TournamentStatus::class,
            'format' => TournamentFormat::class,
            'tanggal_mulai' => 'date',
            'tanggal_selesai' => 'date',
            'registration_deadline' => 'datetime',
            'prize_pool' => 'decimal:2',
        ];
    }

    /** @return BelongsTo<Game, $this> */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    /** @return BelongsTo<User, $this> */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** @return HasMany<TournamentRegistration, $this> */
    public function registrations(): HasMany
    {
        return $this->hasMany(TournamentRegistration::class);
    }

    /** @return BelongsToMany<Team, $this> */
    public function approvedTeams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'tournament_registrations')
            ->wherePivot('status', 'approved')
            ->withPivot('status', 'catatan')
            ->withTimestamps();
    }

    /** @return HasMany<TournamentMatch, $this> */
    public function matches(): HasMany
    {
        return $this->hasMany(TournamentMatch::class);
    }

    /** @return HasMany<Standing, $this> */
    public function standings(): HasMany
    {
        return $this->hasMany(Standing::class)->orderBy('posisi');
    }

    public function getBannerUrlAttribute(): ?string
    {
        if ($this->banner) {
            return asset('storage/'.$this->banner);
        }

        return null;
    }

    public function scopeOpen(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where('status', TournamentStatus::Open);
    }

    public function scopeOngoing(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where('status', TournamentStatus::Ongoing);
    }

    public function scopePublic(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereIn('status', [
            TournamentStatus::Open,
            TournamentStatus::Ongoing,
            TournamentStatus::Selesai,
        ]);
    }

    public function isRegistrationOpen(): bool
    {
        return $this->status === TournamentStatus::Open
            && ($this->registration_deadline === null || $this->registration_deadline->isFuture());
    }

    public function getRegistrationsCountAttribute(): int
    {
        return $this->registrations()->where('status', 'approved')->count();
    }
}
