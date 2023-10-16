export interface Tempo {
  positionSeconds: number
  positionBeats: number
  secondsPerBeat: number
  next: Tempo | null
}

export interface Note {
  id: number
  noteNumber: number
  positionBeats: number
  positionSeconds: number
  durationBeats: number
  durationSeconds: number
  velocity: number
  tempo: Tempo
}

export interface Key {
  color: string
  name: string
  number: number
}
