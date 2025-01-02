'use client';

import Image from 'next/image';

const Tax: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Какие преимущества вы получите</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Налоговые льготы Astana Hub</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <p>Участникам Astana Hub</p>
                <ul className="mt-2 space-y-2">
                  <li>КПН <span className="float-right">0%</span></li>
                  <li>НДС от реализации ТРУ (Товары, работы, услуги) <span className="float-right">0%</span></li>
                  <li>НДС на импорт по перечню товаров <span className="float-right">0%</span></li>
                  <li>НДС от приобретения услуг от нерезидентов <span className="float-right">0%</span></li>
                  <li>ИПН с дохода работников-резидентов <span className="float-right">0%</span></li>
                  <li>Дивиденды для нерезидентов и облагаются по ставке <span className="float-right">5%</span></li>
                  <li>Соц налог за иностранных работников <span className="float-right">0%</span></li>
                </ul>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <p>Без льгот</p>
                <ul className="mt-2 space-y-2">
                  <li>КПН <span className="float-right">20%</span></li>
                  <li>НДС от реализации ТРУ (Товары, работы, услуги) <span className="float-right">12%</span></li>
                  <li>НДС на импорт по перечню товаров <span className="float-right">12%</span></li>
                  <li>НДС от приобретения услуг от нерезидентов <span className="float-right">12%</span></li>
                  <li>ИПН с дохода работников-резидентов <span className="float-right">10%</span></li>
                  <li>Дивиденды для нерезидентов и облагаются по ставке <span className="float-right">15%</span></li>
                  <li>Соц налог за иностранных работников <span className="float-right">9.5%</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <div className="text-center">
              <Image src="" alt="Airplane and luggage" width={200} height={200} className="mx-auto mb-4"/>
              <p>Визовые льготы</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <div className="text-center">
              <Image src="" alt="Office supplies" width={200} height={200} className="mx-auto mb-4"/>
              <p>Развитие вашей компании</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tax;