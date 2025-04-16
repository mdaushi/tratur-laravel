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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('current_team_id')->nullable()->after('remember_token');
            $table->unsignedBigInteger('default_team_id')->nullable()->after('remember_token');

            // jika team dihapus maka set null
            $table->foreign('current_team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('set null');

            $table->foreign('default_team_id')
                ->references('id')
                ->on('teams')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['current_team_id', 'default_team_id']);
            $table->dropColumns(['current_team_id', 'default_team_id']);
        });
    }
};
