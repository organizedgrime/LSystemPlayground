class WeightedList {
	constructor(initList) {
		this.list = initList;
		this.random = function() {
			var total = 0;
			for(var i in this.list) {
				total += this.list[i];
			}

			var sum = 0, rand = Math.random();
			for(var i in this.list) {
				sum += this.list[i] / total;
				if(rand <= sum) {
					return i;
				}
			}
		}
	}
}

class LSystem {
	constructor(axiom, rules) {
		this.sentence = axiom;
		this.rules = rules;
		this.iterate = function() {
			var newSentence = "";
			for(var index in this.sentence) {
				var swapped = false;
				for(var rule in rules) {
					if(this.sentence.substring(index, this.sentence.length).indexOf(rule) === 0) {
						newSentence += rules[rule].random();
						this.sentence.slice(rule.length);
						swapped = true;
						break;
					}
				}
				if(!swapped) {
					newSentence += this.sentence.charAt(index);
					this.sentence.slice(1);
				}
			}
			this.sentence = newSentence;
		}
	}
}

class Turtle {
	constructor(state) {
		this.stack = [];
		this.state = state;
	}
}