import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setrepositories(response.data);
    })
  },[]);

  const [repositories, setrepositories] = useState([]);

  async function handleAddRepository() {

    const newRepository = await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      owner: "Raphael Farnezi"
    });

    if (newRepository.status === 200)
      setrepositories([...repositories, newRepository.data]);

  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);

    if(response.status !== 204)
      return;

    const projectIndexToDelete = repositories.findIndex(project => project.id === id);
    
    repositories.splice(projectIndexToDelete, 1);

    setrepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project => (
          
            <li key={project.id}>
              {project.title}
              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
              </button>
            </li>
        ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
