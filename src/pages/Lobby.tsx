import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type AvatarCustomization = {
  bodyColor: string;
  headColor: string;
  clothingType: string;
  accessory: string;
};

type Message = {
  user: string;
  text: string;
  time: string;
};

const Lobby = () => {
  const [coins, setCoins] = useState(100);
  const [activeTab, setActiveTab] = useState('lobby');
  const [messages, setMessages] = useState<Message[]>([
    { user: 'Игрок123', text: 'Привет всем!', time: '10:23' },
    { user: 'КубикПро', text: 'Кто в мини-игру?', time: '10:24' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showCustomization, setShowCustomization] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const [avatar, setAvatar] = useState<AvatarCustomization>({
    bodyColor: '#F97316',
    headColor: '#FEC6A1',
    clothingType: 'Футболка',
    accessory: 'Очки',
  });

  const bodyColors = ['#F97316', '#0EA5E9', '#8B5CF6', '#FEC6A1', '#22C55E'];
  const headColors = ['#FEC6A1', '#FFB8D1', '#FDE1D3', '#D3E4FD'];
  const clothingTypes = ['Футболка', 'Толстовка', 'Костюм', 'Куртка'];
  const accessories = ['Очки', 'Шапка', 'Рюкзак', 'Наушники', 'Без аксессуара'];

  const shopItems = [
    { name: 'Крутая кепка', price: 50, type: 'accessory' },
    { name: 'Неоновый костюм', price: 150, type: 'clothing' },
    { name: 'Радужная раскраска', price: 80, type: 'color' },
    { name: 'Реактивный ранец', price: 200, type: 'accessory' },
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      setMessages([
        ...messages,
        {
          user: 'Я',
          text: newMessage,
          time: `${now.getHours()}:${now.getMinutes()}`,
        },
      ]);
      setNewMessage('');
    }
  };

  const startMiniGame = () => {
    setGameActive(true);
    setGameScore(0);
    setTimeout(() => {
      const earned = Math.floor(Math.random() * 30) + 10;
      setGameScore(earned);
      setCoins(coins + earned);
      setGameActive(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-50 to-purple-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <Card className="p-4 bg-white/90 backdrop-blur shadow-lg border-4 border-orange-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg shadow-cardboard relative"
                style={{
                  background: `linear-gradient(135deg, ${avatar.bodyColor} 0%, ${avatar.bodyColor}dd 100%)`,
                }}
              >
                <div
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
                  style={{ backgroundColor: avatar.headColor }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Мой Игрок</h2>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="shadow-sm">
                    <Icon name="Coins" size={14} className="mr-1" />
                    {coins} монет
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowCustomization(true)}
              className="bg-purple-500 hover:bg-purple-600 shadow-cardboard"
            >
              <Icon name="Shirt" size={18} className="mr-2" />
              Изменить аватар
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6 h-auto p-2 bg-white/80 backdrop-blur border-4 border-blue-300 shadow-cardboard">
            <TabsTrigger value="lobby" className="data-[state=active]:bg-orange-400 data-[state=active]:shadow-cardboard py-3">
              <Icon name="Home" size={18} className="mr-2" />
              Лобби
            </TabsTrigger>
            <TabsTrigger value="world" className="data-[state=active]:bg-blue-400 data-[state=active]:shadow-cardboard py-3">
              <Icon name="Globe" size={18} className="mr-2" />
              Мир
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:bg-purple-400 data-[state=active]:shadow-cardboard py-3">
              <Icon name="Users" size={18} className="mr-2" />
              Друзья
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-green-400 data-[state=active]:shadow-cardboard py-3">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Чат
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-pink-400 data-[state=active]:shadow-cardboard py-3">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Магазин
            </TabsTrigger>
          </TabsList>

          {/* Lobby Tab */}
          <TabsContent value="lobby">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/90 backdrop-blur border-4 border-orange-300 shadow-cardboard">
                <h3 className="text-2xl font-bold mb-4 text-orange-600 flex items-center gap-2">
                  <Icon name="Gamepad2" size={24} />
                  Добро пожаловать!
                </h3>
                <p className="text-gray-700 mb-6">
                  Исследуй виртуальный мир, играй в мини-игры, общайся с друзьями и
                  кастомизируй своего персонажа!
                </p>
                <Button
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 shadow-cardboard text-lg py-6"
                  onClick={() => setActiveTab('world')}
                >
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Войти в мир
                </Button>
              </Card>

              <Card className="p-6 bg-white/90 backdrop-blur border-4 border-purple-300 shadow-cardboard">
                <h3 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                  <Icon name="Sparkles" size={24} />
                  Мини-игра: Собери кубики
                </h3>
                <p className="text-gray-700 mb-4">
                  Зарабатывай монеты, собирая кубики! Играй бесплатно и покупай новые
                  вещи для аватара.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-purple-500 hover:bg-purple-600 shadow-cardboard text-lg py-6"
                  onClick={() => setShowMiniGame(true)}
                >
                  <Icon name="Zap" size={20} className="mr-2" />
                  Начать игру
                </Button>
              </Card>
            </div>

            {/* Online Players */}
            <Card className="mt-6 p-6 bg-white/90 backdrop-blur border-4 border-blue-300 shadow-cardboard">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                Онлайн игроки (247)
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2 min-w-fit">
                    <div
                      className="w-14 h-14 rounded-lg shadow-cardboard"
                      style={{
                        backgroundColor: bodyColors[i % bodyColors.length],
                      }}
                    />
                    <span className="text-xs text-gray-600">Игрок{i}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* World Tab */}
          <TabsContent value="world">
            <Card className="p-8 bg-white/90 backdrop-blur border-4 border-blue-300 shadow-cardboard min-h-[500px]">
              <div className="text-center">
                <div className="mb-8">
                  <Icon name="Globe" size={64} className="mx-auto text-blue-500 mb-4" />
                  <h2 className="text-3xl font-bold text-blue-600 mb-2">
                    Картонный мир
                  </h2>
                  <p className="text-gray-600">
                    Исследуй локации, встречай игроков, участвуй в событиях
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  {['Центральная площадь', 'Игровая арена', 'Секретный парк'].map(
                    (location, i) => (
                      <Card
                        key={i}
                        className="p-6 hover:scale-105 transition-transform cursor-pointer border-4 shadow-cardboard"
                        style={{
                          borderColor: [
                            '#F97316',
                            '#0EA5E9',
                            '#8B5CF6',
                          ][i],
                        }}
                      >
                        <Icon
                          name={['MapPin', 'Trophy', 'Trees'][i] as any}
                          size={32}
                          className="mx-auto mb-3"
                        />
                        <h3 className="font-bold text-lg">{location}</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {[15, 8, 23][i]} игроков
                        </p>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends">
            <Card className="p-6 bg-white/90 backdrop-blur border-4 border-purple-300 shadow-cardboard">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                Мои друзья (12)
              </h3>
              <div className="space-y-3">
                {['КубикПро', 'Картошка228', 'ПлеерТоп', 'MegaBlock'].map(
                  (friend, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg shadow-cardboard"
                          style={{
                            backgroundColor: bodyColors[i % bodyColors.length],
                          }}
                        />
                        <div>
                          <p className="font-bold">{friend}</p>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            В сети
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Пригласить
                      </Button>
                    </div>
                  )
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card className="p-6 bg-white/90 backdrop-blur border-4 border-green-300 shadow-cardboard">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Общий чат
              </h3>
              <ScrollArea className="h-[400px] mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                {messages.map((msg, i) => (
                  <div key={i} className="mb-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-green-700">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-gray-800">{msg.text}</p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Напиши сообщение..."
                  className="border-2 border-green-300"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-green-500 hover:bg-green-600 shadow-cardboard"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop">
            <Card className="p-6 bg-white/90 backdrop-blur border-4 border-pink-300 shadow-cardboard">
              <h3 className="text-2xl font-bold mb-6 text-pink-600 flex items-center gap-2">
                <Icon name="ShoppingBag" size={28} />
                Магазин
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {shopItems.map((item, i) => (
                  <Card
                    key={i}
                    className="p-5 border-4 border-pink-200 hover:border-pink-400 transition-colors shadow-cardboard"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{item.name}</h4>
                        <Badge variant="secondary" className="mt-1">
                          {item.type === 'accessory'
                            ? 'Аксессуар'
                            : item.type === 'clothing'
                            ? 'Одежда'
                            : 'Раскраска'}
                        </Badge>
                      </div>
                      <Icon name="Sparkles" size={24} className="text-pink-500" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 font-bold text-orange-600">
                        <Icon name="Coins" size={18} />
                        {item.price}
                      </div>
                      <Button
                        size="sm"
                        disabled={coins < item.price}
                        className="bg-pink-500 hover:bg-pink-600 shadow-cardboard"
                      >
                        Купить
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Avatar Customization Dialog */}
      <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
        <DialogContent className="max-w-2xl border-4 border-purple-300">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-600">
              Кастомизация аватара
            </DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-48 h-48 rounded-2xl shadow-cardboard relative"
                style={{
                  background: `linear-gradient(135deg, ${avatar.bodyColor} 0%, ${avatar.bodyColor}dd 100%)`,
                }}
              >
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white"
                  style={{ backgroundColor: avatar.headColor }}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-white font-bold text-sm bg-black/30 px-3 py-1 rounded">
                    {avatar.clothingType}
                  </p>
                  <p className="text-white font-bold text-sm bg-black/30 px-3 py-1 rounded mt-1">
                    {avatar.accessory}
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div>
                <label className="font-bold mb-2 block">Цвет тела</label>
                <div className="flex gap-2">
                  {bodyColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setAvatar({ ...avatar, bodyColor: color })}
                      className={`w-10 h-10 rounded-lg shadow-cardboard border-4 ${
                        avatar.bodyColor === color
                          ? 'border-black'
                          : 'border-white'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold mb-2 block">Цвет головы</label>
                <div className="flex gap-2">
                  {headColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setAvatar({ ...avatar, headColor: color })}
                      className={`w-10 h-10 rounded-full shadow-cardboard border-4 ${
                        avatar.headColor === color
                          ? 'border-black'
                          : 'border-white'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold mb-2 block">Одежда</label>
                <div className="grid grid-cols-2 gap-2">
                  {clothingTypes.map((type) => (
                    <Button
                      key={type}
                      onClick={() => setAvatar({ ...avatar, clothingType: type })}
                      variant={avatar.clothingType === type ? 'default' : 'outline'}
                      size="sm"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold mb-2 block">Аксессуар</label>
                <div className="grid grid-cols-2 gap-2">
                  {accessories.map((acc) => (
                    <Button
                      key={acc}
                      onClick={() => setAvatar({ ...avatar, accessory: acc })}
                      variant={avatar.accessory === acc ? 'default' : 'outline'}
                      size="sm"
                    >
                      {acc}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mini Game Dialog */}
      <Dialog open={showMiniGame} onOpenChange={setShowMiniGame}>
        <DialogContent className="border-4 border-purple-300">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-600">
              Собери кубики!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            {!gameActive && gameScore === 0 && (
              <div>
                <Icon name="Boxes" size={64} className="mx-auto mb-4 text-purple-500" />
                <p className="text-gray-600 mb-6">
                  Нажми кнопку и собери как можно больше кубиков за 3 секунды!
                </p>
                <Button
                  size="lg"
                  onClick={startMiniGame}
                  className="bg-purple-500 hover:bg-purple-600 shadow-cardboard"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать
                </Button>
              </div>
            )}

            {gameActive && (
              <div className="animate-pulse">
                <Icon name="Loader2" size={64} className="mx-auto mb-4 text-purple-500 animate-spin" />
                <p className="text-xl font-bold">Собираю кубики...</p>
              </div>
            )}

            {!gameActive && gameScore > 0 && (
              <div className="animate-fade-in">
                <Icon name="Trophy" size={64} className="mx-auto mb-4 text-yellow-500" />
                <p className="text-2xl font-bold mb-2">Отлично!</p>
                <p className="text-gray-600 mb-4">Ты заработал:</p>
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-orange-600 mb-6">
                  <Icon name="Coins" size={32} />
                  +{gameScore}
                </div>
                <Button
                  onClick={() => {
                    setGameScore(0);
                    startMiniGame();
                  }}
                  className="bg-purple-500 hover:bg-purple-600 shadow-cardboard"
                >
                  Играть ещё
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lobby;
