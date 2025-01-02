interface FilterOption {
    label: string;
    value: string;
  }
  
  interface FilterSidebarProps {
    categories: FilterOption[];
    organizations: FilterOption[];
    statuses: FilterOption[];
  }
  
  export default function FilterSidebar({ categories, organizations, statuses }: FilterSidebarProps) {
    return (
      <div className="w-64 bg-white p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Категория</h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">{category.label}</span>
              </label>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Организации</h3>
          <div className="space-y-2">
            {organizations.map((org, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">{org.label}</span>
              </label>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Статус</h3>
          <div className="space-y-2">
            {statuses.map((status, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">{status.label}</span>
              </label>
            ))}
          </div>
        </div>
  
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Применить фильтр
        </button>
        
        <button className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center">
          <span className="mr-1">↺</span> Сбросить фильтры
        </button>
      </div>
    );
  }