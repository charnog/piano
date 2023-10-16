import * as midiManager from 'midi-file'
import type { Tempo } from '@/components/types'

export function getTempo(track: midiManager.MidiEvent[], ticksPerBeat: number): Tempo | null {
  let secondsPerBeat = 0.5
  let playheadSeconds = 0
  let playheadBeats = 0

  let head: Tempo | null = null
  let current: Tempo | null = null

  track.forEach((e) => {
    if (e.type !== 'setTempo') return

    const beats = e.deltaTime / ticksPerBeat
    secondsPerBeat = e.microsecondsPerBeat / 1000000

    playheadBeats += beats
    playheadSeconds += beats * secondsPerBeat

    const t: Tempo = {
      positionBeats: playheadBeats,
      positionSeconds: playheadSeconds,
      secondsPerBeat: secondsPerBeat,
      next: null
    }

    if (!current) {
      head = t
      current = head
    } else {
      if (current.positionSeconds === playheadSeconds) {
        current.positionBeats = t.positionBeats
        current.secondsPerBeat = t.secondsPerBeat
      } else {
        current.next = t
        current = t
      }
    }
  })

  return head
}
