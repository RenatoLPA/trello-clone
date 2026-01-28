import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, Paper, Typography, AppBar, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "./components/Navbar/index.jsx";

const novosItems = [
  { id: "111", content: "[97] Avanços no Agent de IA da BisaWeb - Parte 3" },
  { id: "222", content: "[91] Melhorias na Rotina de importação para o Filiadosweb" },
  { id: "333", content: "[.UX] [Eleições] Bisavoto: Ajustar o layout das páginas de retorno" },
];

const atribuidosItems = [
  { id: "at1", content: "[UX] Criar Trello da Bisa"},
  { id: "at2", content: "[99] Melhorar configurações de instalação do n8n"}
]

const testeItems = [
  {id: "t1", content: "[91] [Eleições] Melhorias na importação de eleitores"},
  {id: "t2", content: "[99] Boletos não são gerado para Aposentados e Pensionistas"}
]

const retornoItems = [
  {id: "r1", content: "[UX] Ajustar a Formatação da caixa de mensagem do Bisavoto"},
  {id: "r2", content: "[99] Verificar se precisar mudar algo no disparo dos e-mails BISAVOTO e demais"},
  {id: "r3", content: "[99] Acrescentar os campos CÓDIGO DO SINDICATO E VALIDADE DA CARTEIRA na configuração da carteira DE DEPENDENTES"}
]

const impedimentoItems = [
  {id: "i1", content: "[UnP] ﻿Mudar o lugar destino do backup diário dos sistemas para servidor de TESTES"},
  {id: "i2", content: "[93] [Eleições] Implementar reenvio de senha/token pelo WhatsApp - BISAVOTO"}
]

const aprovadosItems = [
  {id: "ap1", content: "[99] [ERRO] no Relatório de Filiação e Recadastramento Online"}
]

const inicialColumns = [
  { name: "Novos", id: "123", items: novosItems},
  { name: "Atribuidos", id: "456", items: atribuidosItems},
  { name: "Retornos", id: "789", items: retornoItems},
  { name: "Impedimentos", id: "1011", items: impedimentoItems},
  { name: "Testes", id: "1213", items: testeItems},
  { name: "Aprovados", id: "1415", items: aprovadosItems}
];

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  // Use esta versão simplificada e segura do onDragEnd para evitar erros de leitura
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newColumns = [...columns];
    const sourceCol = newColumns.find(c => c.id === source.droppableId);
    const destCol = newColumns.find(c => c.id === destination.droppableId);

    const sourceItems = [...sourceCol.items];
    const [draggedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, draggedItem);
      sourceCol.items = sourceItems;
    } else {
      const destItems = [...destCol.items];
      destItems.splice(destination.index, 0, draggedItem);
      sourceCol.items = sourceItems;
      destCol.items = destItems;
    }
    setColumns(newColumns);
  };

  return (
    <Box sx={{ 
      backgroundImage: "linear-gradient(45deg, #8587f3 30%, #fd84ae 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <Navbar />
    
      <Box sx={{ 
        display: "flex", 
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexGrow: 8,
        p: 5,
        overflowX: "auto",
        gap: 5
      }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Box key={column.id} sx={{ display: "flex", flexDirection: "column", minWidth: 320 }}>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ 
                      backgroundColor: snapshot.isDraggingOver ? "#d1d1e0" : "#ebebf1", 
                      width: "100%",
                      minHeight: 200, 
                      p: 2, 
                      borderRadius: 2,
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {column.name}
                    </Typography>

                    {column.items.map((item, index) => (
                      <Draggable draggableId={item.id} index={index} key={item.id}>
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            sx={{
                              p: 2,
                              mb: 2,
                              backgroundColor: "white",
                              minHeight: 50,
                              display: "flex",
                              alignItems: "center",
                              ...provided.draggableProps.style // Crucial para a animação
                            }}
                          >
                            {item.content}
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    <Button 
                      sx={{ mt: 1, color: "#959dab", justifyContent: "flex-start" }} 
                      fullWidth
                      startIcon={<AddIcon />}
                    >
                      CARD
                    </Button>
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