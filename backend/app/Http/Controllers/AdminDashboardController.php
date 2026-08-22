<?php

namespace App\Http\Controllers;

use App\Http\Services\AdminDashboardService;

class AdminDashboardController extends Controller
{
    public function __construct(
        private AdminDashboardService $dashboardService
    ) {
    }

    public function index()
    {
        return $this->dashboardService->getDashboardData();
    }
}
