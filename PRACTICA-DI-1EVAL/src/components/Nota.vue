<template>
    <div class="note" :class="{ selected: note.selected }">
      <div class="note-header">
        <h3 v-if="!note.isEditing">{{ note.title }}</h3>
        <input
          v-if="note.isEditing"
          v-model="note.editTitle"
          placeholder="Nuevo título"
          @keydown.enter.stop="toggleEdit"
          class="input-title"
        />
  
        <NoteOperations
          :note="note"
          @deleteNote="() => emitEvent('deleteNote')"
          @cloneNote="() => emitEvent('cloneNote')"
          @selectNote="() => emitEvent('selectNote')"
        />
      </div>
  
      <div class="note-info">
        <p><strong>ID:</strong> {{ note.id }}</p>
        <p v-if="!note.isEditing"><strong>Título:</strong> {{ note.title }}</p>
        <p v-if="!note.isEditing"><strong>Descripción:</strong> {{ note.description }}</p>
        <textarea
          v-if="note.isEditing"
          v-model="note.editDescription"
          placeholder="Nueva descripción"
          class="textarea-description"
        ></textarea>
      </div>
  
  
      <button @click.stop="toggleEdit">
        {{ note.isEditing ? "Guardar" : "Editar" }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  import NoteOperations from "./NoteOperations.vue";
  
  const props = defineProps({
    note: Object,
  });
  
  const emit = defineEmits(["deleteNote", "cloneNote", "selectNote", "editNote"]);
  
  const emitEvent = (event) => {
    emit(event, props.note.id);
  };
  
  
  const toggleEdit = () => {
    if (props.note.isEditing) {
      props.note.title = props.note.editTitle || props.note.title;
      props.note.description = props.note.editDescription || props.note.description;
      emit("editNote", props.note);
    } else {
      props.note.editTitle = props.note.title;
      props.note.editDescription = props.note.description;
    }
    props.note.isEditing = !props.note.isEditing;
  };
  </script>
  
  <style scoped>
  
  .note {
    background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
    color: #ecf0f1;
    border: 1px solid #34495e;
    border-radius: 12px;
    padding: 15px;
    width: 220px;
    text-align: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  /* Estilos cuando una nota está seleccionada */
  .note.selected {
    background: linear-gradient(135deg, #275e99, #000789);
    color: white;
    box-shadow: 0 0 20px #647998;
  }
  
  /* Efecto hover para la nota */
  .note:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(130, 8, 8, 0.3);
  }
  
  /* Estilo del encabezado de la nota */
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* Estilo del área de información de la nota */
  .note-info {
    margin-top: 10px;
    text-align: left;
    word-break: break-word;
  }
  
  /* Estilo de los botones dentro de la nota */
  button {
    background-image: linear-gradient(to right, #13608a 0%, #4a69be 51%, #006aa2 100%);
    padding: 8px 15px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 100% auto;
    color: white;
    box-shadow: 0 0 20px #486da3;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
  
  /* Estilo para el cuadro de texto del título */
  .input-title {
    width: 100%;
    padding: 8px;
    border: 2px solid #3498db;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 8px;
  }
  
  /* Estilo para el cuadro de texto de la descripción */
  .textarea-description {
    width: 100%;
    height: auto;
    padding: 8px;
    border: 2px solid #3498db;
    border-radius: 5px;
    font-size: 14px;
    resize: none;
    background-color: #f8f9fa;
    color: #2c3e50;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  
  .textarea-description:focus {
    outline: none;
    border-color: #2980b9;
    box-shadow: 0 0 5px rgba(41, 128, 185, 0.5);
  }
  </style>
  