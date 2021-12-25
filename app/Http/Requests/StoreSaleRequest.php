<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
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
            'shop_id' => ['required', 'integer', 'exists:shops,id'],
            'description' => ['nullable', 'string', 'min:0', 'max:250'],
            'report_date' => ['required', 'date_format:Y-m-d', 'before_or_equal:today'], // today or in the past
            'cash_amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'card_amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'online_transfer_amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
        ];
    }

}
