<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AdminDashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — MedAlign Healthcare Engine
|--------------------------------------------------------------------------
*/

// Authentication API Routes (Public with throttle security defense)
Route::middleware('throttle:10,1')->prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/send-otp', [AuthController::class, 'sendOtp']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPasswordWithOtp']);
});

// Authenticated Routes (Protected by JWT and Sanctum)
Route::middleware(['jwt.auth'])->prefix('auth')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\DoctorDashboardController;

// Admin Dashboard Routes
Route::prefix('admin')->group(function () {
    Route::get('/dashboard-stats', [AdminDashboardController::class, 'index']);
});

// Doctor Dashboard Routes
Route::prefix('doctor')->group(function () {
    Route::get('/queue-snapshot', [DoctorDashboardController::class, 'show']);
    Route::get('/dashboard', [DoctorDashboardController::class, 'show']);
    Route::post('/queue/call-next', [DoctorDashboardController::class, 'callNext']);
    Route::post('/queue/next', [DoctorDashboardController::class, 'callNext']);
    Route::patch('/queue/{token}/status', [DoctorDashboardController::class, 'updateStatus']);
    Route::patch('/queue/{token}', [DoctorDashboardController::class, 'updateStatus']);
});

// Patient Portal API Routes (ERD & Workflow)
Route::prefix('patient')->group(function () {
    Route::get('/search', [PatientController::class, 'searchPatient']);
    Route::get('/token/{identifier}', [PatientController::class, 'getQueueToken']);
    Route::get('/{patient_id}/alerts', [PatientController::class, 'getAlertPreferences']);
    Route::post('/{patient_id}/alerts', [PatientController::class, 'updateAlertPreferences']);
    Route::get('/{patient_id}/vault', [PatientController::class, 'getMedicalVault']);
    Route::get('/prescription/{id}', [PatientController::class, 'getPrescriptionDetail']);
});

// General CRUD endpoints
Route::get('/items', [UsersController::class, 'index']);
Route::get('/items/{id}', [UsersController::class, 'show']);
Route::post('/items', [UsersController::class, 'store']);
Route::put('/items/{id}', [UsersController::class, 'update']);
Route::patch('/items/{id}', [UsersController::class, 'patch']);
Route::delete('/items/{id}', [UsersController::class, 'destroy']);

Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
