<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('table_code', function (Blueprint $table) {
            $table->unsignedBigInteger('dechet_id')->nullable();
            $table->foreign('dechet_id')->references('id')->on('dechets')->onDelete('cascade'); // Assurez-vous que la table 'dechets' existe
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('table_code', function (Blueprint $table) {
            $table->dropForeign(['dechet_id']);
            $table->dropColumn('dechet_id');
        });
    }
};