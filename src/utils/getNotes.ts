import * as midiManager from 'midi-file'
import { getTempo } from '@/utils/getTempo'
import type { Note } from '@/components/types'

export function getNotes(parsed: midiManager.MidiData, trackNumber: number) {
  const ticksPerBeat = parsed.header.ticksPerBeat ?? 96

  let tempo = getTempo(parsed.tracks[1], ticksPerBeat)
  const track = parsed.tracks[trackNumber]

  let id = 0
  let playheadBeats = 0
  let playheadSeconds = 0

  const map = new Map<number, Note>()
  const notes: Note[] = []

  track.forEach((e) => {
    if (e.type !== 'noteOn' && e.type !== 'noteOff') return

    while (tempo?.next && tempo.next.positionBeats <= playheadBeats) tempo = tempo.next
    if (!tempo) throw new Error('No tempo found')

    const beats = e.deltaTime / ticksPerBeat

    playheadBeats += beats
    playheadSeconds += beats * tempo.secondsPerBeat

    if (e.type === 'noteOn') {
      const note: Note = {
        id: id++,

        noteNumber: e.noteNumber,

        positionBeats: playheadBeats,
        positionSeconds: playheadSeconds,

        durationBeats: 0,
        durationSeconds: 0,

        velocity: e.velocity,

        tempo: tempo
      }

      map.set(e.noteNumber, note)
    }

    if (e.type === 'noteOff') {
      const note = map.get(e.noteNumber)
      if (note) {
        note.durationBeats = playheadBeats - note.positionBeats
        note.durationSeconds = note.durationBeats * note.tempo.secondsPerBeat

        notes.push(note)

        map.delete(e.noteNumber)
      }
    }
  })

  return notes.sort((a, b) => a.positionBeats - b.positionBeats)
}
