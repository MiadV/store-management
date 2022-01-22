<?php

namespace App\Exports;

use App\Models\Expense;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ExpensesExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    public function forShop($forShop)
    {
        $this->forShop = $forShop;

        return $this;
    }

    public function fromDate($fromDate)
    {
        $this->fromDate = $fromDate;

        return $this;
    }

    public function dateTo($dateTo)
    {
        $this->dateTo = $dateTo;

        return $this;
    }


    public function headings(): array
    {
        return [
            '_EXPENSE_ID',
            '_EXPENSE_RULE_ID',
            '_SHOP_ID',
            '_EXPENSE_TYPE_ID',
            '_USER_ID',
            'EXPENSE_TYPE',
            'ACCOUNTANT_ONLY',
            'SHOP',
            'USER',
            'DESCRIPTION',
            'REPORT_DATE',
            'AMOUNT',
            'ATTACHMENTS',

        ];
    }

    /**
     * @var Expense $report
     */
    public function map($report): array
    {
        $imagesPaths = '';
        $images = $report->images;

        if (!empty($images)) {
            $images->transform(function($item){
                return asset("{$item->image_path}{$item->name}");
            });

            $imagesPaths = $images->join(' , ');
        }

        return [
            $report->id, //EXPENSE_ID
            $report->expense_type_shop_id, //EXPENSE_RULE_ID
            $report->shop_id, //SHOP_ID
            $report->expense_type_id, //EXPENSE_TYPE_ID
            $report->user_id , //USER_ID
            $report->expenseType->title, //EXPENSE_TYPE
            $report->expenseType->accountant_only, //ACCOUNTANT_ONLY
            $report->shop->title, //SHOP
            $report->user->name, //USER
            $report->description, //DESCRIPTION
            Date::dateTimeToExcel(new \DateTime($report->report_date)),//REPORT_DATE
            $report->amount, //AMOUNT
            $imagesPaths, //ATTACHMENTS
        ];
    }


    public function query()
    {
        $shopId = $this->forShop ?? null;
        $dateFrom = $this->fromDate ?? null;
        $dateTo = $this->dateTo ?? null;


        return Expense::query()->with(['user', 'images', 'shop', 'expenseType'])
            ->where(function ($query) use ($shopId, $dateFrom, $dateTo) {
                if ($shopId) $query->where('shop_id', $shopId);
                if ($dateFrom && $dateTo) $query->whereBetween('report_date', [$dateFrom, $dateTo]);
            })
            ->orderBy('report_date', 'desc');


    }
}
