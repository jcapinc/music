import React, { ChangeEvent, useState } from 'react';
import { Synth, BasicOscillatorType, Encoding, Time } from 'tone';
const Fiddler: React.FC<{}> = () => <div>
	<SynthControl />
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
	'ripple',
	'step' 
];

const SynthControl: React.FC<{}> = () => {
	const [oscillatorType,setOscillatorType] = useState<BasicOscillatorType>("sine");
	const [note,setNote] = useState<Encoding.Frequency>("C3");
	const [duration, setDuration] = useState<Encoding.Time>(1);
	const [attack, setAttack] = useState("0.1");
	
	const synth = new Synth({
		oscillator: {
			type: oscillatorType
		},
		envelope: {
			attack: parseFloat(attack) || 0,
			attackCurve: 
		}
	}).toMaster();
	const exec = () => synth.triggerAttackRelease(note,duration);
	return <div>
		<h1>Synth</h1>
		<h3>Basic</h3>
		<InputElement onenter={exec} label="Note" name="note" value={note.toString()} onchange={(e) => setNote(e.target.value as Encoding.Frequency)} />
		<InputElement onenter={exec} label="Duration" name="duration" value={duration.toString()}  onchange={e => setDuration(e.target.value as Encoding.Time)} />
		<SelectElement onenter={exec} label="Oscillator Type" onchange={e => setOscillatorType(e.target.value as BasicOscillatorType)}>
			{makeOptions(oscillatorTypes)}
		</SelectElement>
		<h3>Envelope</h3>
		<InputElement onenter={exec} label="Attack" name="attack" value={attack.toString()} onchange={e => setAttack(e.target.value)} />
		<button onClick={exec}>Play Synth</button>
	</div>;
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
	<select value={value} onChange={onchange} style={{width:"173px"}} 
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