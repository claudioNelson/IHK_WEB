"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
  NodeTypes,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

interface DiagramToolProps {
  onSave: (data: string) => void;
}

// Aktivität (Rechteck mit Titel und Beschreibung)
const ActivityNode = ({ data }: { data: { label: string; description?: string } }) => (
  <div className="bg-white border-2 border-blue-500 rounded-lg shadow-md min-w-[140px] max-w-[200px]">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <div className="px-3 py-1 bg-blue-50 border-b border-blue-300 rounded-t-lg">
      <span className="text-sm font-bold text-blue-800">{data.label}</span>
    </div>
    {data.description && (
      <div className="px-3 py-2">
        <span className="text-xs text-gray-600 whitespace-pre-wrap">{data.description}</span>
      </div>
    )}
  </div>
);

// Aktion (abgerundet mit Titel und Beschreibung)
const ActionNode = ({ data }: { data: { label: string; description?: string } }) => (
  <div className="bg-blue-50 border-2 border-blue-600 rounded-2xl shadow-md min-w-[120px] max-w-[200px]">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <div className="px-3 py-1 border-b border-blue-300">
      <span className="text-sm font-bold text-blue-800">{data.label}</span>
    </div>
    {data.description && (
      <div className="px-3 py-2">
        <span className="text-xs text-gray-600 whitespace-pre-wrap">{data.description}</span>
      </div>
    )}
  </div>
);

// Entscheidung (Raute)
const DecisionNode = ({ data }: { data: { label: string } }) => (
  <div className="relative w-20 h-20">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" style={{ top: -3 }} />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" style={{ bottom: -3 }} />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" style={{ left: -3 }} />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" style={{ right: -3 }} />
    <div
      className="absolute inset-0 bg-white border-2 border-orange-500 shadow-md"
      style={{ transform: "rotate(45deg)", transformOrigin: "center" }}
    />
    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-center px-1">
      {data.label}
    </span>
  </div>
);

// Start (gefüllter Kreis)
const StartNode = () => (
  <div className="w-10 h-10 bg-black rounded-full shadow-md flex items-center justify-center">
    <Handle type="source" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="source" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
  </div>
);

// Ende (doppelter Kreis)
const EndNode = () => (
  <div className="w-12 h-12 bg-white border-4 border-black rounded-full shadow-md flex items-center justify-center">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="target" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="target" position={Position.Right} id="right" className="w-2 h-2" />
    <div className="w-6 h-6 bg-black rounded-full" />
  </div>
);

// Kreis (Start/Ende mit Label)
const CircleNode = ({ data }: { data: { label: string } }) => (
  <div className="w-16 h-16 bg-white border-2 border-green-500 rounded-full shadow-md flex items-center justify-center">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <span className="text-xs font-medium">{data.label}</span>
  </div>
);

// Parallelisierung (Balken)
const ForkNode = () => (
  <div className="w-40 h-2 bg-black rounded">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom-left" className="w-2 h-2" style={{ left: "25%" }} />
    <Handle type="source" position={Position.Bottom} id="bottom-right" className="w-2 h-2" style={{ left: "75%" }} />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
  </div>
);

// Synchronisation (Balken)
const JoinNode = () => (
  <div className="w-40 h-2 bg-black rounded">
    <Handle type="target" position={Position.Top} id="top-left" className="w-2 h-2" style={{ left: "25%" }} />
    <Handle type="target" position={Position.Top} id="top-right" className="w-2 h-2" style={{ left: "75%" }} />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
  </div>
);

// Signal senden
const SendSignalNode = ({ data }: { data: { label: string } }) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <div className="flex items-center">
      <div className="px-3 py-2 bg-yellow-50 border-2 border-yellow-500 shadow-md text-sm font-medium">
        {data.label}
      </div>
      <div className="w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[15px] border-l-yellow-500" />
    </div>
  </div>
);

// Signal empfangen
const ReceiveSignalNode = ({ data }: { data: { label: string } }) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <div className="flex items-center">
      <div className="w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[15px] border-r-purple-500" />
      <div className="px-3 py-2 bg-purple-50 border-2 border-purple-500 shadow-md text-sm font-medium">
        {data.label}
      </div>
    </div>
  </div>
);

// Notiz
const NoteNode = ({ data }: { data: { label: string } }) => (
  <div className="relative">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <div className="px-3 py-2 bg-yellow-100 border border-yellow-400 shadow-md text-sm min-w-[100px] whitespace-pre-wrap">
      <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-200 border-l border-b border-yellow-400" 
           style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
      {data.label}
    </div>
  </div>
);

// Schwimmbahn Header
const SwimlaneNode = ({ data }: { data: { label: string } }) => (
  <div className="px-6 py-3 bg-gray-200 border-2 border-gray-400 rounded-t-lg shadow-md min-w-[200px] text-center">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    <span className="text-sm font-bold text-gray-700">{data.label}</span>
  </div>
);

// Bedingung / Guard
const GuardNode = ({ data }: { data: { label: string } }) => (
  <div className="relative px-2 py-1 bg-gray-100 border border-gray-400 rounded text-xs">
    <Handle type="target" position={Position.Top} id="top" className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2" />
    <Handle type="target" position={Position.Left} id="left" className="w-2 h-2" />
    <Handle type="source" position={Position.Right} id="right" className="w-2 h-2" />
    [{data.label}]
  </div>
);

const nodeTypes: NodeTypes = {
  activity: ActivityNode,
  action: ActionNode,
  decision: DecisionNode,
  start: StartNode,
  end: EndNode,
  circle: CircleNode,
  fork: ForkNode,
  join: JoinNode,
  sendSignal: SendSignalNode,
  receiveSignal: ReceiveSignalNode,
  note: NoteNode,
  swimlane: SwimlaneNode,
  guard: GuardNode,
};

// Modal Komponente
interface EditModalProps {
  isOpen: boolean;
  node: Node | null;
  onSave: (label: string, description: string) => void;
  onClose: () => void;
  hasDescription: boolean;
}

const EditModal = ({ isOpen, node, onSave, onClose, hasDescription }: EditModalProps) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  useState(() => {
    if (node) {
      setLabel(node.data.label || "");
      setDescription(node.data.description || "");
    }
  });

  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Element bearbeiten</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titel
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        </div>

        {hasDescription && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung (mehrere Zeilen möglich)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Zeile 1&#10;Zeile 2&#10;Zeile 3..."
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Abbrechen
          </button>
          <button
            onClick={() => onSave(label, description)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Node Modal
interface AddModalProps {
  isOpen: boolean;
  nodeType: string;
  onSave: (label: string, description: string) => void;
  onClose: () => void;
  hasDescription: boolean;
}

const AddModal = ({ isOpen, nodeType, onSave, onClose, hasDescription }: AddModalProps) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(label, description);
    setLabel("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Neues Element hinzufügen</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titel
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        </div>

        {hasDescription && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung (mehrere Zeilen möglich)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Zeile 1&#10;Zeile 2&#10;Zeile 3..."
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DiagramTool({ onSave }: DiagramToolProps) {
  const [mode, setMode] = useState<"draw" | "upload">("draw");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedNodeType, setSelectedNodeType] = useState<string>("activity");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: false,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setEditingNode(node);
      setEditModalOpen(true);
    },
    []
  );

  const handleEditSave = (label: string, description: string) => {
    if (editingNode) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === editingNode.id
            ? { ...n, data: { ...n.data, label, description } }
            : n
        )
      );
    }
    setEditModalOpen(false);
    setEditingNode(null);
  };

  const openAddModal = () => {
    const needsLabel = !["start", "end", "fork", "join"].includes(selectedNodeType);
    if (needsLabel) {
      setAddModalOpen(true);
    } else {
      // Direkt hinzufügen ohne Modal
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: selectedNodeType,
        position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
        data: { label: "", description: "" },
      };
      setNodes((nds) => [...nds, newNode]);
    }
  };

  const handleAddSave = (label: string, description: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: selectedNodeType,
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      data: { label: label || "Neu", description },
    };
    setNodes((nds) => [...nds, newNode]);
    setAddModalOpen(false);
  };

  const deleteSelected = () => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  };

  const clearAll = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        setUploadedImage(data);
        onSave(data);
      };
      reader.readAsDataURL(file);
    }
  };

  const nodeOptions = [
    { id: "start", label: "●", desc: "Start" },
    { id: "end", label: "◉", desc: "Ende" },
    { id: "activity", label: "▢", desc: "Aktivität" },
    { id: "action", label: "⬭", desc: "Aktion (abgerundet)" },
    { id: "decision", label: "◇", desc: "Entscheidung" },
    { id: "fork", label: "━", desc: "Parallelisierung" },
    { id: "join", label: "═", desc: "Synchronisation" },
    { id: "sendSignal", label: "▷", desc: "Signal senden" },
    { id: "receiveSignal", label: "◁", desc: "Signal empfangen" },
    { id: "swimlane", label: "▤", desc: "Schwimmbahn" },
    { id: "note", label: "📝", desc: "Notiz" },
    { id: "guard", label: "[ ]", desc: "Bedingung" },
  ];

  const hasDescription = (type: string) => ["activity", "action"].includes(type);

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        node={editingNode}
        onSave={handleEditSave}
        onClose={() => {
          setEditModalOpen(false);
          setEditingNode(null);
        }}
        hasDescription={editingNode ? hasDescription(editingNode.type || "") : false}
      />

      {/* Add Modal */}
      <AddModal
        isOpen={addModalOpen}
        nodeType={selectedNodeType}
        onSave={handleAddSave}
        onClose={() => setAddModalOpen(false)}
        hasDescription={hasDescription(selectedNodeType)}
      />

      <div className="flex border-b">
        <button
          onClick={() => setMode("draw")}
          className={`flex-1 py-3 px-4 font-medium transition ${
            mode === "draw"
              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          ✏️ Zeichnen
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`flex-1 py-3 px-4 font-medium transition ${
            mode === "upload"
              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          📷 Bild hochladen
        </button>
      </div>

      {mode === "draw" ? (
        <div>
          {/* Werkzeugleiste */}
          <div className="flex items-center gap-1 p-2 bg-gray-50 border-b flex-wrap">
            {nodeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedNodeType(opt.id)}
                title={opt.desc}
                className={`w-9 h-9 rounded flex items-center justify-center text-sm transition ${
                  selectedNodeType === opt.id
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}

            <div className="w-px h-8 bg-gray-300 mx-2" />

            <button
              onClick={openAddModal}
              className="px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-sm"
            >
              ➕ Hinzufügen
            </button>

            <button
              onClick={deleteSelected}
              className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition text-sm"
            >
              🗑️ Löschen
            </button>

            <button
              onClick={clearAll}
              className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
            >
              🧹 Alles
            </button>
          </div>

          {/* React Flow Canvas */}
          <div style={{ height: "600px" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeDoubleClick={onNodeDoubleClick}
              nodeTypes={nodeTypes}
              fitView
              snapToGrid
              snapGrid={[15, 15]}
            >
              <Controls />
              <Background gap={15} size={1} />
            </ReactFlow>
          </div>

          <div className="p-2 bg-gray-50 border-t text-sm text-gray-500">
            💡 Element hinzufügen → Ziehen → Punkte verbinden | Doppelklick = Bearbeiten
          </div>
        </div>
      ) : (
        <div className="p-8">
          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt="Hochgeladenes Diagramm"
                className="max-w-full rounded border"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Bild entfernen
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <div className="text-center">
                <div className="text-4xl mb-2">📁</div>
                <p className="text-gray-600 font-medium">Klicken zum Hochladen</p>
                <p className="text-gray-400 text-sm mt-1">PNG, JPG oder GIF</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}