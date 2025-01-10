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
            $table->increments("id");
            $table->string("empcode");
            $table->string("name");
            $table->string("lastname");
            $table->string("birthday");
            $table->string("status")->default("1");
            $table->date("date_register");
            $table->integer("function_id")->unsigned();
            $table->foreign("function_id")->references("id")->on("functions")->onDelete("cascade");
            $table->integer("employee_id")->unsigned();
            $table->foreign("employee_id")->references("id")->on("employees")->onDelete("cascade");
            $table->timestamps();
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
