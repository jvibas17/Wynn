import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-Session-ID, X-Language",
};

interface ChatRequest {
  message: string;
  language: string;
  sessionId: string;
}

interface TopicMapping {
  keywords: string[];
  responseKey: string;
  weight: number;
}

interface KnowledgeBase {
  topics: TopicMapping[];
  responses: { [key: string]: { [lang: string]: string } };
}

const knowledgeBase: KnowledgeBase = {
  topics: [
    {
      keywords: ['wynn', 'encore', 'hotel', 'resort', 'property', 'accommodation', 'overview', 'about'],
      responseKey: 'overview',
      weight: 10,
    },
    {
      keywords: ['room', 'suite', 'stay', 'check in', 'check-in', 'bedroom', 'accommodation'],
      responseKey: 'rooms',
      weight: 9,
    },
    {
      keywords: ['dining', 'restaurant', 'food', 'eat', 'breakfast', 'lunch', 'dinner', 'meal', 'cuisine', 'sw steakhouse', 'mizumi', 'wing lei'],
      responseKey: 'dining',
      weight: 9,
    },
    {
      keywords: ['casino', 'gaming', 'poker', 'blackjack', 'slots', 'gamble', 'bet', 'table game', 'roulette', 'baccarat', 'craps'],
      responseKey: 'casino',
      weight: 9,
    },
    {
      keywords: ['spa', 'massage', 'wellness', 'relaxation', 'facial', 'treatment', 'salon'],
      responseKey: 'spa',
      weight: 9,
    },
    {
      keywords: ['entertainment', 'show', 'performance', 'le reve', 'lake of dreams', 'nightclub', 'xs', 'encore beach', 'party', 'nightlife', 'music', 'dj'],
      responseKey: 'entertainment',
      weight: 9,
    },
    {
      keywords: ['pool', 'swimming', 'swim', 'cabana', 'beach club', 'european pool'],
      responseKey: 'pool',
      weight: 8,
    },
    {
      keywords: ['vip', 'host', 'winnie', 'concierge', 'personal', 'service', 'exclusive'],
      responseKey: 'vip',
      weight: 10,
    },
    {
      keywords: ['reservation', 'booking', 'book', 'reserve', 'availability'],
      responseKey: 'reservation',
      weight: 8,
    },
    {
      keywords: ['price', 'cost', 'rate', 'fee', 'charge', 'how much', 'expensive', 'cheap', 'afford'],
      responseKey: 'pricing',
      weight: 8,
    },
    {
      keywords: ['location', 'address', 'where', 'directions', 'find', 'map'],
      responseKey: 'location',
      weight: 7,
    },
    {
      keywords: ['contact', 'phone', 'email', 'call', 'reach', 'number', 'telephone'],
      responseKey: 'contact',
      weight: 8,
    },
    {
      keywords: ['reward', 'points', 'membership', 'tier', 'benefits', 'loyalty', 'program', 'perks'],
      responseKey: 'rewards',
      weight: 8,
    },
    {
      keywords: ['golf', 'course', 'golfing', 'tee time'],
      responseKey: 'golf',
      weight: 8,
    },
    {
      keywords: ['shopping', 'shop', 'store', 'boutique', 'retail', 'buy', 'purchase', 'chanel', 'louis vuitton', 'cartier', 'rolex'],
      responseKey: 'shopping',
      weight: 7,
    },
    {
      keywords: ['meeting', 'event', 'conference', 'wedding', 'convention', 'banquet', 'ballroom'],
      responseKey: 'events',
      weight: 7,
    },
    {
      keywords: ['parking', 'valet', 'transportation', 'car', 'vehicle', 'uber', 'taxi', 'shuttle'],
      responseKey: 'parking',
      weight: 6,
    },
    {
      keywords: ['wifi', 'internet', 'connection', 'online'],
      responseKey: 'wifi',
      weight: 5,
    },
    {
      keywords: ['pet', 'dog', 'cat', 'animal', 'pet-friendly'],
      responseKey: 'pets',
      weight: 6,
    },
    {
      keywords: ['fitness', 'gym', 'workout', 'exercise'],
      responseKey: 'fitness',
      weight: 6,
    },
  ],
  responses: {
    overview: {
      en: "Wynn and Encore Las Vegas are twin luxury resorts on the Las Vegas Strip, offering world-class accommodations, fine dining, entertainment, and gaming. Both properties feature elegant rooms and suites with floor-to-ceiling windows, modern amenities, and exceptional service. The resorts have received numerous Five-Star awards from Forbes Travel Guide. For personalized VIP service and reservations, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利和安可拉斯维加斯是拉斯维加斯大道上的双子豪华度假村，提供世界一流的住宿、精致餐饮、娱乐和博彩服务。两处物业均设有配备落地窗、现代化设施和卓越服务的优雅客房和套房。这些度假村获得了福布斯旅游指南的众多五星奖项。如需个性化VIP服务和预订，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利和安可拉斯維加斯是拉斯維加斯大道上的雙子豪華度假村，提供世界一流的住宿、精緻餐飲、娛樂和博彩服務。兩處物業均設有配備落地窗、現代化設施和卓越服務的優雅客房和套房。這些度假村獲得了福布斯旅遊指南的眾多五星獎項。如需個性化VIP服務和預訂，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィンとアンコール・ラスベガスは、ラスベガス・ストリップにあるツインラグジュアリーリゾートで、世界クラスの宿泊施設、高級レストラン、エンターテイメント、ゲーミングを提供しています。両施設には、床から天井までの窓、現代的なアメニティ、卓越したサービスを備えたエレガントな客室とスイートがあります。これらのリゾートはフォーブス・トラベルガイドから数多くの5つ星賞を受賞しています。パーソナライズされたVIPサービスと予約については、lovepicaso888@gmail.comでWinnie Leeに連絡してください。",
    },
    rooms: {
      en: "Wynn and Encore offer luxurious accommodations ranging from deluxe rooms to palatial suites. All rooms feature floor-to-ceiling windows with stunning views, pillow-top beds with high thread-count linens, marble bathrooms, and advanced technology. Room sizes range from 640 to over 5,000 square feet for suites. For reservations and room options, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利和安可提供从豪华客房到宫殿式套房的奢华住宿。所有客房均配备落地窗（享有壮丽景色）、枕顶床（配高支数床单）、大理石浴室和先进技术。客房面积从640平方英尺到套房的5000多平方英尺不等。如需预订和了解客房选项，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利和安可提供從豪華客房到宮殿式套房的奢華住宿。所有客房均配備落地窗（享有壯麗景色）、枕頂床（配高支數床單）、大理石浴室和先進技術。客房面積從640平方英尺到套房的5000多平方英尺不等。如需預訂和了解客房選項，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィンとアンコールは、デラックスルームから宮殿のようなスイートまで、豪華な宿泊施設を提供しています。すべての客室には、素晴らしい景色を望む床から天井までの窓、高級リネンを使用したピロートップベッド、大理石のバスルーム、最新のテクノロジーが備わっています。客室の広さは640平方フィートから、スイートは5,000平方フィート以上まであります。予約とお部屋のオプションについては、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    dining: {
      en: "Wynn and Encore feature award-winning restaurants by celebrity chefs. Highlights include SW Steakhouse (premium steaks and seafood), Wing Lei (first Chinese restaurant in North America to earn a Michelin star), Mizumi (Japanese cuisine), Costa di Mare (Italian seafood), and many more. From casual to fine dining, there are over 20 dining venues to choose from. For dining reservations and recommendations, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利和安可拥有名厨主理的获奖餐厅。亮点包括SW牛排馆（优质牛排和海鲜）、永利宫（北美首家获得米其林星级的中餐厅）、Mizumi（日本料理）、Costa di Mare（意大利海鲜）等。从休闲到精致餐饮，有20多个餐饮场所可供选择。如需餐饮预订和推荐，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利和安可擁有名廚主理的獲獎餐廳。亮點包括SW牛排館（優質牛排和海鮮）、永利宮（北美首家獲得米其林星級的中餐廳）、Mizumi（日本料理）、Costa di Mare（意大利海鮮）等。從休閒到精緻餐飲，有20多個餐飲場所可供選擇。如需餐飲預訂和推薦，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィンとアンコールには、有名シェフによる受賞歴のあるレストランがあります。ハイライトには、SWステーキハウス（プレミアムステーキとシーフード）、Wing Lei（北米で初めてミシュランの星を獲得した中華レストラン）、Mizumi（日本料理）、Costa di Mare（イタリアンシーフード）などがあります。カジュアルからファインダイニングまで、20以上のダイニング会場から選べます。ダイニングの予約とおすすめについては、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    casino: {
      en: "The casino at Wynn Las Vegas features over 1,800 slot machines with denominations from 1¢ to $500, plus table games including blackjack, craps, roulette, baccarat, and Pai Gow. Our exclusive poker room offers daily tournaments and cash games. Casino gaming is available 24/7. High-limit gaming salons are available for premium players. For VIP gaming arrangements, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利拉斯维加斯的赌场设有1800多台老虎机，面额从1美分到500美元不等，还有桌面游戏包括21点、掷骰子、轮盘赌、百家乐和牌九。我们的专属扑克室每天提供锦标赛和现金游戏。赌场博彩全天24小时开放。高额限注博彩厅专为高端玩家提供。如需VIP博彩安排，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利拉斯維加斯的賭場設有1800多台老虎機，面額從1美分到500美元不等，還有桌面遊戲包括21點、擲骰子、輪盤賭、百家樂和牌九。我們的專屬撲克室每天提供錦標賽和現金遊戲。賭場博彩全天24小時開放。高額限注博彩廳專為高端玩家提供。如需VIP博彩安排，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィン・ラスベガスのカジノには、1セントから500ドルまでの金額の1,800台以上のスロットマシンと、ブラックジャック、クラップス、ルーレット、バカラ、パイゴウなどのテーブルゲームがあります。専用ポーカールームでは、毎日トーナメントとキャッシュゲームを開催しています。カジノゲーミングは24時間年中無休です。プレミアムプレーヤー向けのハイリミットゲーミングサロンもあります。VIPゲーミングの手配については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    spa: {
      en: "The Spa at Wynn is a 45,000-square-foot luxury sanctuary offering massages, facials, body treatments, and full salon services. Treatments incorporate both Eastern and Western techniques. Features include relaxation lounges, saunas, steam rooms, and a co-ed retreat with healthy refreshments. For spa reservations and packages, contact Winnie Lee at lovepicaso888@gmail.com or call 702-770-3900.",
      zh: "永利水疗中心是一个占地45000平方英尺的奢华圣地，提供按摩、面部护理、身体护理和全套沙龙服务。护理融合了东西方技术。设施包括休息室、桑拿房、蒸汽房和提供健康茶点的男女混合休养区。如需水疗预订和套餐，请联系李慧敏：lovepicaso888@gmail.com 或致电702-770-3900。",
      'zh-tw': "永利水療中心是一個佔地45000平方英尺的奢華聖地，提供按摩、面部護理、身體護理和全套沙龍服務。護理融合了東西方技術。設施包括休息室、桑拿房、蒸汽房和提供健康茶點的男女混合休養區。如需水療預訂和套餐，請聯繫李慧敏：lovepicaso888@gmail.com 或致電702-770-3900。",
      ja: "ウィンのスパは45,000平方フィートの高級サンクチュアリで、マッサージ、フェイシャル、ボディトリートメント、フルサロンサービスを提供しています。トリートメントには東洋と西洋の技術が取り入れられています。リラクゼーションラウンジ、サウナ、スチームルーム、健康的な軽食付きの男女共用リトリートなどの設備があります。スパの予約とパッケージについては、lovepicaso888@gmail.comでWinnie Leeにお問い合わせいただくか、702-770-3900までお電話ください。",
    },
    entertainment: {
      en: "Entertainment at Wynn and Encore includes world-class shows and nightlife. Lake of Dreams is a free nightly multimedia show featuring stunning visuals and music. XS Nightclub and Encore Beach Club host top DJs and performers. The resort also features various seasonal shows and live performances. For show tickets and VIP table reservations, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利和安可的娱乐活动包括世界级的表演和夜生活。梦幻湖是一个免费的每晚多媒体表演，呈现令人惊叹的视觉效果和音乐。XS夜总会和安可海滩俱乐部接待顶级DJ和表演者。度假村还有各种季节性表演和现场演出。如需演出门票和VIP桌位预订，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利和安可的娛樂活動包括世界級的表演和夜生活。夢幻湖是一個免費的每晚多媒體表演，呈現令人驚嘆的視覺效果和音樂。XS夜總會和安可海灘俱樂部接待頂級DJ和表演者。度假村還有各種季節性表演和現場演出。如需演出門票和VIP桌位預訂，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィンとアンコールのエンターテイメントには、世界クラスのショーとナイトライフが含まれます。レイク・オブ・ドリームスは、美しいビジュアルと音楽を特徴とする無料の毎晩のマルチメディアショーです。XSナイトクラブとアンコール・ビーチクラブは、トップDJとパフォーマーをホストしています。リゾートには、さまざまな季節のショーやライブパフォーマンスもあります。ショーチケットとVIPテーブル予約については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    pool: {
      en: "Wynn features multiple pool experiences: the adult-only European Pool (topless sunbathing permitted), family-friendly pools, and Encore Beach Club (a premier dayclub with DJs and cabanas). Private cabanas are available for rent with dedicated service staff. Pool season typically runs March through October, weather permitting. For cabana reservations and pool access, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利拥有多个泳池体验：仅限成人的欧式泳池（允许裸晒日光浴）、适合家庭的泳池和安可海滩俱乐部（配备DJ和包厢的顶级日间俱乐部）。可租用配备专职服务人员的私人包厢。泳池季节通常从三月持续到十月，视天气情况而定。如需包厢预订和泳池通行，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利擁有多個泳池體驗：僅限成人的歐式泳池（允許裸曬日光浴）、適合家庭的泳池和安可海灘俱樂部（配備DJ和包廂的頂級日間俱樂部）。可租用配備專職服務人員的私人包廂。泳池季節通常從三月持續到十月，視天氣情況而定。如需包廂預訂和泳池通行，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィンには複数のプール体験があります：大人専用のヨーロピアンプール（トップレス日光浴可）、ファミリーフレンドリーなプール、アンコール・ビーチクラブ（DJとカバナを備えた一流のデイクラブ）。専任のサービススタッフ付きのプライベートカバナをレンタルできます。プールシーズンは通常3月から10月まで、天候により変動します。カバナ予約とプールアクセスについては、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    vip: {
      en: "For VIP hosting services and personalized experiences, contact Winnie Lee at lovepicaso888@gmail.com. She specializes in creating exceptional Las Vegas experiences for distinguished guests, including exclusive access, premium reservations, complimentary amenities, personalized concierge services, special event arrangements, and VIP gaming privileges. Winnie can arrange everything from show tickets to special dining experiences and luxury suite accommodations.",
      zh: "如需VIP接待服务和个性化体验，请联系李慧敏：lovepicaso888@gmail.com。她专门为尊贵客人打造卓越的拉斯维加斯体验，包括独家访问权、高级预订、免费设施、个性化礼宾服务、特殊活动安排和VIP博彩特权。李慧敏可以安排从演出门票到特殊餐饮体验和豪华套房住宿的所有事宜。",
      'zh-tw': "如需VIP接待服務和個性化體驗，請聯繫李慧敏：lovepicaso888@gmail.com。她專門為尊貴客人打造卓越的拉斯維加斯體驗，包括獨家訪問權、高級預訂、免費設施、個性化禮賓服務、特殊活動安排和VIP博彩特權。李慧敏可以安排從演出門票到特殊餐飲體驗和豪華套房住宿的所有事宜。",
      ja: "VIPホスティングサービスとパーソナライズされた体験については、lovepicaso888@gmail.comでWinnie Leeに連絡してください。彼女は、独占アクセス、プレミアム予約、無料アメニティ、パーソナライズされたコンシェルジュサービス、特別イベントの手配、VIPゲーミング特権など、優れたゲストのための特別なラスベガス体験の創造を専門としています。Winnieは、ショーチケットから特別なダイニング体験、高級スイート宿泊まで、すべてを手配できます。",
    },
    reservation: {
      en: "For the best personalized service and exclusive rates, contact Winnie Lee directly at lovepicaso888@gmail.com. She can arrange special packages, complimentary amenities, room upgrades, and VIP access. Alternatively, reservations can be made through wynnlasvegas.com or by calling 1-888-320-WYNN (9966) for standard bookings.",
      zh: "如需最优质的个性化服务和独家优惠，请直接联系李慧敏：lovepicaso888@gmail.com。她可以安排特殊套餐、免费设施、客房升级和VIP通行。或者，您也可以通过wynnlasvegas.com或致电1-888-320-WYNN (9966)进行标准预订。",
      'zh-tw': "如需最優質的個性化服務和獨家優惠，請直接聯繫李慧敏：lovepicaso888@gmail.com。她可以安排特殊套餐、免費設施、客房升級和VIP通行。或者，您也可以通過wynnlasvegas.com或致電1-888-320-WYNN (9966)進行標準預訂。",
      ja: "最高のパーソナライズされたサービスと独占料金については、lovepicaso888@gmail.comでWinnie Leeに直接連絡してください。彼女は特別パッケージ、無料アメニティ、客室アップグレード、VIPアクセスを手配できます。または、標準予約については、wynnlasvegas.comまたは1-888-320-WYNN（9966）にお電話で予約できます。",
    },
    pricing: {
      en: "Room rates vary based on dates, seasons, day of week, and availability. Weekday rates typically start around $200-300 per night for standard rooms, while weekend rates are higher. Special events and holidays command premium pricing. For the best rates, exclusive packages, and VIP pricing, contact Winnie Lee at lovepicaso888@gmail.com. Standard rates available at wynnlasvegas.com or 1-888-320-WYNN (9966).",
      zh: "客房价格因日期、季节、星期几和供应情况而异。工作日价格通常从标准客房每晚约200-300美元起，而周末价格更高。特殊活动和假期价格更高。如需最优惠价格、独家套餐和VIP价格，请联系李慧敏：lovepicaso888@gmail.com。标准价格可在wynnlasvegas.com或致电1-888-320-WYNN (9966)查询。",
      'zh-tw': "客房價格因日期、季節、星期幾和供應情況而異。工作日價格通常從標準客房每晚約200-300美元起，而週末價格更高。特殊活動和假期價格更高。如需最優惠價格、獨家套餐和VIP價格，請聯繫李慧敏：lovepicaso888@gmail.com。標準價格可在wynnlasvegas.com或致電1-888-320-WYNN (9966)查詢。",
      ja: "客室料金は、日付、シーズン、曜日、空室状況により異なります。平日料金は通常、スタンダードルームで1泊約200～300ドルから始まり、週末料金はより高くなります。特別イベントや休日はプレミアム価格となります。最高の料金、独占パッケージ、VIP価格については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。標準料金は、wynnlasvegas.comまたは1-888-320-WYNN（9966）でご確認いただけます。",
    },
    location: {
      en: "Wynn Las Vegas is located at 3131 Las Vegas Boulevard South, Las Vegas, NV 89109. It's situated on the Las Vegas Strip between Fashion Show Mall and the Venetian Resort, directly across from Treasure Island. The resort is approximately 3.5 miles from McCarran International Airport (15-minute drive). For directions and transportation arrangements, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利拉斯维加斯位于内华达州拉斯维加斯南拉斯维加斯大道3131号，邮编89109。它位于时尚秀购物中心和威尼斯人度假村之间的拉斯维加斯大道上，与金银岛正对面。度假村距离麦卡伦国际机场约3.5英里（15分钟车程）。如需路线指引和交通安排，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利拉斯維加斯位於內華達州拉斯維加斯南拉斯維加斯大道3131號，郵編89109。它位於時尚秀購物中心和威尼斯人度假村之間的拉斯維加斯大道上，與金銀島正對面。度假村距離麥卡倫國際機場約3.5英里（15分鐘車程）。如需路線指引和交通安排，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィン・ラスベガスは、ネバダ州ラスベガスの3131 South Las Vegas Boulevard, Las Vegas, NV 89109に位置しています。ファッションショーモールとヴェネチアンリゾートの間のラスベガス・ストリップにあり、トレジャーアイランドの真向かいです。リゾートはマッカラン国際空港から約3.5マイル（車で15分）です。道順と交通手段の手配については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    contact: {
      en: "For personalized VIP service, contact Winnie Lee at lovepicaso888@gmail.com. For general inquiries: Wynn Las Vegas main line 702-770-7000 or toll-free 1-888-320-WYNN (9966). Spa: 702-770-3900. Restaurants: 702-770-DINE (3463). Golf: 702-770-4653. Website: wynnlasvegas.com",
      zh: "如需个性化VIP服务，请联系李慧敏：lovepicaso888@gmail.com。一般咨询：永利拉斯维加斯总机702-770-7000或免费电话1-888-320-WYNN (9966)。水疗：702-770-3900。餐厅：702-770-DINE (3463)。高尔夫：702-770-4653。网站：wynnlasvegas.com",
      'zh-tw': "如需個性化VIP服務，請聯繫李慧敏：lovepicaso888@gmail.com。一般諮詢：永利拉斯維加斯總機702-770-7000或免費電話1-888-320-WYNN (9966)。水療：702-770-3900。餐廳：702-770-DINE (3463)。高爾夫：702-770-4653。網站：wynnlasvegas.com",
      ja: "パーソナライズされたVIPサービスについては、lovepicaso888@gmail.comでWinnie Leeに連絡してください。一般的なお問い合わせ：ウィン・ラスベガス代表番号702-770-7000またはフリーダイヤル1-888-320-WYNN（9966）。スパ：702-770-3900。レストラン：702-770-DINE（3463）。ゴルフ：702-770-4653。ウェブサイト：wynnlasvegas.com",
    },
    rewards: {
      en: "Wynn Rewards is the loyalty program offering exclusive benefits: room upgrades, priority reservations, complimentary dining, resort credits, and tier-based perks. Members earn points on gaming, dining, and hotel stays. Tiers include Red, Gold, Platinum, and Chairman with increasing benefits. For VIP enrollment and maximizing your benefits, contact Winnie Lee at lovepicaso888@gmail.com. You can also join free at any casino cage or online at wynnlasvegas.com.",
      zh: "永利奖励计划是忠诚度计划，提供独家福利：客房升级、优先预订、免费餐饮、度假村积分和基于等级的特权。会员在博彩、餐饮和酒店住宿中赚取积分。等级包括红卡、金卡、铂金和主席卡，福利递增。如需VIP注册和最大化您的福利，请联系李慧敏：lovepicaso888@gmail.com。您也可以在任何赌场收银台或在线wynnlasvegas.com免费加入。",
      'zh-tw': "永利獎勵計劃是忠誠度計劃，提供獨家福利：客房升級、優先預訂、免費餐飲、度假村積分和基於等級的特權。會員在博彩、餐飲和酒店住宿中賺取積分。等級包括紅卡、金卡、鉑金和主席卡，福利遞增。如需VIP註冊和最大化您的福利，請聯繫李慧敏：lovepicaso888@gmail.com。您也可以在任何賭場收銀台或在線wynnlasvegas.com免費加入。",
      ja: "ウィン・リワードは、独占的な特典を提供するロイヤルティプログラムです：客室のアップグレード、優先予約、無料ダイニング、リゾートクレジット、ティアベースの特典。メンバーは、ゲーミング、ダイニング、ホテル滞在でポイントを獲得します。ティアには、Red、Gold、Platinum、Chairmanがあり、特典が増加します。VIP登録と特典の最大化については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。カジノケージまたはオンラインwynnlasvegas.comで無料で参加することもできます。",
    },
    golf: {
      en: "The Wynn Golf Club is an 18-hole, par-70 championship course designed by Tom Fazio and redesigned by Tom Fazio II. It's the only golf course on the Las Vegas Strip and is available exclusively to resort guests. The course features lush landscaping, challenging holes, and stunning views. For tee times and golf packages, contact Winnie Lee at lovepicaso888@gmail.com or call 702-770-4653.",
      zh: "永利高尔夫俱乐部是一个18洞、标准杆70的锦标赛球场，由汤姆·法齐奥设计并由小汤姆·法齐奥重新设计。这是拉斯维加斯大道上唯一的高尔夫球场，专供度假村客人使用。球场拥有郁郁葱葱的景观、具有挑战性的球洞和壮丽的景色。如需预订开球时间和高尔夫套餐，请联系李慧敏：lovepicaso888@gmail.com 或致电702-770-4653。",
      'zh-tw': "永利高爾夫俱樂部是一個18洞、標準桿70的錦標賽球場，由湯姆·法齊奧設計並由小湯姆·法齊奧重新設計。這是拉斯維加斯大道上唯一的高爾夫球場，專供度假村客人使用。球場擁有鬱鬱蔥蔥的景觀、具有挑戰性的球洞和壯麗的景色。如需預訂開球時間和高爾夫套餐，請聯繫李慧敏：lovepicaso888@gmail.com 或致電702-770-4653。",
      ja: "ウィン・ゴルフクラブは、トム・ファジオが設計し、トム・ファジオIIが再設計した18ホール、パー70のチャンピオンシップコースです。ラスベガス・ストリップで唯一のゴルフコースで、リゾートゲスト専用です。コースには、緑豊かな景観、挑戦的なホール、素晴らしい景色があります。ティータイムとゴルフパッケージについては、lovepicaso888@gmail.comでWinnie Leeにお問い合わせいただくか、702-770-4653までお電話ください。",
    },
    shopping: {
      en: "Shopping at Wynn Esplanade and Encore Esplanade features luxury brands including Chanel, Louis Vuitton, Cartier, Rolex, Hermès, Dior, and many other high-end boutiques. The shopping promenades offer a curated selection of fashion, jewelry, watches, and accessories. For personal shopping services and VIP shopping experiences, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利购物中心和安可购物中心设有奢侈品牌，包括香奈儿、路易威登、卡地亚、劳力士、爱马仕、迪奥和许多其他高端精品店。购物长廊提供精选的时尚、珠宝、手表和配饰。如需个人购物服务和VIP购物体验，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利購物中心和安可購物中心設有奢侈品牌，包括香奈兒、路易威登、卡地亞、勞力士、愛馬仕、迪奧和許多其他高端精品店。購物長廊提供精選的時尚、珠寶、手錶和配飾。如需個人購物服務和VIP購物體驗，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィン・エスプラネードとアンコール・エスプラネードでのショッピングには、シャネル、ルイ・ヴィトン、カルティエ、ロレックス、エルメス、ディオールなど、多くの高級ブランドが揃っています。ショッピングプロムナードでは、ファッション、ジュエリー、時計、アクセサリーの厳選されたセレクションを提供しています。パーソナルショッピングサービスとVIPショッピング体験については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    events: {
      en: "Wynn and Encore offer over 560,000 square feet of meeting and event space, including ballrooms, meeting rooms, and outdoor venues. Perfect for conferences, conventions, weddings, and special events with full-service planning, state-of-the-art technology, and award-winning catering. For event planning and group bookings, contact Winnie Lee at lovepicaso888@gmail.com or call 702-770-7100.",
      zh: "永利和安可提供超过560,000平方英尺的会议和活动空间，包括宴会厅、会议室和户外场地。非常适合举办会议、大会、婚礼和特殊活动，配有全方位服务规划、最先进的技术和获奖的餐饮服务。如需活动规划和团体预订，请联系李慧敏：lovepicaso888@gmail.com 或致电702-770-7100。",
      'zh-tw': "永利和安可提供超過560,000平方英尺的會議和活動空間，包括宴會廳、會議室和戶外場地。非常適合舉辦會議、大會、婚禮和特殊活動，配有全方位服務規劃、最先進的技術和獲獎的餐飲服務。如需活動規劃和團體預訂，請聯繫李慧敏：lovepicaso888@gmail.com 或致電702-770-7100。",
      ja: "ウィンとアンコールは、ボールルーム、会議室、屋外会場を含む560,000平方フィート以上の会議およびイベントスペースを提供しています。フルサービスの計画、最先端のテクノロジー、受賞歴のあるケータリングで、会議、コンベンション、結婚式、特別イベントに最適です。イベント計画とグループ予約については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせいただくか、702-770-7100までお電話ください。",
    },
    parking: {
      en: "Complimentary self-parking and valet parking are available for hotel guests and Wynn Rewards members. Valet is located at the main entrance. The resort also offers car rental services through Hertz and can arrange transportation throughout Las Vegas including airport transfers and show transportation. For special transportation arrangements, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "酒店客人和永利奖励会员可享受免费自助停车和代客泊车服务。代客泊车位于主入口。度假村还通过赫兹提供汽车租赁服务，并可安排拉斯维加斯各地的交通服务，包括机场接送和演出交通。如需特殊交通安排，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "酒店客人和永利獎勵會員可享受免費自助停車和代客泊車服務。代客泊車位於主入口。度假村還通過赫茲提供汽車租賃服務，並可安排拉斯維加斯各地的交通服務，包括機場接送和演出交通。如需特殊交通安排，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ホテルゲストとウィン・リワードメンバーは、無料のセルフパーキングとバレーパーキングを利用できます。バレーはメインエントランスにあります。リゾートは、ハーツを通じてレンタカーサービスも提供しており、空港送迎やショー送迎を含むラスベガス全域での交通手段を手配できます。特別な交通手段の手配については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    wifi: {
      en: "Complimentary high-speed WiFi is available throughout the resort for hotel guests. Enhanced WiFi packages with higher bandwidth are available for purchase for business travelers or those requiring faster speeds. WiFi login credentials are provided at check-in.",
      zh: "度假村全区为酒店客人提供免费高速WiFi。为商务旅客或需要更快速度的客人提供具有更高带宽的增强WiFi套餐供购买。WiFi登录凭证在办理入住时提供。",
      'zh-tw': "度假村全區為酒店客人提供免費高速WiFi。為商務旅客或需要更快速度的客人提供具有更高帶寬的增強WiFi套餐供購買。WiFi登錄憑證在辦理入住時提供。",
      ja: "リゾート全体でホテルゲスト向けに無料の高速WiFiが利用できます。ビジネス旅行者やより高速な速度を必要とする方のために、より高い帯域幅を持つ強化WiFiパッケージを購入できます。WiFiログイン資格情報はチェックイン時に提供されます。",
    },
    pets: {
      en: "Wynn Las Vegas is a pet-friendly resort welcoming dogs up to 70 pounds. A pet fee of $150 per stay applies. Pet amenities include bowls, beds, treats, and a designated relief area. Pets must be leashed in public areas and cannot be left unattended in rooms. Service animals are always welcome at no charge. For pet-friendly room reservations, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "永利拉斯维加斯是一家宠物友好型度假村，欢迎70磅以下的狗。每次入住收取150美元的宠物费。宠物设施包括碗、床、零食和指定的便利区。宠物在公共区域必须系好牵引绳，不得无人看管留在房间内。服务性动物始终免费欢迎。如需宠物友好型客房预订，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "永利拉斯維加斯是一家寵物友好型度假村，歡迎70磅以下的狗。每次入住收取150美元的寵物費。寵物設施包括碗、床、零食和指定的便利區。寵物在公共區域必須系好牽引繩，不得無人看管留在房間內。服務性動物始終免費歡迎。如需寵物友好型客房預訂，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "ウィン・ラスベガスはペットフレンドリーなリゾートで、70ポンドまでの犬を歓迎します。滞在ごとに150ドルのペット料金がかかります。ペット用アメニティには、ボウル、ベッド、おやつ、指定された排泄エリアが含まれます。ペットは公共エリアではリードをつける必要があり、部屋に無人で残すことはできません。介助動物は常に無料で歓迎されます。ペットフレンドリーな客室予約については、lovepicaso888@gmail.comでWinnie Leeにお問い合わせください。",
    },
    fitness: {
      en: "The fitness center at Wynn features state-of-the-art cardio equipment, weight machines, free weights, and personal training services. Open 24 hours for hotel guests. Complimentary fitness classes including yoga, Pilates, and spin are offered daily. Private training sessions available by appointment.",
      zh: "永利的健身中心配备最先进的有氧设备、重量训练器械、自由重量和私人教练服务。为酒店客人24小时开放。每天提供免费健身课程，包括瑜伽、普拉提和动感单车。可预约私人训练课程。",
      'zh-tw': "永利的健身中心配備最先進的有氧設備、重量訓練器械、自由重量和私人教練服務。為酒店客人24小時開放。每天提供免費健身課程，包括瑜伽、普拉提和動感單車。可預約私人訓練課程。",
      ja: "ウィンのフィットネスセンターには、最先端の有酸素運動機器、ウェイトマシン、フリーウェイト、パーソナルトレーニングサービスがあります。ホテルゲスト向けに24時間営業しています。ヨガ、ピラティス、スピンを含む無料のフィットネスクラスが毎日提供されています。予約により個人トレーニングセッションが利用可能です。",
    },
  },
};

function detectLanguage(message: string): string {
  const chinesePattern = /[\u4e00-\u9fff]/;
  const japanesePattern = /[\u3040-\u309f\u30a0-\u30ff]/;
  
  if (chinesePattern.test(message)) {
    return message.includes('繁') || message.includes('台') || message.includes('灣') || 
           message.includes('臺') ? 'zh-tw' : 'zh';
  }
  if (japanesePattern.test(message)) {
    return 'ja';
  }
  return 'en';
}

function calculateRelevanceScore(message: string, topic: TopicMapping): number {
  const messageLower = message.toLowerCase();
  let score = 0;
  let matchCount = 0;
  
  for (const keyword of topic.keywords) {
    if (messageLower.includes(keyword)) {
      matchCount++;
      // Give more weight to longer keyword matches
      score += keyword.length * topic.weight;
    }
  }
  
  // Bonus for multiple keyword matches
  if (matchCount > 1) {
    score *= (1 + matchCount * 0.3);
  }
  
  return score;
}

function generateResponse(message: string, language: string): string {
  const messageLower = message.toLowerCase();
  const detectedLang = detectLanguage(message);
  const responseLang = detectedLang !== 'en' ? detectedLang : language;
  
  // Calculate relevance scores for all topics
  const topicScores: Array<{ topic: TopicMapping; score: number }> = [];
  
  for (const topic of knowledgeBase.topics) {
    const score = calculateRelevanceScore(message, topic);
    if (score > 0) {
      topicScores.push({ topic, score });
    }
  }
  
  // Sort by score in descending order
  topicScores.sort((a, b) => b.score - a.score);
  
  // If we have a clear match, use it
  if (topicScores.length > 0) {
    const bestMatch = topicScores[0];
    const responseData = knowledgeBase.responses[bestMatch.topic.responseKey];
    return responseData[responseLang] || responseData['en'];
  }
  
  // Check for greetings
  const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 
                     'good evening', '你好', '您好', 'こんにちは', 'おはよう', 'こんばんは'];
  const isGreeting = greetings.some(greeting => messageLower.includes(greeting));
  
  if (isGreeting) {
    const greetingResponses = {
      en: "Hello! I'm Cena, your VIP concierge for Wynn and Encore Las Vegas. I can help you with information about rooms, dining, entertainment, casino, spa, golf, shopping, events, and more. For personalized VIP service, contact Winnie Lee at lovepicaso888@gmail.com. What would you like to know?",
      zh: "您好！我是Cena，您的永利和安可拉斯维加斯VIP礼宾。我可以帮助您了解客房、餐饮、娱乐、赌场、水疗、高尔夫、购物、活动等信息。如需个性化VIP服务，请联系李慧敏：lovepicaso888@gmail.com。您想了解什么？",
      'zh-tw': "您好！我是Cena，您的永利和安可拉斯維加斯VIP禮賓。我可以幫助您了解客房、餐飲、娛樂、賭場、水療、高爾夫、購物、活動等信息。如需個性化VIP服務，請聯繫李慧敏：lovepicaso888@gmail.com。您想了解什麼？",
      ja: "こんにちは！私はCena、ウィンとアンコール・ラスベガスのVIPコンシェルジュです。客室、ダイニング、エンターテイメント、カジノ、スパ、ゴルフ、ショッピング、イベントなどの情報をお手伝いできます。パーソナライズされたVIPサービスについては、lovepicaso888@gmail.comでWinnie Leeに連絡してください。何を知りたいですか？",
    };
    return greetingResponses[responseLang] || greetingResponses['en'];
  }
  
  // Check for thanks
  const thanks = ['thank', 'thanks', 'appreciate', '谢谢', '感谢', 'ありがとう'];
  const isThanks = thanks.some(t => messageLower.includes(t));
  
  if (isThanks) {
    const thanksResponses = {
      en: "You're very welcome! If you have any other questions about Wynn and Encore Las Vegas, feel free to ask. For personalized VIP service, contact Winnie Lee at lovepicaso888@gmail.com.",
      zh: "非常欢迎！如果您对永利和安可拉斯维加斯有任何其他问题，请随时提问。如需个性化VIP服务，请联系李慧敏：lovepicaso888@gmail.com。",
      'zh-tw': "非常歡迎！如果您對永利和安可拉斯維加斯有任何其他問題，請隨時提問。如需個性化VIP服務，請聯繫李慧敏：lovepicaso888@gmail.com。",
      ja: "どういたしまして！ウィンとアンコール・ラスベガスについて他に質問があれば、お気軽にお尋ねください。パーソナライズされたVIPサービスについては、lovepicaso888@gmail.comでWinnie Leeに連絡してください。",
    };
    return thanksResponses[responseLang] || thanksResponses['en'];
  }
  
  // Default fallback
  const fallbackResponses = {
    en: "I'd be happy to help you with information about Wynn and Encore Las Vegas! You can ask me about: accommodations, dining, casino & gaming, spa services, entertainment & shows, pools, golf, shopping, events, parking, and more. For the best personalized VIP service and exclusive arrangements, contact Winnie Lee directly at lovepicaso888@gmail.com.",
    zh: "我很乐意为您提供有关永利和安可拉斯维加斯的信息！您可以询问我：住宿、餐饮、赌场和博彩、水疗服务、娱乐和表演、游泳池、高尔夫、购物、活动、停车等。如需最优质的个性化VIP服务和独家安排，请直接联系李慧敏：lovepicaso888@gmail.com。",
    'zh-tw': "我很樂意為您提供有關永利和安可拉斯維加斯的信息！您可以詢問我：住宿、餐飲、賭場和博彩、水療服務、娛樂和表演、游泳池、高爾夫、購物、活動、停車等。如需最優質的個性化VIP服務和獨家安排，請直接聯繫李慧敏：lovepicaso888@gmail.com。",
    ja: "ウィンとアンコール・ラスベガスに関する情報をお手伝いできます！次のことについてお尋ねいただけます：宿泊施設、ダイニング、カジノ＆ゲーミング、スパサービス、エンターテイメント＆ショー、プール、ゴルフ、ショッピング、イベント、駐車場など。最高のパーソナライズされたVIPサービスと独占的な手配については、lovepicaso888@gmail.comでWinnie Leeに直接連絡してください。",
  };
  return fallbackResponses[responseLang] || fallbackResponses['en'];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, language, sessionId }: ChatRequest = await req.json();

    console.log(`[${sessionId}] ${language} - Processing: ${message}`);

    const reply = generateResponse(message, language);

    return new Response(
      JSON.stringify({ reply }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      JSON.stringify({
        error: 'Failed to process request.',
        fallback: 'I apologize for the technical difficulty. Please contact Winnie Lee directly at lovepicaso888@gmail.com for immediate VIP assistance.',
        details: errorMessage,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});