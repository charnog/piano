<template>
  <div
    :class="{
      [$style.note]: true
    }"
    :style="{
      bottom: `${note.positionSeconds * PX_PER_SECOND}px`,
      height: `${note.durationSeconds * PX_PER_SECOND}px`,
      width: `${width}px`,
      transform: `translateX(${translate}px)`
    }"
  ></div>
</template>

<script setup lang="ts">
import type { Note } from '@/components/types'
import { computed } from 'vue'
import { FIRST_NOTE_NUMBER, PX_PER_SECOND } from '@/settings'

interface Props {
  note: Note
}

const props = defineProps<Props>()
const octaveWidth = 420
const offset = [0, 45, 75, 105, 135, 181, 225, 255, 285, 315, 345, 375]
const widths = [45, 30, 30, 30, 45, 44, 30, 30, 30, 30, 30, 45]

const zeroed = props.note.noteNumber - FIRST_NOTE_NUMBER

const width = computed(() => widths[zeroed % 12])

const translate = computed(() => {
  const octave = Math.floor(zeroed / 12)
  const note = zeroed % 12

  return 31 + octaveWidth * octave + offset[note]
})
</script>

<style module>
.note {
  position: absolute;
  bottom: 0;
  width: 10px;
  background: linear-gradient(to top, rgb(24, 92, 224) 0%, rgba(19, 60, 147, 0) 100%);
  border-radius: 10px;
}
</style>
