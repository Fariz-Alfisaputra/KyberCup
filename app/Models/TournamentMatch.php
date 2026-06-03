<?php

namespace App\Models;

use App\Enums\MatchStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tournament_id', 'team1_id', 'team2_id', 'winner_id', 'skor_team1', 'skor_team2', 'round', 'bracket_position', 'status', 'jadwal', 'catatan'])]
class TournamentMatch extends Model
{
    protected $table = 'matches';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => MatchStatus::class,
            'jadwal' => 'datetime',
        ];
    }

    /** @return BelongsTo<Tournament, $this> */
    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    /** @return BelongsTo<Team, $this> */
    public function team1(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team1_id');
    }

    /** @return BelongsTo<Team, $this> */
    public function team2(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team2_id');
    }

    /** @return BelongsTo<Team, $this> */
    public function winner(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'winner_id');
    }

    public function scopeByRound(\Illuminate\Database\Eloquent\Builder $query, int $round): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where('round', $round);
    }

    public function scopeFinished(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereIn('status', [MatchStatus::Selesai, MatchStatus::Walkover]);
    }
}
