<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Employee's name
            $table->string('position'); // Employee's position
            $table->string('department'); // Employee's department
            $table->decimal('salaire', 10, 2); // Employee's salary
            $table->decimal('prime', 10, 2)->default(0); // Employee's bonus
            $table->decimal('totalSalaire', 10, 2); // Employee's total salary (salary + bonus)
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
