'use client'

import { useState, useRef, useCallback, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Plane, TransformControls, PerspectiveCamera } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Undo2, Redo2, Trash2, Plus } from 'lucide-react'
import * as THREE from 'three'

const furnitureTypes = [
  { name: 'Chair', width: 0.6, height: 1, depth: 0.6, color: '#8B4513', image: '/placeholder.svg?height=100&width=100' },
  { name: 'Table', width: 1.2, height: 0.8, depth: 0.8, color: '#DEB887', image: '/placeholder.svg?height=100&width=100' },
  { name: 'Sofa', width: 2, height: 0.8, depth: 0.9, color: '#A52A2A', image: '/placeholder.svg?height=100&width=100' },
  { name: 'Bed', width: 2, height: 0.5, depth: 1.8, color: '#F4A460', image: '/placeholder.svg?height=100&width=100' },
]

const Furniture = ({ position, size, color, onSelect, isSelected, onPositionChange }) => {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)

  const handlePositionChange = useCallback((event) => {
    if (event.target.object.position) {
      onPositionChange(event.target.object.position)
    }
  }, [onPositionChange])

  return (
    <group>
      <Box
        ref={mesh}
        position={position}
        args={size}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
      >
        <meshStandardMaterial color={color} />
      </Box>
      {isSelected && (
        <TransformControls object={mesh} mode="translate" onObjectChange={handlePositionChange} />
      )}
    </group>
  )
}

const Room = ({ furniture, onSelectFurniture, selectedFurniture, onUpdateFurniture }) => {
  const handleCanvasClick = (event) => {
    if (event.object.name !== 'dragPlane') {
      onSelectFurniture(null)
    }
  }

  return (
    <group onClick={handleCanvasClick}>
      <Plane 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[10, 10]} 
        receiveShadow
      >
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>

      <Box position={[0, 2.5, -5]} args={[10, 5, 0.1]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      <Box position={[-5, 2.5, 0]} args={[0.1, 5, 10]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>

      {furniture.map((item, index) => (
        <Furniture 
          key={index} 
          {...item} 
          onSelect={() => onSelectFurniture(index)}
          isSelected={selectedFurniture === index}
          onPositionChange={(newPosition) => onUpdateFurniture(index, { position: [newPosition.x, newPosition.y, newPosition.z] })}
        />
      ))}
    </group>
  )
}

const DragPlane = ({ onDrop }) => {
  const { camera, mouse, scene } = useThree()
  const raycaster = new THREE.Raycaster()

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length > 0) {
      const intersect = intersects.find(i => i.object.name === 'dragPlane')
      if (intersect) {
        onDrop(intersect.point)
      }
    }
  })

  return (
    <Plane 
      args={[100, 100]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      visible={false}
      name="dragPlane"
    />
  )
}

const DraggableInput = ({ label, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startValue, setStartValue] = useState(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setStartValue(value)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const diff = e.clientX - startX
      const newValue = Math.max(0, startValue + diff * 0.01)
      onChange(newValue)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Input 
        id={label} 
        type="number" 
        value={value.toFixed(2)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        step="0.1"
      />
    </div>
  )
}

export default function RoomPlanner() {
  const [furniture, setFurniture] = useState([])
  const [selectedFurniture, setSelectedFurniture] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState(null)
  const [history, setHistory] = useState([[]])
  const [historyIndex, setHistoryIndex] = useState(0)

  const handleDrop = useCallback((position) => {
    if (isDragging && selectedType) {
      handleAddFurniture(position)
    }
  }, [isDragging, selectedType])

  const handleAddFurniture = (position = { x: 0, y: 0, z: 0 }) => {
    if (selectedType) {
      const newFurniture = {
        ...selectedType,
        position: [position.x, selectedType.height / 2 + position.y, position.z],
      }
      const newFurnitureList = [...furniture, newFurniture]
      setFurniture(newFurnitureList)
      addToHistory(newFurnitureList)
      setSelectedType(null)
      setIsDragging(false)
      setDragPosition(null)
    }
  }

  const handleSelectFurniture = (index) => {
    setSelectedFurniture(index)
  }

  const handleUpdateFurniture = (index, updates) => {
    const updatedFurniture = furniture.map((item, i) => i === index ? { ...item, ...updates } : item)
    setFurniture(updatedFurniture)
    addToHistory(updatedFurniture)
  }

  const addToHistory = (newState) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setFurniture(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setFurniture(history[historyIndex + 1])
    }
  }

  const clearAll = () => {
    const emptyState = []
    setFurniture(emptyState)
    addToHistory(emptyState)
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex space-x-2">
          {furnitureTypes.map((type) => (
            <Button 
              key={type.name}
              onClick={() => setSelectedType(type)}
              variant={selectedType === type ? "secondary" : "outline"}
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => {
                if (!dragPosition) {
                  handleAddFurniture()
                }
                setIsDragging(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> {type.name}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button onClick={undo} disabled={historyIndex <= 0}><Undo2 className="h-4 w-4" /></Button>
          <Button onClick={redo} disabled={historyIndex >= history.length - 1}><Redo2 className="h-4 w-4" /></Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive"><Trash2 className="h-4 w-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all furniture from your room.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAll}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Room Structure</h2>
          <div className="space-y-2">
            <div className="font-semibold">Floor Room</div>
            <ul className="pl-4">
              {furniture.map((item, index) => (
                <li 
                  key={index} 
                  className={`cursor-pointer ${selectedFurniture === index ? 'text-blue-500' : ''}`}
                  onClick={() => handleSelectFurniture(index)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2">
          <Canvas shadows camera={{ position: [5, 5, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} castShadow />
              <Room 
                furniture={furniture} 
                onSelectFurniture={handleSelectFurniture}
                selectedFurniture={selectedFurniture}
                onUpdateFurniture={handleUpdateFurniture}
              />
              <DragPlane onDrop={handleDrop} />
              <OrbitControls makeDefault />
            </Suspense>
          </Canvas>
        </div>
        <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Properties</h2>
          {selectedFurniture !== null && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="color">Color</Label>
                <Input 
                  id="color" 
                  type="color" 
                  value={furniture[selectedFurniture].color}
                  onChange={(e) => handleUpdateFurniture(selectedFurniture, { color: e.target.value })}
                />
              </div>
              <DraggableInput 
                label="Width"
                value={furniture[selectedFurniture].width}
                onChange={(value) => handleUpdateFurniture(selectedFurniture, { width: value, size: [value, furniture[selectedFurniture].height, furniture[selectedFurniture].depth] })}
              />
              <DraggableInput 
                label="Height"
                value={furniture[selectedFurniture].height}
                onChange={(value) => handleUpdateFurniture(selectedFurniture, { height: value, size: [furniture[selectedFurniture].width, value, furniture[selectedFurniture].depth] })}
              />
              <DraggableInput 
                label="Depth"
                value={furniture[selectedFurniture].depth}
                onChange={(value) => handleUpdateFurniture(selectedFurniture, { depth: value, size: [furniture[selectedFurniture].width, furniture[selectedFurniture].height, value] })}
              />
              <DraggableInput 
                label="Position X"
                value={furniture[selectedFurniture].position[0]}
                onChange={(value) => handleUpdateFurniture(selectedFurniture, { position: [value, furniture[selectedFurniture].position[1], furniture[selectedFurniture].position[2]] })}
              />
              <DraggableInput 
                label="Position Y"
                value={furniture[selectedFurniture].position[1]}
                onChange={(value) => handleUpdateFurniture(selectedFurniture, { position: [furniture[selectedFurniture].position[0], value, furniture[selectedFurniture].position[2]] })}
              />
              <DraggableInput 
                label="Position Z"
                value={furniture[selectedFurniture].position[2]}
                onChange={(value) => handleUpdateFurniture(selectedFurniture, { position: [furniture[selectedFurniture].position[0], furniture[selectedFurniture].position[1], value] })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}