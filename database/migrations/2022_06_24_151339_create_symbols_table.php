<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSymbolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('symbols', function (Blueprint $table) {
            $table->char('short_symbol')->primary();
            $table->string('long_symbol');
        });

        DB::table('symbols')->insert([
            [
                'short_symbol' => 'p',
                'long_symbol' => 'Pipe'
            ],
            [
                'short_symbol' => 'l',
                'long_symbol' => 'Lightbulb'
            ],
            [
                'short_symbol' => 'f',
                'long_symbol' => 'Fist'
            ],
            [
                'short_symbol' => 'b',
                'long_symbol' => 'Badge'
            ],
            [
                'short_symbol' => 'j',
                'long_symbol' => 'Journal'
            ],
            [
                'short_symbol' => 'n',
                'long_symbol' => 'Necklace'
            ],
            [
                'short_symbol' => 'e',
                'long_symbol' => 'Eye'
            ],
            [
                'short_symbol' => 's',
                'long_symbol' => 'Skull'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('symbols');
    }
}
