import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const inicialItems = [
  { id: "1", content: "Conteúdo 1" },
  { id: "2", content: "Conteúdo 2" },
  { id: "3", content: "Conteúdo 3" },
];

const inicialColumns = [
  { name: "Atribuidos", id: "123", items: inicialItems },
  { name: "Testes", id: "456", items: [] },
  { name: "Aprovados", id: "789", items: [] },
];

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff31' }}>
        <Toolbar>
          <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
            <Box 
              component="img" 
              src='/assets/img/logoBisa.jpg' 
              sx={{ width: '120px' }} 
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // Se o usuário soltar fora de qualquer coluna, não faz nada
    if (!destination) return;
  
    // Se soltar no mesmo lugar (mesma coluna e mesma posição), não faz nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const newColumns = [...columns];
    
    // Encontra as colunas de origem e destino
    const sourceCol = newColumns.find(col => col.id === source.droppableId);
    const destCol = newColumns.find(col => col.id === destination.droppableId);
  
    // Remove o item da coluna de origem
    const sourceItems = [...sourceCol.items];
    const [draggedItem] = sourceItems.splice(source.index, 1);
    sourceCol.items = sourceItems;
  
    if (source.droppableId === destination.droppableId) {
      // Se for na mesma coluna, apenas insere na nova posição
      sourceItems.splice(destination.index, 0, draggedItem);
    } else {
      // Se for coluna diferente, insere na coluna de destino
      const destItems = [...destCol.items];
      destItems.splice(destination.index, 0, draggedItem);
      destCol.items = destItems;
    }
  
    setColumns(newColumns);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: "linear-gradient(45deg, #8587f3 30%, #fd84ae 100%)" }}>
      {/* 2. Chamamos a Navbar aqui dentro! */}
      <Navbar />

      <Box display="flex" justifyContent="center" sx={{ pt: 5 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Box key={column.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ backgroundColor: "#ebebf1", width: 250, minHeight: 500, p: 2, m: 2, borderRadius: 2 }}
                  >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                      {column.name}
                    </Typography>
                    <Box ref={provided.innerRef} width="100%" height="100%">
                    {column.items.map((item, index) => (
                      <Draggable draggableId={item.id} index={index} key={item.id}>
                        {(provided) => (
                          <Paper
                            elevation={2}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            sx={{
                              p: 1.5,
                              mb: 1.5,
                              backgroundColor: "white",
                              ...provided.draggableProps.style
                            }}
                          >
                            {item.content}
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </DragDropContext>
      </Box>
    </Box>
  );
}

export default App;