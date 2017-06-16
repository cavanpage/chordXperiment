import { Component } from '@angular/core';
import tonal from 'tonal'
import tone from 'tone'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(){
    this.selectedChordType = "M"
    this.synth = new tone.PolySynth(3, tone.Synth).toMaster();
  }

  title = '';
  header = "";
  
  RootNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];//wait for tonal v1.0.0 for new method to return this array tonal.names()
  ChordTypes = tonal.chord.names();

  chordProgression: Chord[] = [];
  
  chordNotesOctave: string[]; //all notes w/ specified octave
  selectedChordType: string;
  octave: number = 3;
 
  synth: tone;
  
  addToChordProgression(note){
    var chord = new Chord(note, this.selectedChordType, 4 );
    this.chordProgression.push(chord);    
  }

  playChord(note){
    var octave =  this.octave;
    var chordNotes = tonal.chord(note+this.selectedChordType);
    this.chordNotesOctave = [];

    //simplify each note (ex. F## -> G ) 
    for(var i =0; i< chordNotes.length; i++){
        chordNotes[i] = tonal.note.simplify(chordNotes[i])
    }

    //set the octave for each note
    for(var i = 0; i < chordNotes.length; i++){
      if(i > 0 && (this.RootNotes.indexOf(chordNotes[i]) < this.RootNotes.indexOf(chordNotes[i-1]))){
        octave++;
      }
      this.chordNotesOctave[i] = chordNotes[i] + octave
    }

    this.synth.triggerAttack(this.chordNotesOctave);
  }

  stopChord(){
    this.synth.triggerRelease(this.chordNotesOctave);
  }
}

class Chord{
  rootNote: string;
  type: string;
  length: number;

  constructor(rootNote, type, length){
    this.rootNote = rootNote;
    this.type = type;
    this.length
  } 
}

