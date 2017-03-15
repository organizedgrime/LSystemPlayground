class LSystem {
	constructor(axiom, constants, rules, properties) {
		this.axiom = axiom;
		this.sentence = this.axiom;
		this.constants = constants;
		this.rules = rules;
		this.properties = properties;
		this.iterate = function() {
			var newSentence = "";
			var rulesJSON = JSON.parse(this.rules);
			for(var index in this.sentence) {
				var swapped = false;
				for(var rule in rulesJSON) {
					if(this.sentence.substring(index, this.sentence.length).indexOf(rule) === 0) {
						newSentence += rulesJSON[rule];
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