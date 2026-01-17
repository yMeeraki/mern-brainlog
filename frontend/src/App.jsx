import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteUpdatePage from "./pages/NoteUpdatePage"

function App() {
  return (
    
      <div class="relative h-full w-full bg-slate-950">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<NoteUpdatePage />} />
      </Routes>
      </div>
   
  )
}

export default App
