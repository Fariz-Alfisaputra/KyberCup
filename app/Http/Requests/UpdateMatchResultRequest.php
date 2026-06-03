<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMatchResultRequest extends FormRequest
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
            'winner_id' => ['required', 'integer', 'exists:teams,id'],
            'skor_team1' => ['required', 'integer', 'min:0'],
            'skor_team2' => ['required', 'integer', 'min:0'],
            'catatan' => ['nullable', 'string'],
        ];
    }
}
