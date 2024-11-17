<template>
  <div class="note-actions">

    <button @click.stop="emitDelete">
      <img src="../assets/img/eliminar.png" alt="eliminar" height="20" width="20" />
    </button>

    <button @click.stop="emitClone">
      <img src="../assets/img/clonar.png" alt="eliminar" height="20" width="20" />
    </button>

    <button @click.stop="emitSelect">
      <img src="../assets/img/seleccione.png" alt="eliminar" height="20" width="20" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  note: Object,  
});

const emit = defineEmits(['deleteNote', 'cloneNote', 'selectNote']);

const emitDelete = () => emit('deleteNote', props.note.id);
const emitClone = () => emit('cloneNote', props.note.id); 
const emitSelect = () => emit('selectNote', props.note.id);
</script>

<style scoped>
.note-actions button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 5px;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.note-actions button:hover {
  background-color: #f0f0f0;
}

.note-actions i {
  margin-right: 5px;
}
img{
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px 20px ;
}
</style>
