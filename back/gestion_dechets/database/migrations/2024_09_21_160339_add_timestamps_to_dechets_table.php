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
        Schema::table('dechets', function (Blueprint $table) {
            if (!Schema::hasColumn('dechets', 'created_at')) {
                $table->timestamp('created_at')->nullable();
            }
            if (!Schema::hasColumn('dechets', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }
        });
    }
    
    public function down()
    {
        Schema::table('dechets', function (Blueprint $table) {
            $table->dropColumn(['created_at', 'updated_at']);
        });
    }
    
};
