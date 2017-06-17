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
    this.SelectedChordType = "M"
    this.Synth = new tone.PolySynth(3, tone.Synth).toMaster();
    this.RootNotes = [];

    for(var i = 0; i < this.rootnotes.length; i++){
      this.RootNotes.push(new Note(this.rootnotes[i]))
    }
  }

  title = 'chordXperiment';
  header = "find the perfect chord progression";

  RootNotes: Note[];
  rootnotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];//wait for tonal v1.0.0 for new method to return this array tonal.names()
  SelectedNote;

  ChordTypes = tonal.chord.names();

  chordProgression: Chord[] = [];
  
  ChordNotesOctave: string[]; //all notes w/ specified octave
  SelectedChordType: string;
  Octave: number = 3;
  Synth: tone;
  
  addToChordProgression(note){
    var chord = new Chord(note, this.SelectedChordType, 4 );
    this.chordProgression.push(chord);    
  }

  playChord(note){
    this.SelectedNote = note.name;
    note.class = "highlight"

    for(var i = 0; i < this.RootNotes.length; i++){
      if(note !== this.RootNotes[i]) this.RootNotes[i].class = ""
    }

    var octave =  this.Octave;
    var chordNotes = tonal.chord(note.name+this.SelectedChordType);
    this.ChordNotesOctave = [];

    //simplify each note (ex. F## -> G ) 
    for(var i =0; i< chordNotes.length; i++){
        chordNotes[i] = tonal.note.simplify(chordNotes[i])
    }

    //set the octave for each note
    for(var i = 0; i < chordNotes.length; i++){
      if(i > 0 && (this.RootNotes.indexOf(chordNotes[i]) < this.RootNotes.indexOf(chordNotes[i-1]))){
        octave++;
      }
      this.ChordNotesOctave[i] = chordNotes[i] + octave
    }

    this.Synth.triggerAttack(this.ChordNotesOctave);
  }

  stopChord(note){
    this.Synth.triggerRelease(this.ChordNotesOctave);
  }
}


class Note{
  constructor(name){
    this.name = name;
  }

  name: string;
  class: string;
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

