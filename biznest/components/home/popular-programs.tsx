import { Share2, Heart } from 'lucide-react';

const programs = [
  {
    image: 'https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?auto=format&fit=crop&w=800&q=80',
    status: 'Идёт прием заявок',
    title: 'Courses for regional IT-hubs',
    description: 'Регистрация для участников региональных хабов'
  },
  {
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    status: 'Идёт прием заявок',
    title: 'Основы ИИ: ChatGPT',
    description: 'Основы Искусственного Интеллекта: ChatGPT – это курс, направленный на обучение основам работы с ИИ'
  },
  {
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=800&q=80',
    status: 'Идёт прием заявок',
    title: 'Аккредитация для физических и юридических лиц',
    description: 'Аккредитация субъектов научной и научно-технической деятельности'
  }
];

export function PopularPrograms() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Популярные программы</h2>
        <a href="/programs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Смотреть все →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {program.status}
                </span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
              <p className="text-gray-600 text-sm">{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}