<template>
  <ul style="transform: translate3d(0, 0, 0)">
    <li :id="`key_${OFFSET - 1}`" style="display: none"></li>
    <template v-for="key in keys" :key="key.number">
      <li :class="`${key.color} ${key.name}`" :id="`key_${key.number}`"></li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Key } from '@/components/types'

const OFFSET = 24

const template = [
  {
    color: 'white',
    name: 'c'
  },
  {
    color: 'black',
    name: 'cs'
  },
  {
    color: 'white',
    name: 'd'
  },
  {
    color: 'black',
    name: 'ds'
  },
  {
    color: 'white',
    name: 'e'
  },
  {
    color: 'white',
    name: 'f'
  },
  {
    color: 'black',
    name: 'fs'
  },
  {
    color: 'white',
    name: 'g'
  },
  {
    color: 'black',
    name: 'gs'
  },
  {
    color: 'white',
    name: 'a'
  },
  {
    color: 'black',
    name: 'as'
  },
  {
    color: 'white',
    name: 'b'
  }
]

const keys = ref<Key[]>([])

for (let i = 0; i < 72; i++) {
  keys.value.push({
    ...template[i % 12],
    number: i + OFFSET
  })
}
</script>

<style scoped>
ul {
  height: 16em;
  width: max-content;
  margin: 0 auto;
  padding: 0 2em 2em;
  position: relative;
  border: 1px solid #160801;
  border-radius: 1em;
  background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(/wood.jpg);
  box-shadow:
    0 0 50px rgba(0, 0, 0, 0.5) inset,
    0 1px rgba(212, 152, 125, 0.2) inset,
    0 5px 15px rgba(0, 0, 0, 0.5);
}

li {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  float: left;
}

ul .white {
  height: 14em;
  width: 4em;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow:
    -1px 0 0 rgba(255, 255, 255, 0.8) inset,
    0 0 5px #ccc inset,
    0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #eee 0%, #fff 100%);
}

ul .white.active {
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;

  box-shadow:
    2px 0 3px rgba(0, 0, 0, 0.2) inset,
    -5px 5px 20px rgba(0, 0, 0, 0.3) inset,
    0 0 3px rgba(0, 0, 0, 0.3);
  /*background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);*/
  background: linear-gradient(to bottom, rgb(0, 106, 255) 0%, rgb(70, 142, 243) 100%);
}

.black {
  height: 8em;
  width: 2em;
  margin: 0 0 0 -1em;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow:
    -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset,
    0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #222 0%, #555 100%);
}

.black.active {
  box-shadow:
    -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset,
    0 1px 2px rgba(0, 0, 0, 0.5);
  /*background: linear-gradient(to right, #444 0%, #222 100%);*/
  background: linear-gradient(180deg, rgb(0, 106, 255) 0%, rgb(71, 147, 253) 100%);
}

.a,
.g,
.e,
.d,
.b {
  margin: 0 0 0 -1em;
}

ul li:first-child {
  border-radius: 5px 0 5px 5px;
}

ul li:last-child {
  border-radius: 0 5px 5px 5px;
}
</style>
