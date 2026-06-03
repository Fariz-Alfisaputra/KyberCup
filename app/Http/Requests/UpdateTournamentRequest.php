<?php

namespace App\Http\Requests;

use App\Enums\TournamentFormat;
use App\Enums\TournamentStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTournamentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255'],
            'game_id' => ['required', 'integer', 'exists:games,id'],
            'format' => ['required', Rule::enum(TournamentFormat::class)],
            'max_tim' => ['required', 'integer', 'min:2', 'max:128'],
            'hadiah' => ['nullable', 'string', 'max:255'],
            'prize_pool' => ['nullable', 'numeric', 'min:0'],
            'deskripsi' => ['nullable', 'string'],
            'banner' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'status' => ['required', Rule::enum(TournamentStatus::class)],
            'tanggal_mulai' => ['nullable', 'date'],
            'tanggal_selesai' => ['nullable', 'date', 'after_or_equal:tanggal_mulai'],
            'registration_deadline' => ['nullable', 'date'],
        ];
    }
}
