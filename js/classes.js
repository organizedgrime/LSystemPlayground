class LSystem {
	constructor(axiom, rules, properties) {
		this.axiom = axiom;
		this.sentence = this.axiom;
		this.rules = rules;
		this.properties = properties;
		this.iterate = function() {
			var newSentence = "";
			for(var index in this.sentence) {
				var swapped = false;
				for(var rule in rules) {
					if(this.sentence.substring(index, this.sentence.length).indexOf(rule) === 0) {
						newSentence += rules[rule];
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