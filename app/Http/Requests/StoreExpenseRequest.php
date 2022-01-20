<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
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
            "shop_id" => ['required', 'integer'],
            "expense_type_shop_id" => ['required', 'integer'],
            'description' => ['nullable', 'string', 'min:0', 'max:250'],
            'amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'report_date' => ['required', 'date_format:Y-m-d', 'before:tomorrow'], // today or in the past
            "image_ids" => ['present', 'array'],
        ];
    }
}
