<template>
  <div :class="$style.container" id="notes">
    <div :class="$style.notes" :style="{ height: height }">
      <NoteItem v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/components/types'
import NoteItem from '@/components/NoteItem.vue'
import { computed } from 'vue'
import { PX_PER_SECOND, ALMUB_DURATION } from '@/settings'

const height = computed(() => `${ALMUB_DURATION * PX_PER_SECOND}px`)

interface Props {
  notes: Note[]
}

defineProps<Props>()
</script>

<style module>
.container {
  height: 90vh;
  overflow: hidden;
  width: 2582px;
  transform: translate3d(0, 0, 0);
  background-color: var(--color-background-soft);
}

.notes {
  position: relative;
}
</style>
