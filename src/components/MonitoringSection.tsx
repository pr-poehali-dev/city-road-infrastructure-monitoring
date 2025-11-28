import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface RoadData {
  id: string;
  name: string;
  length: number;
  status: 'good' | 'warning' | 'critical';
  defects: number;
  lastCheck: string;
  type: string;
}

const MonitoringSection = () => {
  const roads: RoadData[] = [
    {
      id: '1',
      name: 'Московский проспект, уч. 12-18 км',
      length: 6.0,
      status: 'critical',
      defects: 15,
      lastCheck: '2025-11-25',
      type: 'Магистраль'
    },
    {
      id: '2',
      name: 'ул. Ленина, уч. 3-5 км',
      length: 2.0,
      status: 'warning',
      defects: 7,
      lastCheck: '2025-11-26',
      type: 'Магистраль'
    },
    {
      id: '3',
      name: 'пр. Ленинградский, уч. 8-12 км',
      length: 4.0,
      status: 'good',
      defects: 2,
      lastCheck: '2025-11-27',
      type: 'Магистраль'
    },
    {
      id: '4',
      name: 'Президентский бульвар, уч. 1-4 км',
      length: 3.0,
      status: 'warning',
      defects: 9,
      lastCheck: '2025-11-24',
      type: 'Магистраль'
    },
    {
      id: '5',
      name: 'ул. Гагарина, уч. 5-8 км',
      length: 3.0,
      status: 'critical',
      defects: 18,
      lastCheck: '2025-11-23',
      type: 'Межквартальный проезд'
    },
    {
      id: '6',
      name: 'ул. Калинина, дворовая территория',
      length: 0.5,
      status: 'good',
      defects: 1,
      lastCheck: '2025-11-27',
      type: 'Дворовая территория'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      good: { label: 'Удовлетворительно', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      warning: { label: 'Требует внимания', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      critical: { label: 'Критическое', className: 'bg-red-100 text-red-800 hover:bg-red-100' }
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Мониторинг состояния дорог</h3>
          <p className="text-muted-foreground mt-1">Автоматизированный сбор данных о состоянии дорожной сети</p>
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Новая проверка
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Route" className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего участков</p>
                <p className="text-2xl font-bold">1 247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Удовлетворительно</p>
                <p className="text-2xl font-bold">983</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Icon name="AlertCircle" className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Требует внимания</p>
                <p className="text-2xl font-bold">175</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" className="text-red-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Критическое</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Список участков</CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Поиск по участкам..." className="w-64" />
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Участок дороги</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Протяженность</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дефектов</TableHead>
                <TableHead>Последняя проверка</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roads.map((road) => (
                <TableRow key={road.id} className="hover:bg-accent/5">
                  <TableCell className="font-medium">{road.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {road.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{road.length} км</TableCell>
                  <TableCell>{getStatusBadge(road.status)}</TableCell>
                  <TableCell>
                    <span className="font-semibold">{road.defects}</span>
                  </TableCell>
                  <TableCell>{new Date(road.lastCheck).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Video" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="FileText" size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringSection;
