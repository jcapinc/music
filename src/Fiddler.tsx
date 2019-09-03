import React, { ChangeEvent, useState } from 'react';
import { Synth, AMSynth, FMSynth, BasicOscillatorType, Encoding, EnvelopeCurve, ADSREnvelopeOptions } from 'tone';
const Fiddler: React.FC<{}> = () => <div>
	<div className="fiddle">
		<SynthControl />
	</div>
	<div className="fiddle">
		<AMSynthControl />
	</div>
	<div className="fiddle">
		<FMSynthControl />
	</div>
</div>;

const oscillatorTypes = {
	"sine":"Sine",
	"sawtooth":"Sawtooth",
	"square": "Square",
	"triangle":"Triangle"
};

const curvetypes = [
	'linear',
	'exponential',
	'sine',
	'cosine',
	'bounce',
	'step' 
];

const SynthControl: React.FC<{}> = () => {
	const [oscillatorType,setOscillatorType] = useState("sine");
	const [note,setNote] = useState("C3");
	const [duration, setDuration] = useState("1");
	const [envelope, setEnvelope] = useState<ADSREnvelopeOptions>({})
	const synth = new Synth({
		oscillator: { type: oscillatorType as BasicOscillatorType || "sine" },
		envelope		
	}).toMaster();
	const exec = () => synth.triggerAttackRelease(note,duration);
	return <div>
		<h1>Synth</h1>
		<h3>Basic</h3>
		<InputElement onenter={exec} label="Note" name="note" value={note} onchange={(e) => setNote(e.target.value)} />
		<InputElement onenter={exec} label="Duration" name="duration" value={duration}  onchange={e => setDuration(e.target.value)} />
		<SelectElement onenter={exec} label="Oscillator Type" onchange={e => setOscillatorType(e.target.value)}>
			{makeOptions(oscillatorTypes)}
		</SelectElement>
		<EnvelopeControl onenter={exec} onchange={env => setEnvelope(env)} />
		<button onClick={exec}>Play Synth</button>
	</div>;
};

const AMSynthControl: React.FC<{}> = () => {
	const [oscillatorType,setOscillatorType] = useState("sine");
	const [modulationType, setModulationType] = useState("sine");
	const [note,setNote] = useState("C3");
	const [duration, setDuration] = useState("1");
	const [envelope, setEnvelope] = useState<ADSREnvelopeOptions>({})
	const [modulationEnvelope, setModulationEnvelope] = useState<ADSREnvelopeOptions>({})
	const [harmonicity, setHarmonicity] = useState("3");
	const [detune, setDetune] = useState("0");
	const synth = new AMSynth({
		harmonicity: parseInt(harmonicity) || 0,
		detune: parseInt(detune) || 0,
		envelope,
		oscillator: {type: oscillatorType as BasicOscillatorType || "sine"},
		modulationEnvelope,
		modulation: {type: modulationType as BasicOscillatorType || "sine"}
	}).toMaster();
	const exec = () => synth.triggerAttackRelease(note,duration);
	return <div>
		<h1>AM Synth</h1>
		<h3>Basic</h3>
		<InputElement onenter={exec} label="Note" name="note" value={note} onchange={(e) => setNote(e.target.value)} />
		<InputElement onenter={exec} label="Duration" name="duration" value={duration}  onchange={e => setDuration(e.target.value)} />
		<SelectElement onenter={exec} label="Oscillator Type" onchange={e => setOscillatorType(e.target.value)}>
			{makeOptions(oscillatorTypes)}
		</SelectElement>
		<InputElement onenter={exec} label="Harmonicity" name="harmonicity" value={harmonicity} onchange={e => setHarmonicity(e.target.value)} />
		<InputElement onenter={exec} label="Detune" name="detune" value={detune} onchange={e => setDetune(e.target.value)} />
		<EnvelopeControl onenter={exec} onchange={env => setEnvelope(env)} />
		<h3>Modulation</h3>
		<SelectElement onenter={exec} label="Modulation Type" onchange={e => setModulationType(e.target.value)}>
			{makeOptions(oscillatorTypes)}
		</SelectElement>
		<EnvelopeControl onenter={exec} onchange={env => setModulationEnvelope(env)} title="Modulation Envelope" />
		<button onClick={exec}>Play Synth</button>
	</div>;
};

const FMSynthControl: React.FC<{}> = () => {
	const [oscillatorType,setOscillatorType] = useState("sine");
	const [modulationType, setModulationType] = useState("sine");
	const [note,setNote] = useState("C3");
	const [duration, setDuration] = useState("1");
	const [envelope, setEnvelope] = useState<ADSREnvelopeOptions>({})
	const [modulationEnvelope, setModulationEnvelope] = useState<ADSREnvelopeOptions>({})
	const [harmonicity, setHarmonicity] = useState("3");
	const [detune, setDetune] = useState("0");
	const [modulationIndex, setModulationIndex] = useState("10");
	const synth = new FMSynth({
		harmonicity: parseInt(harmonicity) || 0,
		detune: parseInt(detune) || 0,
		modulationIndex: parseInt(modulationIndex) || 0,
		envelope,
		oscillator: {type: oscillatorType as BasicOscillatorType || "sine"},
		modulationEnvelope,
		modulation: {type: modulationType as BasicOscillatorType || "sine"}
	}).toMaster();
	const exec = () => synth.triggerAttackRelease(note,duration);
	return <div>
		<h1>FM Synth</h1>
		<h3>Basic</h3>
		<InputElement onenter={exec} label="Note" name="note" value={note} onchange={(e) => setNote(e.target.value)} />
		<InputElement onenter={exec} label="Duration" name="duration" value={duration}  onchange={e => setDuration(e.target.value)} />
		<SelectElement onenter={exec} label="Oscillator Type" onchange={e => setOscillatorType(e.target.value)}>
			{makeOptions(oscillatorTypes)}
		</SelectElement>
		<InputElement onenter={exec} label="Harmonicity" name="harmonicity" value={harmonicity} onchange={e => setHarmonicity(e.target.value)} />
		<InputElement onenter={exec} label="Detune" name="detune" value={detune} onchange={e => setDetune(e.target.value)} />
		<EnvelopeControl onenter={exec} onchange={env => setEnvelope(env)} />
		<h3>Modulation</h3>
		<SelectElement onenter={exec} label="Modulation Type" value={modulationType} onchange={e => setModulationType(e.target.value)}>
			{makeOptions(oscillatorTypes)}
		</SelectElement>
		<InputElement onenter={exec} label="Modulation Index" value={modulationIndex} onchange={e => setModulationIndex(e.target.value)} />
		<EnvelopeControl onenter={exec} onchange={env => setModulationEnvelope(env)} title="Modulation Envelope" />
		<button onClick={exec}>Play Synth</button>
	</div>;
};

interface EnvelopeControlProps {
	onenter: () => void;
	onchange: (envelope: ADSREnvelopeOptions) => void;
	title?: string;
}

const EnvelopeControl: React.FC<EnvelopeControlProps> = ({onenter, onchange, title = "Envelope"}) => {
	const [attack, setAttack] = useState("0.1");
	const [attackCurve, setAttackCurve] = useState("linear");
	const [decay, setDecay] = useState("0.1");
	const [decayCurve, setDecayCurve] = useState("linear");
	const [release, setRelease] = useState("0.1");
	const [releaseCurve, setReleaseCurve] = useState("linear");
	const [sustain, setSustain] = useState("1");
	const makeOnChange = (method: (value:string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		method(e.target.value);
		onchange({
			attack: parseFloat(attack) || 0,
			attackCurve: attackCurve as EnvelopeCurve,
			decay: decay as Encoding.Time,
			decayCurve: decayCurve as EnvelopeCurve,
			release: release as Encoding.Time,
			releaseCurve: releaseCurve as EnvelopeCurve,
			sustain: parseFloat(sustain) || 0
		})
	};
	return <React.Fragment>
		<h3>{title}</h3>
		<InputElement onenter={onenter} label="Attack" name="attack" value={attack} onchange={makeOnChange(setAttack)} />
		<SelectElement onenter={onenter} label="Attack Curve" value={attackCurve} name="attackCurve" onchange={makeOnChange(setAttackCurve)}>
			{makeOptions(curvetypes.reduce((carry,curve) => {carry[curve] = curve; return carry;}, {} as Record<string, string>))}
		</SelectElement>
		<InputElement onenter={onenter} label="Decay" name="decay" value={decay} onchange={makeOnChange(setDecay)} />
		<SelectElement onenter={onenter} label="Decay Curve" value={decayCurve} name="decayCurve" onchange={makeOnChange(setDecayCurve)}>
			{makeOptions(curvetypes.reduce((carry,curve) => {carry[curve] = curve; return carry;}, {} as Record<string, string>))}
		</SelectElement>
		<InputElement onenter={onenter} label="Release" name="release" value={release} onchange={makeOnChange(setRelease)} />
		<SelectElement onenter={onenter} label="Release Curve" value={releaseCurve} name="decayCurve" onchange={makeOnChange(setReleaseCurve)}>
			{makeOptions(curvetypes.reduce((carry,curve) => {carry[curve] = curve; return carry;}, {} as Record<string, string>))}
		</SelectElement>
		<InputElement onenter={onenter} label="Sustain" name="sustain" value={sustain} onchange={makeOnChange(setSustain)} />
	</React.Fragment>;
}

interface CommonControlProps{
	label: string;
	name?: string;
	value?: string;
	onenter: () => void;
}

interface InputElementProps extends CommonControlProps {
	onchange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputElement: React.FC<InputElementProps> = ({label, name, onchange, value = "", onenter}) => <Label label={label}>
	<input type="text" name={name} onChange={onchange} value={value} {...enterPress(onenter)} />
</Label>;

interface SelectElementProps extends CommonControlProps {
	onchange: (event: ChangeEvent<HTMLSelectElement>) => void;
	selectprops?: React.SelectHTMLAttributes<HTMLSelectElement>;
}
const SelectElement: React.FC<SelectElementProps> = ({label, onchange, selectprops = {}, children, onenter, value}) => 
<Label label={label}>
	<select value={value} onChange={onchange} 
		{...selectprops} {...enterPress(onenter)}>{children}</select>
</Label>;

const Label: React.FC<{label: string}> = ({label,children}) => <div>
	{children} : {label}
</div>;

const makeOptions = (options: Record<string,string>) => {
	return Object.keys(options).map((key,i) => 
		<option key={i} value={key}>{options[key]}</option>);
}

const enterPress = (cb: () => void) => ({
	onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => {
		e.keyCode === 13 ? cb() : console.log(e.keyCode);
	}
})

export default Fiddler;