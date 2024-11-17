<template>
  <div class="notes-list">
    <Nota
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteNote="handleDelete"
      @cloneNote="handleClone"
      @selectNote="handleSelect"
    />
  </div>
</template>

<script setup>
import { useNotes } from '../composables/useNotes';

const { notes, deleteNote, duplicateNote } = useNotes();

const handleDelete = (id) => {
  deleteNote(id); 
};

const handleClone = (id) => {
  duplicateNote(id); 
};

const handleSelect = (id) => {
  const note = notes.value.find((n) => n.id === id);
  if (note) note.selected = !note.selected; 
};
</script>


<style scoped>
.notes-list {
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px;
  justify-content: flex-start; 
}

.note {
  width: 200px; 
  margin: 10px 0; 
  padding: 15px;
}

</style>
