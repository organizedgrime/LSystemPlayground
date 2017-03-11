var getExamples = function() {
	return {
		'preset': 'Koch',
		'closed': false,
		'remembered' : {
			'Koch': {
				'0': {
					'angle': 60
				},
				'1': {
					'axiom': 'F-F-F-F-F-F',
					'rules': '{"F":"F-F++F-F"}'
				},
				'2': {
					'iterations': 4,
					'dhue': 6,
					'zoom': 4,
					'rotation': 0
				}
			},
			'Serpinski Triangle': {
				'0': {
					'angle': 120
				},
				'1': {
					'axiom': 'F-G-G',
					'rules': '{"F":"F-G+F+G-F", "G":"GG"}'
				},
				'2': {
					'iterations': 4,
					'dhue': 40,
					'zoom': 30,
					'rotation': 150
				}
			},
			'Serpinski Curve': {
				'0': {
					'angle': 60
				},
				'1': {
					'axiom': 'F',
					'rules': '{"F":"+G-F-G+", "G":"-F+G+F-"}'
				},
				'2': {
					'iterations': 6,
					'dhue': 12,
					'zoom': 7,
					'rotation': 90
				}
			},
			'Dragon': {
				'0': {
					'angle': 90
				},
				'1': {
					'axiom': 'FX',
					'rules': '{"X": "X+YF+", "Y": "-FX-Y"}'
				},
				'2': {
					'iterations': 11,
					'dhue': 4.2,
					'zoom': 17,
					'rotation': 135
				}
			},
			'Hilbert': {
				'0': {
					'angle': 90
				},
				'1': {
					'axiom': 'L',
					'rules': '{"L": "+RF-LFL-FR+", "R": "-LF+RFR+FL-"}'
				},
				'2': {
					'iterations': 3,
					'dhue': 123,
					'zoom': 70,
					'rotation': 90
				}
			},
			'Tree': {
				'0': {
					'angle': 25
				},
				'1': {
					'axiom': 'X',
					'rules': '{"X": "F-[[X]+X]+F[+FX]-X", "F": "FF"}'
				},
				'2': {
					'iterations': 6,
					'dhue': 1.3,
					'zoom': 4.4,
					'rotation': 180
				}
			}
		},
		"folders": {
			"LSystem": {
			"preset": "Default",
			"closed": false,
			"folders": {}
			},
			"Appearance": {
			"preset": "Default",
			"closed": false,
			"folders": {}
			}
		}
	};
}