<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'description' => ['nullable', 'string', 'min:0', 'max:250'],
            'cash_amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'card_amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'online_transfer_amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
        ];
    }
}
