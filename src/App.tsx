import { Search } from "lucide-react";

export default function App() {
  return (
    <div className="w-[600px] h-screen bg-background text-white font-geist">
      <div className="py-4 border-white/10 flex justify-center items-center">
        <span className="text-2xl font-semibold font-urbanist">GoSearch</span>
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="relative w-52">
            {/* Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search shortcuts, URLs"
              className="w-full text-base placeholder:text-base focus:outline-none focus:ring-0 bg-foreground pl-10 pr-4 py-2 border border-white/10 rounded-md"
            />
          </div>
          <span className="bg-blue px-4 py-2 text-base rounded-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:bg-[#0faaaa] transition-all duration-200">
            +<span className="ml-3">Add Mapping</span>
          </span>
        </div>
        <div className="mt-8">
          {/* Mappings Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-foreground">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Shortcut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {/* {filteredMappings.map((mapping) => (
                  <MappingRow
                    key={mapping.id}
                    mapping={mapping}
                    isEditing={editingId === mapping.id}
                    onEdit={() => setEditingId(mapping.id)}
                    onSave={(updatedMapping) => handleEditMapping(mapping.id, updatedMapping)}
                    onCancel={() => setEditingId(null)}
                    onDelete={() => handleDeleteMapping(mapping.id)}
                  />
                ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
