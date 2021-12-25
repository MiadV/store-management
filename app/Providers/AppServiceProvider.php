<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        // Use our customized personal access token model
        Sanctum::usePersonalAccessTokenModel(
            PersonalAccessToken::class
        );
        // https://laravel.com/docs/8.x/eloquent-resources#data-wrapping
        JsonResource::withoutWrapping();
    }
}
