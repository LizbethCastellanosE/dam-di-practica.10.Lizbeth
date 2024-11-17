<template>
  <div class="debug-console">
    <h3>Consola de depuración</h3>
    <pre v-if="logs.length > 0">{{ formattedLogs }}</pre>
    <p v-else>No hay mensajes de depuración disponibles.</p>
  </div>
</template>

  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    logs: {
      type: Array,
      default: () => [],
    },
  });
  

  const formattedLogs = computed(() => props.logs.join('\n'));
</script>
  
  
  <style scoped>
  .debug-console {
    background-image: linear-gradient( 111.4deg,  rgb(0, 0, 45) 6.5%, rgba(27,24,113,1) 93.2% );    color: #f5f5f5; /* Texto en blanco suave */
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    font-family: 'Courier New', Courier, monospace; 
    overflow-y:auto;
    max-height: 300px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); 
    border: 1px solid #444; 
  }
  
  .debug-console h3 {
    margin-top: 0;
    font-size: 1.2em;
    font-weight: bold;
    color: #11cdd0; 
  }
  
  .debug-console pre {
    white-space: pre-wrap; 
    word-wrap: break-word;  
    font-size: 0.9em; 
    line-height: 1.5; 
    
  }
  
  .debug-console webkit-scrollbar {
    border: #11cdd0;
    background-color: #444;
  }
  
  </style>
  