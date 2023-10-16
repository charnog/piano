<template>
  <div :class="$style.container" ref="containerRef">
    <div :class="$style.transformer" ref="transformerRef">
      <NoteList :notes="notes" />
      <Keys />
    </div>
  </div>

  <audio :class="$style.audio" src="/album.ogg" controls ref="audioRef"></audio>
</template>

<script setup lang="ts">
import NoteList from '@/components/NoteList.vue'
import Keys from '@/components/Keys.vue'
import * as midiManager from 'midi-file'
import type { Note } from '@/components/types'
import { markRaw, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { KEY_ACTIVE_STATE, KEY_INACTIVE_STATE, SCROLL_DURATION } from '@/settings'
import { getNotes } from '@/utils/getNotes'

const audioRef = ref<HTMLAudioElement | null>(null)

const notes = ref<Note[]>([])

const globalTl = markRaw(gsap.timeline({ paused: true, sortChildren: false }))

fetch('./album.mid')
  .then((bin) => bin.arrayBuffer())
  .then((buffer) => {
    const array = new Uint8Array(buffer)
    const parsed = midiManager.parseMidi(array)

    notes.value = getNotes(parsed, 2)

    setTimeout(() => {
      const container = document.querySelector('#notes')!

      const scrollTl = gsap.timeline()
      scrollTl
        .set(
          container,
          {
            scrollTop: 100000000,
            immediateRender: true
          },
          0
        )
        .to(container, {
          duration: SCROLL_DURATION,
          scrollTop: 0,
          ease: 'none'
        })

      const keysTl = gsap.timeline()
      notes.value.forEach((note) => {
        const keySelector = `#key_${note.noteNumber}`

        keysTl
          .set(keySelector, KEY_ACTIVE_STATE, note.positionSeconds)
          .set(keySelector, KEY_INACTIVE_STATE, note.positionSeconds + note.durationSeconds - 0.02)
      })

      globalTl.add(scrollTl, 0)
      globalTl.add(keysTl, 0)

      audioRef.value?.addEventListener('timeupdate', () => {
        const time = audioRef.value?.currentTime ?? 0
        globalTl.time(time)
      })

      audioRef.value?.addEventListener('play', () => {
        globalTl.play()
      })

      audioRef.value?.addEventListener('playing', () => {
        globalTl.play()
      })

      audioRef.value?.addEventListener('waiting', () => {
        globalTl.pause()
      })

      audioRef.value?.addEventListener('pause', () => {
        globalTl.pause()
      })
    })
  })

const transformerRef = ref<HTMLDivElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

let timeoutId: number | undefined
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      const { width } = entries[0].contentRect

      // TRADEOFF: The width of the container is a magic number.
      const scale = width / 2582

      transformerRef.value!.style.transform = `scale(${scale})`
      containerRef.value!.style.height = transformerRef.value?.getBoundingClientRect().height + 'px'
    }, 250)
  })

  resizeObserver.observe(document.body)
})
</script>

<style module>
.container {
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  border-top: 2px solid #160801;
}

.transformer {
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
}

.audio {
  width: 100%;
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>
