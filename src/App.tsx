import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Entry from "./components/Entry";
import { getMappings } from "./utils/getMappings";
import AddMappingBox from "./components/AddMappingBox";
export interface Mapping {
  id: string;
  shortcut: string;
  url: string;
  description: string;
}
export default function App() {
  const [mappings, setMappings] = useState<Mapping[]>([]);

  useEffect(() => {
    getMappings().then((data) => setMappings(data));
  }, []);

  useEffect(() => {
    setFilteredMappings(mappings);
  }, [mappings]);

  const handleEditMapping = (
    id: string,
    editData: { shortcut: string; url: string; description: string }
  ) => {
    getMappings().then((current) => {
      const updated = current.map((m) =>
        m.id === id ? { ...m, ...editData } : m
      );
      //@ts-ignore
      chrome.storage.sync.set({ mappings: updated }, () => {
        setMappings(updated);
      });
    });
  };
  const handleDeleteMapping = (id: string) => {
    getMappings().then((current) => {
      const updated = current.filter((m) => m.id !== id);
      //@ts-ignore
      chrome.storage.sync.set({ mappings: updated }, () => {
        setMappings(updated);
      });
    });
  };
  const handleFilter = (text: string) => {
    setFilteredMappings(
      mappings.filter(
        (element) =>
          element.shortcut.toLowerCase().includes(text.toLowerCase()) ||
          element.url.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  const addMapping = (data: Mapping) => {
    getMappings().then((current) => {
      if (current.some((m) => m.shortcut === data.shortcut)) {
        alert("Shortcut already exists!");
        return;
      }
      const updated = [...current, data];
      //@ts-ignore
      chrome.storage.sync.set({ mappings: updated }, () => {
        setMappings(updated);
      });
    });
  };

  const [showAddBox, setShowAddBox] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filteredMappings, setFilteredMappings] = useState<Mapping[]>(mappings);
  return (
    <div className="w-[600px] min-h-[500px] bg-background text-white font-geist">
      {showAddBox && (
        <AddMappingBox
          onClose={() => setShowAddBox(false)}
          onSubmit={(data) => {
            const newMapping: Mapping = {
              id: crypto.randomUUID(),
              ...data,
            };
            addMapping(newMapping); // the function we wrote earlier
          }}
        />
      )}
      <div className="py-4 border-white/10 flex justify-center items-center">
        <span className="mr-1">
          {/* <img src="/logo.png" className="w-20" /> */}
          <img src="/image.png" className="w-14" />
        </span>
        <span className="text-3xl font-semibold font-urbanist">GoSearch</span>
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="relative w-56">
            {/* Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            {/* Input */}
            <input
              onChange={(e) => handleFilter(e.target.value)}
              type="text"
              placeholder="Search shortcuts, URLs"
              className="w-full text-base placeholder:text-base focus:outline-none focus:ring-0 bg-foreground pl-10 pr-4 py-2 border border-white/10 rounded-md"
            />
          </div>
          <span
            onClick={() => setShowAddBox(true)}
            className="bg-blue px-4 py-2 text-base rounded-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:bg-[#0faaaa] transition-all duration-200"
          >
            +<span className="ml-3">Add Mapping</span>
          </span>
        </div>
        <div className="mt-8">
          {/* Mappings Table */}
          <div className="bg-foreground rounded-xl shadow-lg border border-white/10">
            <div className="custom-scrollbar overflow-x-auto">
              {/* make THIS div control vertical height */}
              <div className="max-h-[300px] custom-scrollbar overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-background sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Shortcut
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredMappings.map((mapping) => (
                      <Entry
                        key={mapping.id}
                        Mapping={mapping}
                        isEditing={editingId === mapping.id}
                        onEdit={() => setEditingId(mapping.id)}
                        onSave={(updatedMapping) => {
                          handleEditMapping(mapping.id, updatedMapping);
                          setEditingId(null);
                        }}
                        onCancel={() => setEditingId(null)}
                        onDelete={() => handleDeleteMapping(mapping.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
