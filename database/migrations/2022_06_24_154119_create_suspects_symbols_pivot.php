<?php

use App\Models\Suspect;
use App\Models\Symbol;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSuspectsSymbolsPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suspects_symbols', function (Blueprint $table) {
            $table->integer('suspect_id');
            $table->integer('symbol_id');
        });

        $manifest = [
            "Sebastian Moran" => ["s", "f"],
            "Irene Adler" => ["s", "l", "n"],
            "Inspector Lestrade" => ["b", "e", "j"],
            "Inspector Gregson" => ["b", "f", "j"],
            "Inspector Baynes" => ["b", "l"],
            "Inspector Bradstreet" => ["b", "f"],
            "Inspector Hopkins" => ["b", "p", "e"],
            "Sherlock Holmes" => ["p", "l", "f"],
            "John Watson" => ["p", "e", "f"],
            "Mycroft Holmes" => ["p", "l", "j"],
            "Mrs. Hudson" => ["p", "n"],
            "Mary Morstan" => ["j", "n"],
            "James Moriarty" => ["s", "l"],
        ];

        foreach($manifest as $name => $symbols) {
            $symbolIds = Symbol::whereIn('short_symbol', $symbols)->pluck('id');
            $suspect = Suspect::where('name', $name)->first();
            $suspect->symbols()->sync($symbolIds);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suspects_symbols');
    }
}
