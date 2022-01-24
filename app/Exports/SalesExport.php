<?php

namespace App\Exports;

use App\Models\Sale;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class SalesExport implements FromQuery, WithHeadings, WithMapping
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
            '_SALE_ID',
            '_SHOP_ID',
            '_USER_ID',
            'SHOP',
            'USER',
            'DESCRIPTION',
            'REPORT_DATE',
            'CASH_AMOUNT',
            'CARD_AMOUNT',
            'ONLINE_TRANSFER_AMOUNT',
        ];
    }

    /**
     * @var Sale $report
     */
    public function map($report): array
    {
        return [
            $report->id, //_SALE_ID
            $report->shop_id, //_SHOP_ID
            $report->user_id, //_USER_ID
            $report->shop->title, //SHOP
            $report->user->name, //USER
            $report->description, //DESCRIPTION
            Date::dateTimeToExcel(new \DateTime($report->report_date)),//REPORT_DATE
            $report->cash_amount, //CASH_AMOUNT
            $report->card_amount, //CARD_AMOUNT
            $report->online_transfer_amount, //ONLINE_TRANSFER_AMOUNT
        ];
    }


    public function query()
    {
        $shopId = $this->forShop ?? null;
        $dateFrom = $this->fromDate ?? null;
        $dateTo = $this->dateTo ?? null;


        return Sale::query()->with(['user', 'shop'])
            ->where(function ($query) use ($shopId, $dateFrom, $dateTo) {
                if ($shopId) $query->where('shop_id', $shopId);
                if ($dateFrom && $dateTo) $query->whereBetween('report_date', [$dateFrom, $dateTo]);
            })
            ->orderBy('report_date', 'desc');


    }
}
