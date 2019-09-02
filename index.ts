import tone, { FMSynthOptions, SynthOptions, PolySynth, Synth, FMSynth, BasicOscillatorType } from 'tone';
console.log("Hello World from your main file!");

const synths: tone.Instrument[] = [];
const FMconfig: FMSynthOptions = {
	harmonicity: 3,
	detune: 0,
	oscillator: {
		type: "triangle",
		harmonicity: 1,
		modulationIndex: 10
	},
	envelope: {
		attack: 0.2,
		attackCurve: "exponential",
		decay: 2,
		sustain: 0.7,
		release: 2
	},
	modulation: {
		type: "square"
	},
	modulationEnvelope: {
		attack: 0.1,
		sustain: 1,
		decay: 2,
		release: 0.5
	}
};

let synth = makeSynth()

const config: SynthOptions = {
	oscillator: {
		type: "sawtooth",
		harmonicity: 1,
		modulationType: "square",
		modulationIndex: 1
	},
	envelope: {

	}
};

function makeSynth(){
	return new Synth(config).toMaster();
}

const titleElement = "h5";
const oscTitle = document.createElement(titleElement);
oscTitle.innerHTML = "Oscillator Controls";

const envelopeTitle = document.createElement(titleElement);
envelopeTitle.innerHTML = "Envelope Controls";

[
	makeTextInput("Note", (e) => note = (e.target as HTMLInputElement).value),
	oscTitle,
	makeTextInput("Harmonicity", (e) => {
		config.oscillator.harmonicity = parseInt((e.target as HTMLInputElement).value);
		synth = makeSynth();
	}),
	makeDropdown("Synthesizer Type",{
		"":"-Synthesizer Type-=",
		"sawtooth": "Sawtooth",
		"sine": "Sine",
		"square": "Square",
		"triangle": "Triangle"
	},(e) => {
		const value = (e.target as HTMLSelectElement).value;
		if(value as tone.BasicOscillatorType){
			config.oscillator.type = value as tone.BasicOscillatorType;
		}
		synth = makeSynth();
	}),
	makeTextInput("ModulationIndex",(e) => {
		config.oscillator.modulationIndex = parseInt((e.target as HTMLInputElement).value);
		synth = makeSynth();
		console.log("");
	}),
	envelopeTitle,
	makeButton()
].map(element => document.body.append(element));


let note = "C3";
function play(){
	synth.triggerAttackRelease(note, 1);
}

function makeButton(){
	const button = document.createElement("button");
	button.innerHTML = "Run";
	button.onclick = play;
	return button;
}

function makeTextInput(label: string, onchange: (event: Event) => void){
	const input = document.createElement("input");
	input.type = "text";
	input.onchange = onchange;
	input.placeholder = label;
	return makeLabeledControl(label, input);
}

function makeDropdown(label: string, 
	options: Record<string, string>, 
	onchange: (event: Event) => void, 
	hook?: (element: HTMLSelectElement) => void) {
	const select = document.createElement("select");
	select.onchange = onchange;
	select.style.width = '173px';
	Object.keys(options).map(key => {
		const opt = document.createElement("option");
		select.append(opt);
		opt.innerHTML = options[key];
		opt.value = key;
	});
	if(hook) hook(select);
	return makeLabeledControl(label, select);
}

function makeLabeledControl(label: string, element: HTMLElement){
	const container = document.createElement("div");
	const labelElement = document.createElement("label");
	labelElement.innerHTML = label;
	container.append(element);
	container.append(labelElement);
	return container;
}

document.addEventListener("keyup",e => {
	if(e.keyCode === 13){
		play();
	}
})

;