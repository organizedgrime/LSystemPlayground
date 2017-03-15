var getExamples = function() {
	return {
		'preset': 'Koch',
		'closed': false,
		'remembered' : {
			'Koch Snowflake': {
				'0': {
					'angle': 60
				},
				'1': {
					'axiom': 'F-F-F-F-F-F',
					'rules': '{"F":"F-F++F-F"}',
					'constants': 'F'
				},
				'2': {
					'iterations': 4,
					'dhue': 6,
					'zoom': 4,
					'rotation': 0
				}
			},
			'Flow Snake': {
				'0': {
					'angle': 60
				},
				'1': {
					'axiom': 'F',
					'rules': '{"F":"F-G--G+F++FF+G-", "G":"+F-GG--G-F++F+G"}',
					'constants': 'FG'
				},
				'2': {
					'iterations': 4,
					'dhue': 3.8,
					'zoom': 10,
					'rotation': 60
				}
			},
			'Serpinski Triangle': {
				'0': {
					'angle': 120
				},
				'1': {
					'axiom': 'F-G-G',
					'rules': '{"F":"F-G+F+G-F", "G":"GG"}',
					'constants': 'FG'
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
					'rules': '{"F":"+G-F-G+", "G":"-F+G+F-"}',
					'constants': 'FG'
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
					'rules': '{"X": "X+YF+", "Y": "-FX-Y"}',
					'constants': 'F'
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
					'rules': '{"L": "+RF-LFL-FR+", "R": "-LF+RFR+FL-"}',
					'constants': 'F'
				},
				'2': {
					'iterations': 4,
					'dhue': 35,
					'zoom': 35,
					'rotation': 90
				}
			},
			'Tree': {
				'0': {
					'angle': 25
				},
				'1': {
					'axiom': 'X',
					'rules': '{"X": "F-[[X]+X]+F[+FX]-X", "F": "FF"}',
					'constants': 'F'
				},
				'2': {
					'iterations': 6,
					'dhue': 1.3,
					'zoom': 4.4,
					'rotation': 180
				}
			},
			'thing?': {
				'0': {
					'angle': 36
				},
				'1': {
					'axiom': '[7]++[7]++[7]++[7]++[7]',
					'rules': '{"6": "81++91----71[-81----61]++", "7": "+81--91[---61--71]+", "8": "-61++71[+++81++91]-", "9": "--81++++61[+91++++71]--71", "1": ""}',
					'constants': '6789'
				},
				'2': {
					'iterations': 5,
					'dhue': 1.3,
					'zoom': 38,
					'rotation': 0
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