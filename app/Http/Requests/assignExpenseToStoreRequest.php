<?php


namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class assignExpenseToStoreRequest extends FormRequest
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
            "expense_type_id" => ['required', 'integer'],
            'limit_amount' => ['nullable', 'regex:/^\d+(\.\d{1,2})?$/'],
            'strict_limit' => ['nullable', 'boolean'],
        ];
    }
}
