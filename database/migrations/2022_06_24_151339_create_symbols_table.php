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
            $table->id();
            $table->char('short_symbol');
            $table->string('long_symbol');
            $table->integer('total_in_game');
        });

        DB::table('symbols')->insert([
            [
                'short_symbol' => 'p',
                'long_symbol' => 'Pipe',
                'total_in_game' => 5
            ],
            [
                'short_symbol' => 'l',
                'long_symbol' => 'Lightbulb',
                'total_in_game' => 5
            ],
            [
                'short_symbol' => 'f',
                'long_symbol' => 'Fist',
                'total_in_game' => 5
            ],
            [
                'short_symbol' => 'b',
                'long_symbol' => 'Badge',
                'total_in_game' => 5
            ],
            [
                'short_symbol' => 'j',
                'long_symbol' => 'Journal',
                'total_in_game' => 4
            ],
            [
                'short_symbol' => 'n',
                'long_symbol' => 'Necklace',
                'total_in_game' => 3
            ],
            [
                'short_symbol' => 'e',
                'long_symbol' => 'Eye',
                'total_in_game' => 3
            ],
            [
                'short_symbol' => 's',
                'long_symbol' => 'Skull',
                'total_in_game' => 3
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
