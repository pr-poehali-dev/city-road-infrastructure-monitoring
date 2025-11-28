import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MapSegment {
  id: string;
  name: string;
  status: 'good' | 'warning' | 'critical';
  x: number;
  y: number;
  width: number;
  height: number;
}

const RoadMap = () => {
  const segments: MapSegment[] = [
    { id: '1', name: 'Московский пр-т', status: 'critical', x: 20, y: 30, width: 150, height: 8 },
    { id: '2', name: 'ул. Ленина', status: 'warning', x: 180, y: 80, width: 120, height: 8 },
    { id: '3', name: 'Ленинградский пр-т', status: 'good', x: 50, y: 120, width: 180, height: 8 },
    { id: '4', name: 'Президентский б-р', status: 'warning', x: 240, y: 30, width: 100, height: 8 },
    { id: '5', name: 'ул. Гагарина', status: 'critical', x: 100, y: 180, width: 140, height: 8 }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      good: '#22c55e',
      warning: '#eab308',
      critical: '#ef4444'
    };
    return colors[status];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Карта дорожной сети</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icon name="ZoomIn" size={16} className="mr-2" />
              Увеличить
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Layers" size={16} className="mr-2" />
              Слои
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-4 border border-border">
          <svg width="100%" height="300" viewBox="0 0 400 250" className="w-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            
            <rect width="400" height="250" fill="url(#grid)" />
            
            {segments.map((segment) => (
              <g key={segment.id}>
                <rect
                  x={segment.x}
                  y={segment.y}
                  width={segment.width}
                  height={segment.height}
                  fill={getStatusColor(segment.status)}
                  rx="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                <text
                  x={segment.x + segment.width / 2}
                  y={segment.y - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-700"
                  style={{ fontSize: '10px' }}
                >
                  {segment.name}
                </text>
              </g>
            ))}
            
            <circle cx="350" cy="40" r="4" fill="#0ea5e9" />
            <text x="360" y="43" className="text-xs fill-gray-700" style={{ fontSize: '10px' }}>
              Базовая станция
            </text>
            
            <path
              d="M 80 60 L 120 100 L 180 80"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="4"
              fill="none"
              opacity="0.5"
            />
          </svg>
          
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-gray-600">Удовлетворительно</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-gray-600">Требует внимания</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-gray-600">Критическое</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={18} className="text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Тестовый режим</p>
              <p className="text-blue-700 mt-1">
                Данные собираются с 5 маршрутов тестирования. Полное покрытие города запланировано на февраль 2026.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadMap;
