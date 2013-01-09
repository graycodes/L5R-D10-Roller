$(document).ready(function() {
    $('#new-roll').click(function() {
        var diceNum = $('#dice').val();
        var keepNum = $('#keep').val();
        if (!diceNum || !keepNum) {
            alert('Enter the numbers');
        } else {
            var dice = new dieSet();
            var newRoll = dice.roll(diceNum, keepNum);
            var kept = newRoll.kept;
            var rolled = newRoll.rolls;

			$('#total').text(kept);
            $('#output').text('You rolled ' + rolled);
        }
    });

    $('#avg-roll').click(function() {
        var diceNum = $('#dice').val();
        var keepNum = $('#keep').val();
        if (!diceNum || !keepNum) {
            alert('Enter the numbers');
        } else {
            var a; //well named variable
            var count = 0;
            var d = new dieSet();
            var i;
            for (i = 0; i < 10000; i++) {
                a = d.roll(diceNum, keepNum).kept;
                count += a;
            }
            var avg = (count / i).toFixed(1);
            $('#total').text(avg);
            $('#output').text('On average');
        }
    });

    var dieSet = function() {
        var that = this;

        this.roll = function(dice, keep) {

            var rolls = [];

            for (var i = 0; i < dice; i++) {
                this["die" + i] = new that.die();
                rolls.push(this["die" + i].roll());
            }

            rolls.sort(function(a, b) {
                return b - a;
            });

            var kept = 0;

            for (var i = 0; i < keep; i++) {
                kept += rolls[i];
            }

            return {
                kept: kept,
                rolls: rolls
            };
        };

        this.die = function() {
            var that = this;
            this.sides = 10;

            this.roll = function(plus) {
                plus = plus || 0;
                var rolled = Math.floor(Math.random() * that.sides);
                var result = rolled + plus;
                if (rolled === 0) {
                    result = that.roll(result + that.sides);
                }
                return result;
            };

        };
    };
});