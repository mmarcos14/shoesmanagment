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
        Schema::create('adresses', function (Blueprint $table) {
            $table->increments("id");
            $table->string("street");
            $table->string("city");
            $table->string("zip");
            $table->string("state");
            $table->date("date_created");
            $table->date("date_update")->nullable();
            $table->integer("employee")->unsigned();
            $table->foreign("employee")->references("id")->on("employees")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adresses');
    }
};
