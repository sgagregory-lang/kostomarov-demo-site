/* Демо-каталог прототипа v4 (тестовое наполнение: реальные модели и партномера по открытым источникам, см. sources.md).
   ВНИМАНИЕ: статусы наличия и состояния — демонстрационные (для макета), без реальных остатков.
   Цены: демо-цены «от … ₽ с НДС на 27.11.2026», не оферта. price_source = "market" (нижняя найденная рыночная цена того же партномера, ссылка в price_ref)
   или "estimate" (оценка; основание в price_basis). Финальные цены и наличие заполняются из прайса заказчика. */
window.CATALOG = (function () {
  var CONDITIONS = {
    "new": { label: "Новое", def: "Оборудование, не бывшее в эксплуатации, в заводской комплектации.", note: "" },
    "factory": { label: "Factory Refurbished", def: "Восстановлено производителем.",
      note: "Статус указывается только при наличии документального подтверждения вендора." },
    "seller": { label: "Seller Refurbished", def: "Восстановлено и протестировано поставщиком: чистка, замена изношенных узлов, нагрузочное тестирование. Условия гарантии продавца фиксируются в договоре.",
      note: "Гарантия производителя не обещается." },
    "used": { label: "Б/у", def: "Бывшее в эксплуатации, проверено на базовую работоспособность, состояние описывается явно.",
      note: "Гарантия производителя не обещается; состояние описывается явно." }
  };
  CONDITIONS["tbd"] = { label: "Состояние — в КП", def: "Состояние и комплектация уточняются в коммерческом предложении.", note: "" };
  var CONDITION_ORDER = ["new", "factory", "seller", "used"];
  var AVAILABILITY = {
    "in_stock": { label: "В наличии", long: "В наличии (демо-статус для макета)" },
    "on_order": { label: "Под заказ, срок по запросу", long: "Под заказ, срок по запросу" }
  };
  var CATEGORIES = {
    "servers": { label: "Серверы", h1: "Серверы для интеграторов и ЦОД" },
    "storage": { label: "СХД", h1: "Системы хранения данных (СХД)" },
    "network": { label: "Сеть и оптика", h1: "Сетевое оборудование ЦОД и оптика" },
    "components": { label: "Комплектующие и ЗИП", h1: "Комплектующие и ЗИП для серверов и сети" }
  };
  var CATEGORY_ORDER = ["servers", "storage", "network", "components"];
  var FORM_ORDER = { "1U": 1, "2U": 2, "Модуль": 3 };
  var PRICE_DATE = "2026-11-27";
  function P(o) {
    o.price_amount = null; o.currency = "RUB"; o.vat_rate = 22; o.vat_included = true; o.price_date = PRICE_DATE; o.price_source = null; o.stock_qty = null; o.is_price_published = true;
    o.demo = true;
    o.title = o.type + " " + o.brand + " " + o.model;
    o.h1 = o.title + " (" + o.sku + ")";
    return o;
  }
  var I = "assets/img/";
  var PRODUCTS = [
    P({ id: "dell-r650", n: 1, category: "servers", vendor: "Dell", type: "Сервер", brand: "Dell", model: "PowerEdge R650",
      sku: "DELL-R650 (CTO)", condition: "seller", availability: "in_stock", form: "1U", img: I + "server-1u-compute.svg", thumb: I + "server-1u-compute.svg",
      specs: [["Форм-фактор", "1U Rack, 2 сокета"], ["Процессоры", "До 2× Intel Xeon Scalable 3-го поколения"], ["Память", "32 слота DDR4, RDIMM до 2 ТБ / LRDIMM до 8 ТБ, до 3200 MT/s"], ["Отсеки накопителей", "До 10×2.5\" SAS/SATA/NVMe или до 4×3.5\" (по конфигурации)"], ["Управление", "iDRAC9"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "dell-r750", n: 2, category: "servers", vendor: "Dell", type: "Сервер", brand: "Dell", model: "PowerEdge R750",
      sku: "DELL-R750 (CTO)", condition: "factory", availability: "in_stock", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack, 2 сокета"], ["Процессоры", "До 2× Intel Xeon Scalable 3-го поколения"], ["Память", "32 слота DDR4, RDIMM до 2 ТБ / LRDIMM до 8 ТБ, до 3200 MT/s"], ["Отсеки накопителей", "До 12×3.5\" SAS/SATA или до 24×2.5\" SAS/SATA/NVMe"], ["RAID/HBA", "PERC H745 / H755 / H755N, HBA355i (по конфигурации)"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] }),
    P({ id: "dell-r660", n: 3, category: "servers", vendor: "Dell", type: "Сервер", brand: "Dell", model: "PowerEdge R660",
      sku: "DELL-R660 (CTO)", condition: "new", availability: "on_order", form: "1U", img: I + "server-1u-compute.svg", thumb: I + "server-1u-compute.svg",
      specs: [["Форм-фактор", "1U Rack, 2 сокета"], ["Процессоры", "До 2× Intel Xeon Scalable 4-го или 5-го поколения (до 56 / 64 ядер)"], ["Память", "32 слота DDR5 RDIMM, до 8 ТБ, до 4800 MT/s (до 5600 MT/s с 5-м поколением)"], ["Отсеки накопителей", "До 10×2.5\" SAS/SATA/NVMe или 14/16×E3.S"], ["Блоки питания", "2× Hot-Swap, от 700 Вт до 1800 Вт (по конфигурации)"], ["Управление", "iDRAC9"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"]] }),
    P({ id: "dell-r760", n: 4, category: "servers", vendor: "Dell", type: "Сервер", brand: "Dell", model: "PowerEdge R760",
      sku: "DELL-R760 (CTO)", condition: "new", availability: "in_stock", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack, 2 сокета"], ["Процессоры", "До 2× Intel Xeon Scalable 4-го или 5-го поколения (до 56 / 64 ядер)"], ["Память", "32 слота DDR5 RDIMM, до 8 ТБ"], ["Отсеки накопителей", "До 12×3.5\" SAS/SATA или до 24×2.5\" SAS/SATA/NVMe, 16×E3.S"], ["RAID/HBA", "PERC H965i / H755 / H755N / H355, HBA355i (по конфигурации)"], ["Управление", "iDRAC9"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"]] }),
    P({ id: "dell-r740xd", n: 5, category: "servers", vendor: "Dell", type: "Сервер", brand: "Dell", model: "PowerEdge R740xd",
      sku: "DELL-R740XD (CTO)", condition: "used", availability: "in_stock", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack, 2 сокета"], ["Процессоры", "До 2× Intel Xeon Scalable 1-го / 2-го поколения"], ["Память", "24 слота DDR4, до 3 ТБ"], ["Отсеки накопителей", "До 32 накопителей SAS/SATA или до 24 NVMe (по конфигурации)"], ["Управление", "iDRAC9"], ["Размеры", "86,8 × 434,0 × 715,5 мм"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"]] }),
    P({ id: "hpe-dl360-gen11", n: 6, category: "servers", vendor: "HPE", type: "Сервер", brand: "HPE", model: "ProLiant DL360 Gen11 4410Y 8SFF",
      sku: "P51930-B21", condition: "new", availability: "in_stock", form: "1U", img: I + "server-1u-compute.svg", thumb: I + "server-1u-compute.svg",
      specs: [["Форм-фактор", "1U Rack"], ["Процессор", "1× Intel Xeon Silver 4410Y, 12 ядер, 2,0 ГГц, 150 Вт (до 2 сокетов)"], ["Память", "32 ГБ DDR5 (1×32 ГБ) в комплекте, до 8 ТБ"], ["Отсеки накопителей", "8× SFF (накопители не входят в комплект)"], ["Контроллер", "HPE MR408i-o, кэш 4 ГБ"], ["Сеть / управление", "OCP3 1GbE 4 порта (BCM5719) / iLO 6"], ["Блок питания", "1× 800 Вт Flex Slot Platinum"]] }),
    P({ id: "hpe-dl380-gen11", n: 7, category: "servers", vendor: "HPE", type: "Сервер", brand: "HPE", model: "ProLiant DL380 Gen11 4410Y 8SFF",
      sku: "P52560-421", condition: "new", availability: "on_order", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack"], ["Процессор", "1× Intel Xeon Silver 4410Y, 12 ядер, 2,0 ГГц, 150 Вт (до 2 сокетов)"], ["Память", "32 ГБ DDR5 (1×32 ГБ) в комплекте, до 8 ТБ"], ["Отсеки накопителей", "8× SFF (накопители не входят в комплект)"], ["Контроллер", "HPE MR408i-o, кэш 4 ГБ"], ["Сеть / управление", "OCP3 1GbE 4 порта / iLO 6"], ["Блок питания", "1× 1000 Вт Flex Slot Titanium"]] }),
    P({ id: "hpe-dl380-gen10", n: 8, category: "servers", vendor: "HPE", type: "Сервер", brand: "HPE", model: "ProLiant DL380 Gen10 8SFF CTO",
      sku: "868703-B21", condition: "factory", availability: "on_order", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack (шасси CTO, процессор не входит)"], ["Процессоры", "Intel Xeon Scalable 1-го / 2-го поколения (до 2 сокетов)"], ["Память", "24 слота DDR4"], ["Отсеки накопителей", "8× SFF (расширение до 24 SFF)"], ["Управление", "HPE iLO 5"], ["Сеть", "4×1GbE 331i + опциональные FlexibleLOM / PCIe"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] }),
    P({ id: "lenovo-sr630-v2", n: 9, category: "servers", vendor: "Lenovo", type: "Сервер", brand: "Lenovo", model: "ThinkSystem SR630 V2",
      sku: "7Z71", condition: "used", availability: "in_stock", form: "1U", img: I + "server-1u-compute.svg", thumb: I + "server-1u-compute.svg",
      specs: [["Форм-фактор", "1U Rack; тип машины 7Z71"], ["Процессоры", "1–2× Intel Xeon Scalable 3-го поколения, до 40 ядер, до 270 Вт"], ["Память", "32 слота TruDDR4, до 8 ТБ (RDIMM / 3DS RDIMM)"], ["Отсеки накопителей", "До 12×2.5\" или 4×3.5\" или 16×EDSFF E1.S (по конфигурации)"], ["Управление", "Lenovo XClarity Controller"], ["Чипсет", "Intel C621A"], ["Проверка", "Базовая проверка работоспособности; состояние описывается явно"]] }),
    P({ id: "lenovo-sr650-v2", n: 10, category: "servers", vendor: "Lenovo", type: "Сервер", brand: "Lenovo", model: "ThinkSystem SR650 V2",
      sku: "7Z73", condition: "seller", availability: "in_stock", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack; тип машины 7Z73"], ["Процессоры", "1–2× Intel Xeon Scalable 3-го поколения, до 40 ядер, до 270 Вт"], ["Память", "32 слота TruDDR4, до 8 ТБ"], ["Отсеки накопителей", "До 20×3.5\" или до 40×2.5\" (по конфигурации)"], ["RAID/HBA", "12 Гбит/с SAS/SATA, кэш до 8 ГБ, PCIe 3.0 / 4.0"], ["Управление", "Lenovo XClarity Controller"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "lenovo-sr650-v3", n: 11, category: "servers", vendor: "Lenovo", type: "Сервер", brand: "Lenovo", model: "ThinkSystem SR650 V3",
      sku: "7D76", condition: "new", availability: "on_order", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack; тип машины 7D76"], ["Процессоры", "1–2× Intel Xeon Scalable 4-го или 5-го поколения, до 64 ядер, до 385 Вт"], ["Память", "32 слота TruDDR5, до 8 ТБ, до 5600 МГц (1 DPC)"], ["Отсеки накопителей", "До 20×3.5\" или до 40×2.5\" (по конфигурации)"], ["Чипсет", "Intel C741"], ["Управление", "Lenovo XClarity Controller"]] }),
    P({ id: "xfusion-1288h-v6", n: 12, category: "servers", vendor: "xFusion", type: "Сервер", brand: "xFusion", model: "FusionServer 1288H V6",
      sku: "XF-1288H-V6 (BOM по конфигурации)", condition: "seller", availability: "in_stock", form: "1U", img: I + "server-1u-compute.svg", thumb: I + "server-1u-compute.svg",
      specs: [["Форм-фактор", "1U Rack, 1–2 сокета"], ["Процессоры", "Intel Xeon Scalable 3-го поколения (Ice Lake), до 270 Вт"], ["Память", "32 слота DDR4 ECC до 3200 MT/s, до 8 ТБ; опционально 16× Optane PMem"], ["Отсеки накопителей", "4×3.5\" или 10×2.5\" SAS/SATA/NVMe, 2× M.2 для загрузки"], ["Слоты расширения", "До 6× PCIe, 2× OCP 3.0 FlexIO"], ["Питание", "1+1 Hot-Swap; вентиляторы N+1"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "xfusion-2288h-v6", n: 13, category: "servers", vendor: "xFusion", type: "Сервер", brand: "xFusion", model: "FusionServer 2288H V6",
      sku: "XF-2288H-V6 (BOM по конфигурации)", condition: "new", availability: "in_stock", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack, 1–2 сокета (86,1 × 447 × 790 мм)"], ["Процессоры", "Intel Xeon Scalable 3-го поколения (Ice Lake), до 270 Вт"], ["Память", "32 слота DDR4 ECC до 3200 MT/s, до 8 ТБ"], ["Отсеки накопителей", "До 45×2.5\" или до 34 NVMe полной высоты"], ["Слоты расширения", "До 14× PCIe 4.0"], ["Управление", "iBMC"]] }),
    P({ id: "xfusion-2288h-v7", n: 14, category: "servers", vendor: "xFusion", type: "Сервер", brand: "xFusion", model: "FusionServer 2288H V7",
      sku: "XF-2288H-V7 (BOM по конфигурации)", condition: "new", availability: "on_order", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack, 2 сокета (86,1 × 447 × 798 мм)"], ["Процессоры", "Intel Xeon Scalable 4-го / 5-го поколения, до 385 Вт"], ["Память", "До 32 слотов DDR5 до 5600 MT/s, до 8 ТБ"], ["Отсеки накопителей", "До 45×2.5\" или до 28 NVMe SSD"], ["Слоты расширения", "До 17 PCIe (8 из них PCIe 5.0), 2× OCP 3.0"], ["Питание", "1+1 Hot-Swap, от 900 до 3000 Вт"]] }),
    P({ id: "smc-sys-221h-tnr", n: 15, category: "servers", vendor: "Supermicro", type: "Сервер", brand: "Supermicro", model: "SuperServer SYS-221H-TNR (Hyper)",
      sku: "SYS-221H-TNR", condition: "new", availability: "in_stock", form: "2U", img: I + "server-2u-nvme.svg", thumb: I + "server-2u-nvme.svg",
      specs: [["Форм-фактор", "2U Rack, 2 сокета LGA-4677 (437 × 88,9 × 760 мм)"], ["Процессоры", "Intel Xeon Scalable 4-го / 5-го поколения, до 64 ядер, до 350 Вт"], ["Память", "32 слота DDR5, до 8 ТБ"], ["Отсеки накопителей", "8× 2.5\" hot-swap (опционально 16), 2× M.2"], ["Слоты расширения", "4× PCIe 5.0 x16 или 8× x8, 2× OCP 3.0 AIOM"], ["Питание", "2× 1200 Вт Titanium, резервирование"]] }),
    P({ id: "smc-sys-121h-tnr", n: 16, category: "servers", vendor: "Supermicro", type: "Сервер", brand: "Supermicro", model: "SuperServer SYS-121H-TNR (Hyper)",
      sku: "SYS-121H-TNR", condition: "seller", availability: "in_stock", form: "1U", img: I + "server-1u-compute.svg", thumb: I + "server-1u-compute.svg",
      specs: [["Форм-фактор", "1U Rack, 2 сокета LGA-4677 (437 × 43 × 747 мм)"], ["Процессоры", "Intel Xeon Scalable 4-го / 5-го поколения"], ["Память", "32 слота DDR5, до 4 ТБ (5600 MT/s, 1 DPC) / 8 ТБ (4400 MT/s, 2 DPC)"], ["Отсеки накопителей", "8× 2.5\" hot-swap (вариант на 12)"], ["Слоты расширения", "3× PCIe 5.0 x16 + 1× OCP 3.0 AIOM"], ["Питание", "2× 1200 Вт Titanium, резервирование"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "dell-powerstore-1200t", n: 17, category: "storage", vendor: "Dell", type: "СХД", brand: "Dell", model: "PowerStore 1200T",
      sku: "DELL-POWERSTORE-1200T", condition: "new", availability: "on_order", form: "2U", img: I + "storage-allflash.svg", thumb: I + "storage-allflash.svg",
      specs: [["Форм-фактор", "2U, два узла Active/Active"], ["Тип", "All-NVMe"], ["Накопители", "21 доступный слот 2.5\" NVMe + 2 NVRAM; до 3 полок ENS24"], ["Ёмкость (макс.)", "До 93 накопителей, до 5,90 ПБe на массив"], ["Интерфейсы хоста", "25/10GbE (4 порта) на модуле; опции 2×100GbE, 4×25/10GbE, 4×32/16G FC"], ["Память", "384 ГБ DRAM"]] }),
    P({ id: "dell-me5024", n: 18, category: "storage", vendor: "Dell", type: "СХД", brand: "Dell", model: "PowerVault ME5024",
      sku: "DELL-ME5024", condition: "seller", availability: "in_stock", form: "2U", img: I + "storage-allflash.svg", thumb: I + "storage-allflash.svg",
      specs: [["Форм-фактор", "2U"], ["Тип", "Гибридная СХД (SAS/SSD)"], ["Контроллеры", "1–2 контроллера, режим Active/Active"], ["Отсеки накопителей", "24×2.5\""], ["Интерфейсы хоста", "По 4 порта на контроллер: FC 16/32G, iSCSI 10/25G, 10GBASE-T или SAS 12G"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "dell-me5012", n: 19, category: "storage", vendor: "Dell", type: "СХД", brand: "Dell", model: "PowerVault ME5012",
      sku: "DELL-ME5012", condition: "used", availability: "in_stock", form: "2U", img: I + "storage-allflash.svg", thumb: I + "storage-allflash.svg",
      specs: [["Форм-фактор", "2U"], ["Тип", "Гибридная СХД (SAS/NL-SAS)"], ["Контроллеры", "2 контроллера Hot-Swap, Active/Active"], ["Отсеки накопителей", "12×3.5\" (поддерживаются салазки 2.5\")"], ["Расширение", "Полки ME412 по SAS 12G, до 264 накопителей"], ["Проверка", "Базовая проверка работоспособности; состояние описывается явно"]] }),
    P({ id: "hpe-msa-2060-fc", n: 20, category: "storage", vendor: "HPE", type: "СХД", brand: "HPE", model: "MSA 2060 16Gb FC SFF",
      sku: "R0Q74A", condition: "factory", availability: "on_order", form: "2U", img: I + "storage-allflash.svg", thumb: I + "storage-allflash.svg",
      specs: [["Форм-фактор", "2U, SFF"], ["Тип", "Гибридная СХД начального уровня"], ["Контроллеры", "2 контроллера, по 4 порта 16Gb Fibre Channel"], ["Отсеки накопителей", "До 24 SFF на массив"], ["Примечание по SKU", "Более новая замена по линейке — R0Q74B"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] }),
    P({ id: "huawei-dorado-3000-v6", n: 21, category: "storage", vendor: "Huawei", type: "СХД", brand: "Huawei", model: "OceanStor Dorado 3000 V6",
      sku: "HW-DORADO3000-V6", condition: "new", availability: "on_order", form: "2U", img: I + "storage-allflash.svg", thumb: I + "storage-allflash.svg",
      specs: [["Форм-фактор", "2U контроллерная полка (SAS или NVMe, до 30 / 32 кг)"], ["Тип", "All-Flash"], ["Контроллеры", "2 в полке; 6 слотов модулей ввода-вывода Hot-Swap"], ["Интерфейсы хоста", "До 40 фронтенд-портов на полку"], ["Бэкенд", "SAS 3.0 (SAS) / 100 Гбит/с RDMA (NVMe)"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"]] }),
    P({ id: "huawei-dorado-5000-v6", n: 22, category: "storage", vendor: "Huawei", type: "СХД", brand: "Huawei", model: "OceanStor Dorado 5000 V6",
      sku: "HW-DORADO5000-V6", condition: "new", availability: "on_order", form: "2U", img: I + "storage-allflash.svg", thumb: I + "storage-allflash.svg",
      specs: [["Форм-фактор", "2U контроллерная полка (86,1 × 447 × 920 мм)"], ["Тип", "All-Flash (NVMe)"], ["Контроллеры", "2 в полке; масштабирование до 32 контроллеров"], ["Кэш", "От 256 ГБ до 8 ТБ"], ["Интерфейсы хоста", "До 12 модулей ввода-вывода, до 48 портов на полку; FC, iSCSI, NFS, CIFS, NVMe over FC / RoCE"], ["Партномер конфигурации", "Формируется по ТЗ (конфигурируемая платформа)"]] }),
    P({ id: "cisco-n9k-93180yc-fx3", n: 23, category: "network", vendor: "Cisco", type: "Коммутатор ToR", brand: "Cisco", model: "Nexus 93180YC-FX3",
      sku: "N9K-C93180YC-FX3", condition: "factory", availability: "in_stock", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1RU"], ["Порты доступа", "48× SFP28 (1/10/25GbE)"], ["Uplink", "6× QSFP28 (40/100GbE)"], ["Роль", "ToR / leaf в фабрике ЦОД"], ["Режимы ПО", "NX-OS / ACI (зависит от лицензии)"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] }),
    P({ id: "cisco-n9k-9336c-fx2", n: 24, category: "network", vendor: "Cisco", type: "Коммутатор spine/leaf", brand: "Cisco", model: "Nexus 9336C-FX2",
      sku: "N9K-C9336C-FX2", condition: "seller", availability: "in_stock", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1RU"], ["Порты", "36× QSFP28 (40/100GbE)"], ["Режимы портов", "100G, 2×50G, 40G, 4×10/25G (breakout)"], ["Роль", "Spine / leaf в фабрике ЦОД"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "cisco-c9300-48p", n: 25, category: "network", vendor: "Cisco", type: "Коммутатор доступа", brand: "Cisco", model: "Catalyst 9300-48P (Network Essentials)",
      sku: "C9300-48P-E", condition: "factory", availability: "on_order", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1RU, стекируемый"], ["Порты", "48× 10/100/1000 RJ-45 PoE+"], ["Uplink", "Сменный сетевой модуль"], ["Питание", "БП 715 Вт AC, бюджет PoE по умолчанию 437 Вт"], ["Стекирование", "StackWise-480, до 8 коммутаторов"], ["Лицензия", "Network Essentials"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] }),
    P({ id: "cisco-c9200l-24t", n: 26, category: "network", vendor: "Cisco", type: "Коммутатор доступа", brand: "Cisco", model: "Catalyst 9200L-24T-4G (Network Essentials)",
      sku: "C9200L-24T-4G-E", condition: "used", availability: "in_stock", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1RU, стекируемый"], ["Порты", "24× 10/100/1000 RJ-45"], ["Uplink", "4× 1G SFP (фиксированные)"], ["Производительность", "56 Гбит/с, 41,67 Mpps"], ["Питание", "БП 125 Вт AC"], ["Лицензия", "Network Essentials"], ["Проверка", "Базовая проверка работоспособности; состояние описывается явно"]] }),
    P({ id: "huawei-ce6881", n: 27, category: "network", vendor: "Huawei", type: "Коммутатор ToR", brand: "Huawei", model: "CloudEngine CE6881-48S6CQ",
      sku: "CE6881-48S6CQ", condition: "new", availability: "on_order", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1U (442 × 420 × 43,6 мм)"], ["Порты доступа", "48× 10GE SFP+"], ["Uplink", "6× 40/100GE QSFP28"], ["Производительность", "2,16 Тбит/с, 940 Mpps, буфер 42 МБ"], ["Питание", "Типично 194 Вт (медь) / 240 Вт (оптика), макс. 349 Вт"]] }),
    P({ id: "huawei-ce6865", n: 28, category: "network", vendor: "Huawei", type: "Коммутатор ToR", brand: "Huawei", model: "CloudEngine CE6865-48S8CQ-EI",
      sku: "CE6865-48S8CQ-EI", condition: "seller", availability: "in_stock", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1U"], ["Порты доступа", "48× 10GE/25GE SFP28"], ["Uplink", "8× 40GE/100GE QSFP28 (разделение на 4×10GE / 25GE)"], ["Роль", "ToR / leaf в фабрике ЦОД"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "huawei-ce8850", n: 29, category: "network", vendor: "Huawei", type: "Коммутатор spine/leaf", brand: "Huawei", model: "CloudEngine CE8850-64CQ-EI",
      sku: "CE8850-64CQ-EI", condition: "new", availability: "on_order", form: "2U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "2U (86,1 мм), 442 × 600 мм"], ["Порты", "64× 40GE/100GE QSFP28 (разделение на 4×10GE / 25GE)"], ["Питание", "2 слота 1200 Вт, резервирование 1+1, Hot-Swap"], ["Охлаждение", "3 слота вентиляторов, 2+1, Hot-Swap"], ["Роль", "Spine / высокоплотный leaf"]] }),
    P({ id: "nvidia-sn2700", n: 30, category: "network", vendor: "NVIDIA", type: "Коммутатор spine/leaf", brand: "NVIDIA", model: "Spectrum SN2700 (Mellanox)",
      sku: "MSN2700-CS2F", condition: "seller", availability: "in_stock", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1U"], ["Порты", "32× QSFP28, до 100GbE (также 10/25/40/50/56GbE)"], ["Производительность", "6,4 Тбит/с, 4,76 Bpps, задержка 300 нс"], ["Буфер", "16 МБ общий"], ["ПО / питание", "Onyx, 2 БП AC, воздушный поток P2C"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "arista-7050sx3", n: 31, category: "network", vendor: "Arista", type: "Коммутатор ToR", brand: "Arista", model: "7050SX3-48YC8",
      sku: "DCS-7050SX3-48YC8", condition: "used", availability: "in_stock", form: "1U", img: I + "switch-tor-1u.svg", thumb: I + "switch-tor-1u.svg",
      specs: [["Форм-фактор", "1RU"], ["Порты доступа", "48× SFP28 (25GbE; также 10 / 1GbE)"], ["Uplink", "8× QSFP100 (100GbE / 40GbE)"], ["Производительность", "2 Тбит/с в одну сторону, задержка 800 нс, буфер 32 МБ"], ["Питание", "Типично 124 Вт / макс. 301 Вт"], ["Проверка", "Базовая проверка работоспособности; состояние описывается явно"]] }),
    P({ id: "cisco-sfp-10g-sr-s", n: 32, category: "network", vendor: "Cisco", type: "Трансивер", brand: "Cisco", model: "SFP+ 10GBASE-SR",
      sku: "SFP-10G-SR-S", condition: "new", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#qsfp", thumb: I + "component-psu-kit.svg#qsfp",
      specs: [["Форм-фактор", "SFP+"], ["Скорость", "10 Гбит/с, 10GBASE-SR"], ["Волокно", "Многомод, дуплекс LC, 850 нм"], ["Дальность", "до 300 м (OM3), до 400 м (OM4)"], ["Мощность", "1 Вт, рабочая температура 0–70 °C"]] }),
    P({ id: "cisco-sfp-25g-sr-s", n: 33, category: "network", vendor: "Cisco", type: "Трансивер", brand: "Cisco", model: "SFP28 25GBASE-SR",
      sku: "SFP-25G-SR-S", condition: "new", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#qsfp", thumb: I + "component-psu-kit.svg#qsfp",
      specs: [["Форм-фактор", "SFP28"], ["Скорость", "25 Гбит/с, 25GBASE-SR"], ["Волокно", "Многомод, дуплекс LC, 850 нм"], ["Дальность", "до 70 м (OM3), до 100 м (OM4)"], ["Требования", "RS-FEC на обоих портах; до 1,2 Вт"]] }),
    P({ id: "cisco-qsfp-100g-sr4-s", n: 34, category: "network", vendor: "Cisco", type: "Трансивер", brand: "Cisco", model: "QSFP28 100GBASE-SR4",
      sku: "QSFP-100G-SR4-S", condition: "factory", availability: "on_order", form: "Модуль", img: I + "component-psu-kit.svg#qsfp", thumb: I + "component-psu-kit.svg#qsfp",
      specs: [["Форм-фактор", "QSFP28"], ["Скорость", "100 Гбит/с, 100GBASE-SR4"], ["Разъём / волокно", "MPO-12 (PC/UPC), многомод, 850 нм"], ["Дальность", "до 70 м (OM3), до 100 м (OM4)"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] }),
    P({ id: "qsfp28-100g-sr4-compat", n: 35, category: "network", vendor: "Совместимые", type: "Трансивер", brand: "Совместимые", model: "QSFP28 100GBASE-SR4 (совместимый)",
      sku: "QSFP28-100G-SR4", condition: "new", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#qsfp", thumb: I + "component-psu-kit.svg#qsfp",
      specs: [["Форм-фактор", "QSFP28"], ["Скорость", "100 Гбит/с, стандарт 100GBASE-SR4"], ["Разъём / волокно", "MPO-12, многомод OM3/OM4"], ["Дальность", "до 70 м (OM3) / 100 м (OM4) по стандарту"], ["Совместимость", "Кодировка под платформу — по запросу"]] }),
    P({ id: "hpe-psu-800w", n: 36, category: "components", vendor: "HPE", type: "Блок питания", brand: "HPE", model: "Flex Slot 800W Platinum",
      sku: "865414-B21", condition: "new", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#psu", thumb: I + "component-psu-kit.svg#psu",
      specs: [["Мощность", "800 Вт, Hot-Swap"], ["Класс", "Platinum, КПД 89–92,6 %"], ["Питание", "100–240 В AC (и 240 В DC)"], ["Тип", "Flex Slot"], ["Совместимость", "Платформы ProLiant Gen10 / Gen11; пара должна быть одной модели"]] }),
    P({ id: "hpe-psu-1600w", n: 37, category: "components", vendor: "HPE", type: "Блок питания", brand: "HPE", model: "Flex Slot 1600W Platinum",
      sku: "830272-B21", condition: "seller", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#psu", thumb: I + "component-psu-kit.svg#psu",
      specs: [["Мощность", "1600 Вт, Hot-Swap"], ["Класс", "Platinum, КПД 92,2–92,8 %"], ["Питание", "200–240 В AC (или 240 В DC)"], ["Тип", "Flex Slot"], ["Совместимость", "Проверяется по партномеру платформы"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "broadcom-9361-8i", n: 38, category: "components", vendor: "Broadcom", type: "RAID-контроллер", brand: "Broadcom", model: "MegaRAID SAS 9361-8i",
      sku: "05-25420-08", condition: "used", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Интерфейс", "PCIe 3.0 x8, low-profile"], ["Порты", "8 внутренних SAS/SATA 12 Гбит/с (2× SFF-8643)"], ["Процессор / кэш", "SAS3108, 1 ГБ DDR3"], ["Уровни RAID", "0, 1, 5, 6, 10, 50, 60"], ["Устройства", "До 128"], ["Проверка", "Базовая проверка работоспособности; состояние описывается явно"]] }),
    P({ id: "broadcom-9560-8i", n: 39, category: "components", vendor: "Broadcom", type: "RAID-контроллер", brand: "Broadcom", model: "MegaRAID 9560-8i",
      sku: "05-50077-01", condition: "new", availability: "on_order", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Интерфейс", "PCIe 4.0 x8"], ["Порты", "8 внутренних, Tri-Mode (SAS/SATA/NVMe), 1× SFF-8654"], ["Процессор / кэш", "SAS3908, 4 ГБ"], ["Класс", "Аппаратный RAID-контроллер"], ["Совместимость", "Проверяется по платформе"]] }),
    P({ id: "seagate-exos-x18-18tb", n: 40, category: "components", vendor: "Seagate", type: "Накопитель HDD", brand: "Seagate", model: "Exos X18 18TB SATA",
      sku: "ST18000NM000J", condition: "new", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#ssd", thumb: I + "component-psu-kit.svg#ssd",
      specs: [["Форм-фактор", "3.5\""], ["Интерфейс", "SATA 6 Гбит/с"], ["Ёмкость", "18 ТБ"], ["Скорость вращения", "7200 об/мин, кэш 256 МБ"], ["Класс", "Enterprise, для ЦОД"]] }),
    P({ id: "wd-ultrastar-hc550-18tb", n: 41, category: "components", vendor: "Western Digital", type: "Накопитель HDD", brand: "Western Digital", model: "Ultrastar DC HC550 18TB SATA",
      sku: "WUH721818ALE6L4", condition: "seller", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#ssd", thumb: I + "component-psu-kit.svg#ssd",
      specs: [["Форм-фактор", "3.5\""], ["Интерфейс", "SATA 6 Гбит/с"], ["Ёмкость", "18 ТБ, формат 512e"], ["Скорость вращения", "7200 об/мин, буфер 512 МиБ"], ["Скорость передачи", "До 269 МБ/с"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "samsung-pm9a3-1t92", n: 42, category: "components", vendor: "Samsung", type: "Накопитель NVMe", brand: "Samsung", model: "PM9A3 1.92TB U.2",
      sku: "MZQL21T9HCJR-00A07", condition: "new", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#ssd", thumb: I + "component-psu-kit.svg#ssd",
      specs: [["Форм-фактор", "2.5\" U.2"], ["Интерфейс", "NVMe PCIe 4.0 x4"], ["Ёмкость", "1,92 ТБ"], ["Скорость", "До 6800 / 2700 МБ/с (чтение / запись)"], ["IOPS (4K)", "До 850K чтение / 130K запись"], ["Ресурс", "1 DWPD, 3504 TBW"]] }),
    P({ id: "samsung-pm893-960g", n: 43, category: "components", vendor: "Samsung", type: "Накопитель SATA SSD", brand: "Samsung", model: "PM893 960GB 2.5\"",
      sku: "MZ7L3960HCJR-00A07", condition: "used", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#ssd", thumb: I + "component-psu-kit.svg#ssd",
      specs: [["Форм-фактор", "2.5\", 7 мм"], ["Интерфейс", "SATA 6 Гбит/с"], ["Ёмкость", "960 ГБ"], ["Скорость", "До 550 / 520 МБ/с (чтение / запись)"], ["IOPS (4K)", "До 98K чтение / 30K запись"], ["Ресурс", "1 DWPD, 1752 TBW"], ["Проверка", "Базовая проверка работоспособности; состояние описывается явно"]] }),
    P({ id: "samsung-ddr4-32g", n: 44, category: "components", vendor: "Samsung", type: "Модуль памяти", brand: "Samsung", model: "32GB DDR4-3200 ECC RDIMM",
      sku: "M393A4K40EB3-CWE", condition: "seller", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Тип", "DDR4 ECC Registered (RDIMM), 288 pin"], ["Ёмкость", "32 ГБ"], ["Частота", "3200 MT/s (PC4-25600R), CL22"], ["Ранги", "2Rx4"], ["Напряжение", "1,2 В"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "samsung-ddr5-32g", n: 45, category: "components", vendor: "Samsung", type: "Модуль памяти", brand: "Samsung", model: "32GB DDR5-4800 ECC RDIMM",
      sku: "M321R4GA3BB6-CQK", condition: "new", availability: "on_order", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Тип", "DDR5 ECC Registered (RDIMM), 288 pin"], ["Ёмкость", "32 ГБ"], ["Частота", "4800 MT/s (PC5-38400R), CL40"], ["Ранги", "2Rx8"], ["Напряжение", "1,1 В"], ["Статус у производителя", "Снят с производства (по данным Samsung)"]] }),
    P({ id: "nvidia-mcx512a-acat", n: 46, category: "components", vendor: "NVIDIA", type: "Сетевая карта", brand: "NVIDIA", model: "ConnectX-5 EN MCX512A-ACAT",
      sku: "MCX512A-ACAT", condition: "seller", availability: "in_stock", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Порты", "2× SFP28, 1/10/25 Гбит/с"], ["Интерфейс", "PCIe 3.0 x8"], ["Размеры", "68,90 × 142,24 мм (HHHL)"], ["Мощность", "Типично 9,5 Вт / макс. 11,8 Вт (пассивные кабели)"], ["Статус у производителя", "Линейка ConnectX-5 снимается с производства"], ["Проверка", "Тестирование поставщиком; условия гарантии продавца — по договору"]] }),
    P({ id: "nvidia-mcx623106an", n: 47, category: "components", vendor: "NVIDIA", type: "Сетевая карта", brand: "NVIDIA", model: "ConnectX-6 Dx MCX623106AN-CDAT",
      sku: "MCX623106AN-CDAT", condition: "new", availability: "on_order", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Порты", "2× QSFP56, 1/10/25/40/50/100 GbE"], ["Интерфейс", "PCIe 4.0 x16"], ["Размеры", "142,00 × 68,90 мм (HHHL)"], ["Мощность", "Типично 19,52 Вт / макс. 26,64 Вт (пассивные кабели)"], ["Исполнение", "Без криптографии и Secure Boot"]] }),
    P({ id: "intel-e810-xxvda2", n: 48, category: "components", vendor: "Intel", type: "Сетевая карта", brand: "Intel", model: "Ethernet Network Adapter E810-XXVDA2",
      sku: "E810-XXVDA2", condition: "factory", availability: "on_order", form: "Модуль", img: I + "component-psu-kit.svg#dimm", thumb: I + "component-psu-kit.svg#dimm",
      specs: [["Порты", "2× SFP28, 25/10 GbE"], ["Интерфейс", "PCIe 4.0 x8"], ["Функции", "RDMA (iWARP / RoCEv2), ADQ, DDP, DPDK, IEEE 1588 PTP"], ["Документ состояния", "Документ вендора о восстановлении — обязателен"]] })
  ];
  var EXT = {
  "dell-r650": {
  "img": "assets/img/l-server-1u.svg",
  "thumb": "assets/img/l-server-1u.svg",
  "price_amount": 390000,
  "price_source": "estimate",
  "price_basis": "Оценка: поколение до R750/R760, сегмент Seller Refurbished",
  "price_ref": "",
  "datasheet": "https://i.dell.com/sites/csdocuments/Product_Docs/en/poweredge-r650-spec-sheet.pdf"
  },
  "dell-r750": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 572000,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,85 от рыночной цены нового R750 12LFF («от 673 000 ₽», dell-servers.ru) — Factory Refurbished",
  "price_ref": "https://dell-servers.ru/product/dell-poweredge-r750-12lff/",
  "datasheet": "https://www.delltechnologies.com/asset/en-us/products/servers/technical-support/dell-emc-poweredge-r750-spec-sheet.pdf"
  },
  "dell-r660": {
  "img": "assets/img/l-server-1u.svg",
  "thumb": "assets/img/l-server-1u.svg",
  "price_amount": 520000,
  "price_source": "estimate",
  "price_basis": "Оценка: ≈ 0,93 от рыночной цены нового R760 (562 000 ₽)",
  "price_ref": "",
  "datasheet": "https://i.dell.com/sites/csdocuments/Product_Docs/en/poweredge-r660-spec-sheet.pdf"
  },
  "dell-r760": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 562000,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового Dell PowerEdge R760 («от»): ServerTech",
  "price_ref": "https://servertech.ru/",
  "datasheet": "https://www.delltechnologies.com/asset/en-us/products/servers/technical-support/poweredge-r760-spec-sheet.pdf"
  },
  "dell-r740xd": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 255000,
  "price_source": "estimate",
  "price_basis": "Оценка: Б/у, предыдущее поколение 2U",
  "price_ref": "",
  "datasheet": "https://www.dell.com/support/manuals/en-us/poweredge-r740xd/per740xd_techspecs_pub/chassis-weight?guid=guid-5ee8b904-f8e7-46dc-a1c0-3342ae8a1d83&lang=en-us"
  },
  "hpe-dl360-gen11": {
  "img": "assets/img/l-server-1u.svg",
  "thumb": "assets/img/l-server-1u.svg",
  "price_amount": 646905,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового P51930-B21 с НДС: ServerMall",
  "price_ref": "https://servermall.ru/catalog/servers/hpe-proliant-dl360-gen11-p51930-b21/",
  "datasheet": "https://www.hpe.com/us/en/collaterals/collateral.a50004306enw.html",
  "aliases": [
  "P51930-421"
  ],
  "compat": [
  {
  "group": "БП",
  "ref": "hpe-psu-800w",
  "note": "Flex Slot, пара одной модели"
  },
  {
  "group": "БП",
  "ref": "hpe-psu-1600w",
  "note": "Проверяется по партномеру платформы"
  },
  {
  "group": "Память",
  "ref": "samsung-ddr5-32g",
  "note": "DDR5 RDIMM"
  },
  {
  "group": "Сетевые карты",
  "ref": "intel-e810-xxvda2",
  "note": "PCIe, 2×SFP28"
  }
  ]
  },
  "hpe-dl380-gen11": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 536694,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового P52560-421: EDDP",
  "price_ref": "https://www.eddp.ru/servera-i-skhd/hpe-dl380/server-hpe-proliant-dl380-gen11-p52560-421/",
  "datasheet": "https://www.hpe.com/psnow/downloadDoc/HPE%20ProLiant%20DL380%20Gen11%20QuickSpecs-a50004307enw.pdf?id=a50004307enw.PDF",
  "compat": [
  {
  "group": "БП",
  "ref": "hpe-psu-800w",
  "note": "Flex Slot, пара одной модели"
  },
  {
  "group": "БП",
  "ref": "hpe-psu-1600w",
  "note": "Проверяется по партномеру платформы"
  },
  {
  "group": "Память",
  "ref": "samsung-ddr5-32g",
  "note": "DDR5 RDIMM"
  },
  {
  "group": "Сетевые карты",
  "ref": "intel-e810-xxvda2",
  "note": "PCIe, 2×SFP28"
  }
  ]
  },
  "hpe-dl380-gen10": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 260874,
  "price_source": "estimate",
  "price_basis": "Оценка по рыночному ориентиру: CTO 868703-B21 от 260 874 ₽ (proliant-hp.ru); цена зависит от конфигурации",
  "price_ref": "https://www.proliant-hp.ru/catalog/rack-servery_hp_proliant/rack-servery_hp_proliant_dl380_gen10/868703-b21",
  "compat": [
  {
  "group": "БП",
  "ref": "hpe-psu-800w",
  "note": "Flex Slot, пара одной модели"
  },
  {
  "group": "Память",
  "ref": "samsung-ddr4-32g",
  "note": "DDR4 RDIMM, совместимость подтверждается"
  },
  {
  "group": "Сетевые карты",
  "ref": "nvidia-mcx512a-acat",
  "note": "PCIe, 2×SFP28"
  }
  ]
  },
  "lenovo-sr630-v2": {
  "img": "assets/img/l-server-1u.svg",
  "thumb": "assets/img/l-server-1u.svg",
  "price_amount": 245000,
  "price_source": "estimate",
  "price_basis": "Оценка: Б/у, 1U Xeon 3-го поколения",
  "price_ref": "",
  "datasheet": "https://lenovopress.lenovo.com/lp1391-thinksystem-sr630-v2-server-xeon-sp-gen3"
  },
  "lenovo-sr650-v2": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 340000,
  "price_source": "estimate",
  "price_basis": "Оценка: Seller Refurbished, 2U Xeon 3-го поколения",
  "price_ref": "",
  "datasheet": "https://lenovopress.lenovo.com/lp1392-thinksystem-sr650-v2-server-xeon-sp-gen3"
  },
  "lenovo-sr650-v3": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 720000,
  "price_source": "estimate",
  "price_basis": "Оценка: ориентир Lenovo SR650 (7X06A0FFNA) от 639 450 ₽ + поколение V3",
  "price_ref": "",
  "datasheet": "https://lenovopress.lenovo.com/lp1601-thinksystem-sr650-v3-server"
  },
  "xfusion-1288h-v6": {
  "img": "assets/img/l-server-1u.svg",
  "thumb": "assets/img/l-server-1u.svg",
  "price_amount": 310000,
  "price_source": "estimate",
  "price_basis": "Оценка: Seller Refurbished, 1U",
  "price_ref": "",
  "datasheet": "https://www.xfusion.com/en/product/rack-server/fusionserver-1288h-v6"
  },
  "xfusion-2288h-v6": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 520000,
  "price_source": "estimate",
  "price_basis": "Оценка: новый 2U, ориентир по аналогам Gen11/V6",
  "price_ref": "",
  "datasheet": "https://www.xfusion.com/en/product/rack-server/fusionserver-2288h-v6"
  },
  "xfusion-2288h-v7": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 640000,
  "price_source": "estimate",
  "price_basis": "Оценка: новый 2U нового поколения",
  "price_ref": "",
  "datasheet": "https://www.xfusion.com/wp-content/uploads/2025/04/FusionServer-2288H-V7-Rack-Server-Datasheet.pdf"
  },
  "smc-sys-221h-tnr": {
  "img": "assets/img/l-server-2u.svg",
  "thumb": "assets/img/l-server-2u.svg",
  "price_amount": 1130611,
  "price_source": "estimate",
  "price_basis": "Оценка по последней известной цене базовой конфигурации (KNS); позиция под заказ",
  "price_ref": "https://www.kns.ru/product/server-supermicro-sys-221h-tnr/",
  "datasheet": "https://www.supermicro.com/en/products/system/hyper/2u/sys-221h-tnr"
  },
  "smc-sys-121h-tnr": {
  "img": "assets/img/l-server-1u.svg",
  "thumb": "assets/img/l-server-1u.svg",
  "price_amount": 690000,
  "price_source": "estimate",
  "price_basis": "Оценка: Seller Refurbished, 1U Hyper",
  "price_ref": "",
  "datasheet": "https://www.supermicro.com/en/products/system/hyper/1u/sys-121h-tnr"
  },
  "dell-powerstore-1200t": {
  "img": "assets/img/l-storage.svg",
  "thumb": "assets/img/l-storage.svg",
  "price_amount": 3900000,
  "price_source": "estimate",
  "price_basis": "Оценка: СХД среднего класса, зависит от конфигурации",
  "price_ref": "",
  "datasheet": "https://www.dell.com/en-us/shop/ipovw/powerstore-1200t"
  },
  "dell-me5024": {
  "img": "assets/img/l-storage.svg",
  "thumb": "assets/img/l-storage.svg",
  "price_amount": 1150000,
  "price_source": "estimate",
  "price_basis": "Оценка: Seller Refurbished, 2U 24×SFF",
  "price_ref": "",
  "datasheet": "https://www.delltechnologies.com/asset/en-ca/products/storage/technical-support/dell-powervault-me5-ss.pdf"
  },
  "dell-me5012": {
  "img": "assets/img/l-storage.svg",
  "thumb": "assets/img/l-storage.svg",
  "price_amount": 520000,
  "price_source": "estimate",
  "price_basis": "Оценка: Б/у, 2U 12×LFF",
  "price_ref": "",
  "datasheet": "https://www.delltechnologies.com/asset/en-ca/products/storage/technical-support/dell-powervault-me5-ss.pdf"
  },
  "hpe-msa-2060-fc": {
  "img": "assets/img/l-storage.svg",
  "thumb": "assets/img/l-storage.svg",
  "price_amount": 780000,
  "price_source": "estimate",
  "price_basis": "Оценка: Factory Refurbished; рынок нового — от 332 544 до 1 489 130 ₽ (большой разброс), hpeserver.ru и др.",
  "price_ref": "https://hpeserver.ru/r0q74a",
  "datasheet": "https://www.hpe.com/us/en/collaterals/collateral.a00094629enw.html",
  "aliases": [
  "R0Q74B"
  ]
  },
  "huawei-dorado-3000-v6": {
  "img": "assets/img/l-storage.svg",
  "thumb": "assets/img/l-storage.svg",
  "price_amount": 4200000,
  "price_source": "estimate",
  "price_basis": "Оценка: All-Flash СХД, зависит от конфигурации",
  "price_ref": "",
  "datasheet": "https://e.huawei.com/en/products/storage/all-flash-storage/dorado-3000-v6"
  },
  "huawei-dorado-5000-v6": {
  "img": "assets/img/l-storage.svg",
  "thumb": "assets/img/l-storage.svg",
  "price_amount": 6800000,
  "price_source": "estimate",
  "price_basis": "Оценка: All-Flash СХД, зависит от конфигурации",
  "price_ref": "",
  "datasheet": "https://e.huawei.com/en/products/storage/all-flash-storage/dorado-5000-6000-v6"
  },
  "cisco-n9k-93180yc-fx3": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 638229,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового N9K-C93180YC-FX3(PI) с НДС: ИНФОТЕХ (i-teh.com)",
  "price_ref": "https://i-teh.com/catalog/upravlyaemye/cisco_n9k_c93180yc_fx3_pi_kommutator/",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/datasheet-c78-744052.html",
  "aliases": [
  "N9K-C93180YC-FX3-PI",
  "N9K-C93180YC-FX3-PE",
  "N9K-C93180YC-FX3=",
  "N9K-C93180YC-FX3(PI)",
  "N93180YC-FX3",
  "93180YC-FX3",
  "NXA-PAC-650W-PI",
  "NXA-PAC-650W-PE",
  "NXA-PDC-930W-PI",
  "NXA-PDC-930W-PE",
  "N9K-PUV-1200W",
  "NXA-FAN-35CFM-PI",
  "NXA-FAN-35CFM-PE",
  "NXK-ACC-KIT-1RU",
  "NXK-ACC-KIT-2P"
  ],
  "compat": [
  {
  "group": "БП",
  "pn": "NXA-PAC-650W-PI",
  "title": "Блок питания Cisco Nexus 650 Вт AC, обдув port-side intake (PI)",
  "note": "PI: БП + вентиляторы одного направления"
  },
  {
  "group": "БП",
  "pn": "NXA-PAC-650W-PE",
  "title": "Блок питания Cisco Nexus 650 Вт AC, обдув port-side exhaust (PE)",
  "note": "PE: БП + вентиляторы одного направления"
  },
  {
  "group": "БП",
  "pn": "NXA-PDC-930W-PI",
  "title": "Блок питания Cisco Nexus 930 Вт DC, port-side intake (PI)",
  "note": ""
  },
  {
  "group": "БП",
  "pn": "NXA-PDC-930W-PE",
  "title": "Блок питания Cisco Nexus 930 Вт DC, port-side exhaust (PE)",
  "note": ""
  },
  {
  "group": "БП",
  "pn": "N9K-PUV-1200W",
  "title": "Блок питания Cisco N9300 1200 Вт универсальный (HVAC/HVDC, двунаправленный обдув)",
  "note": ""
  },
  {
  "group": "Вентиляторы",
  "pn": "NXA-FAN-35CFM-PI",
  "title": "Вентиляторный модуль Cisco Nexus 35 CFM, port-side intake (PI)",
  "note": "Комплектуется по PI"
  },
  {
  "group": "Вентиляторы",
  "pn": "NXA-FAN-35CFM-PE",
  "title": "Вентиляторный модуль Cisco Nexus 35 CFM, port-side exhaust (PE)",
  "note": "Комплектуется по PE"
  },
  {
  "group": "Рейки",
  "pn": "NXK-ACC-KIT-1RU",
  "title": "Комплект крепления Cisco Nexus, 4-стоечный (4-post), 1RU",
  "note": ""
  },
  {
  "group": "Рейки",
  "pn": "NXK-ACC-KIT-2P",
  "title": "Комплект крепления Cisco Nexus, 2-стоечный (2-post)",
  "note": ""
  },
  {
  "group": "Трансиверы",
  "ref": "cisco-sfp-10g-sr-s",
  "note": "Порты SFP28 принимают SFP+ 10G"
  },
  {
  "group": "Трансиверы",
  "ref": "cisco-sfp-25g-sr-s",
  "note": "Требуется RS-FEC"
  },
  {
  "group": "Трансиверы",
  "ref": "cisco-qsfp-100g-sr4-s",
  "note": "Uplink-порты QSFP28"
  },
  {
  "group": "Трансиверы",
  "ref": "qsfp28-100g-sr4-compat",
  "note": "Совместимый модуль — подтверждается в КП"
  }
  ],
  "datasheet_title": "Cisco N9300-FX3 Series Switches Data Sheet",
  "ext": [
  {
  "h": "Производительность",
  "rows": [
  [
  "Пропускная способность",
  "3,6 Тбит/с, 1,2 Bpps"
  ],
  [
  "Буфер системы",
  "40 МБ"
  ],
  [
  "Таблица MAC-адресов",
  "до 512 000 записей"
  ],
  [
  "IPv4 / IPv6",
  "LPM и host до 1 792 000 / LPM IPv6 до 896 000"
  ],
  [
  "VRF · ECMP",
  "16 000 VRF · 128-way ECMP"
  ],
  [
  "Мультикаст-маршруты",
  "до 128 000"
  ],
  [
  "VLAN",
  "до 4096 (27 зарезервированы)"
  ]
  ]
  },
  {
  "h": "Платформа и порты",
  "rows": [
  [
  "Порты доступа",
  "48× SFP28 (1/10/25G)"
  ],
  [
  "Uplink",
  "6× QSFP28 (40/100G)"
  ],
  [
  "Процессор",
  "4 ядра"
  ],
  [
  "Память (ОЗУ)",
  "16 ГБ по умолчанию, расширяется ещё на 16 ГБ"
  ],
  [
  "Накопитель (SSD)",
  "128 ГБ"
  ],
  [
  "Управление",
  "1× RJ-45 (mgmt), 1× USB, 1× RS-232 (консоль)"
  ],
  [
  "Синхронизация",
  "GPS 1PPS и 10 МГц (вход/выход), ToD (RJ-45), антенна ГНСС"
  ],
  [
  "Безопасность",
  "MACsec (IEEE 802.1ae) на всех портах"
  ]
  ]
  },
  {
  "h": "Питание и охлаждение",
  "rows": [
  [
  "Блоки питания",
  "до 2 шт.: 650 Вт AC (PI/PE) · 930 Вт DC (PI/PE) · 1200 Вт HVAC/HVDC (двунаправленный)"
  ],
  [
  "Потребление",
  "типовое 325 Вт · максимальное 600 Вт"
  ],
  [
  "Вход AC",
  "100–240 В, 50–60 Гц"
  ],
  [
  "Вентиляторы",
  "4 модуля, 35 CFM (PI или PE)"
  ],
  [
  "Направление обдува",
  "Port-side intake (PI) или port-side exhaust (PE) — БП и вентиляторы одного направления"
  ]
  ]
  },
  {
  "h": "Конструкция и условия",
  "rows": [
  [
  "Форм-фактор",
  "1RU, 4,4 × 43,9 × 49,6 см"
  ],
  [
  "Масса шасси",
  "9,52 кг (без БП и вентиляторов)"
  ],
  [
  "Рабочая температура",
  "0…40 °C, влажность 5–95 % без конденсата"
  ],
  [
  "MTBF",
  "303 190 ч"
  ],
  [
  "ПО",
  "NX-OS от 9.3.7 · ACI от 15.1.3"
  ]
  ]
  }
  ],
  "variants": [
  {
  "code": "PI",
  "name": "Port-side intake",
  "text": "Холодный воздух забирается со стороны портов, горячий выходит сзади. Партномер варианта часто пишут как N9K-C93180YC-FX3-PI или (PI). Модули: NXA-PAC-650W-PI + NXA-FAN-35CFM-PI."
  },
  {
  "code": "PE",
  "name": "Port-side exhaust",
  "text": "Порты на горячем проходе: воздух забирается сзади, выходит со стороны портов. Модули: NXA-PAC-650W-PE + NXA-FAN-35CFM-PE."
  }
  ],
  "includes": [
  "Шасси N9K-C93180YC-FX3",
  "БП (до 2) и вентиляторные модули — по выбранному варианту PE/PI (в спецификации вендора это отдельные партномера)",
  "Комплект креплений NXK-ACC-KIT-1RU и кабели питания — опционально, фиксируются в КП",
  "Документация"
  ],
  "condition": "new",
  "specs": [
  [
  "Форм-фактор",
  "1RU"
  ],
  [
  "Порты доступа",
  "48× SFP28 (1/10/25GbE)"
  ],
  [
  "Uplink",
  "6× QSFP28 (40/100GbE)"
  ],
  [
  "Пропускная способность",
  "3,6 Тбит/с, 1,2 Bpps"
  ],
  [
  "Буфер · MAC",
  "40 МБ · до 512 000 MAC"
  ],
  [
  "Роль",
  "ToR / leaf в фабрике ЦОД"
  ],
  [
  "Режимы ПО",
  "NX-OS / ACI (зависит от лицензии)"
  ]
  ]
  },
  "cisco-n9k-9336c-fx2": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 535000,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,70 от нижней рыночной цены нового (764 297 ₽, cbm.company) — Seller Refurbished",
  "price_ref": "https://cbm.company/n9k-c9336c-fx2-kommutator-cisco-nexus-9300-series",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/datasheet-c78-742282.pdf",
  "aliases": [
  "N9K-C9336C-FX2=",
  "9336C-FX2"
  ],
  "compat": [
  {
  "group": "Трансиверы",
  "ref": "cisco-qsfp-100g-sr4-s",
  "note": "Порты QSFP28 40/100G"
  },
  {
  "group": "Трансиверы",
  "ref": "qsfp28-100g-sr4-compat",
  "note": "Совместимый модуль — подтверждается в КП"
  }
  ]
  },
  "cisco-c9300-48p": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 195600,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,85 от нижней рыночной цены нового (230 076 ₽, bouz.ru) — Factory Refurbished",
  "price_ref": "https://bouz.ru/catalog/cisco_catalyst_9300/kommutator_cisco_catalyst_c9300_48p_e/",
  "aliases": [
  "C9300-48P-E="
  ]
  },
  "cisco-c9200l-24t": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 70400,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,55 от нижней рыночной цены нового (128 070 ₽, Регард) — Б/у",
  "price_ref": "https://www.regard.ru/reciept/39744/upravliaemye-kommutatory-svitci-cisco",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9200-series-switches/nb-06-cat9200-ser-data-sheet-cte-en.html",
  "aliases": [
  "C9200L-24T-4G-E="
  ]
  },
  "huawei-ce6881": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 269645,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового CE6881-48S6CQ-B (вариант с БП и вентиляторами) с НДС: Kvantech",
  "price_ref": "https://kvan.tech/catalog/setevoe-oborudovanie-i-organizatsiya-setey/huawei/kommutatory-huawei/kommutator-huawei-ce6881-48s6cq-b/",
  "datasheet": "https://e.huawei.com/en/documents/products/enterprise-network/03b4b17c83324b129def5b9bba4d29af",
  "aliases": [
  "CE6881-48S6CQ-B",
  "02352QGG-004"
  ],
  "compat": [
  {
  "group": "Трансиверы",
  "ref": "qsfp28-100g-sr4-compat",
  "note": "Совместимость с кодировкой платформы подтверждается в КП"
  }
  ]
  },
  "huawei-ce6865": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 310000,
  "price_source": "estimate",
  "price_basis": "Оценка: Seller Refurbished, 48×25G + 8×100G",
  "price_ref": "",
  "datasheet": "https://support.huawei.com/enterprise/en/doc/EDOC1100198646/3082bcde/ce6865-48s8cq-ei"
  },
  "huawei-ce8850": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 1650000,
  "price_source": "estimate",
  "price_basis": "Оценка: новый 64×100G",
  "price_ref": "",
  "datasheet": "https://support.huawei.com/enterprise/en/doc/EDOC1100198646/6e958eba/ce8850-64cq-ei"
  },
  "nvidia-sn2700": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 239600,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,70 от нижней рыночной цены нового (342 300 ₽, t-bazar.ru) — Seller Refurbished",
  "price_ref": "https://t-bazar.ru/catalog/setevoe-oborudovanie/kommutatory/kommutator-mellanox-msn2700-cs2f/",
  "datasheet": "https://network.nvidia.com/sites/default/files/doc-2020/pb-sn2700.pdf",
  "aliases": [
  "920-9N101-00F7-0X4",
  "SN2700"
  ]
  },
  "arista-7050sx3": {
  "img": "assets/img/l-switch.svg",
  "thumb": "assets/img/l-switch.svg",
  "price_amount": 321800,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,55 от рыночного ориентира 585 000 ₽ (DCS-7050SX3-48YC8-F, Телекомстартап) — Б/у",
  "price_ref": "https://telecomstartup.ru/catalog/kommutatory/gigabit-ethernet/kommutator_arista_dcs_7050sx3_48yc8_f/",
  "datasheet": "https://www.arista.com/assets/data/pdf/Datasheets/7050X3-Datasheet.pdf",
  "aliases": [
  "DCS-7050SX3-48YC8-F",
  "DCS-7050SX3-48YC8#"
  ]
  },
  "cisco-sfp-10g-sr-s": {
  "img": "assets/img/l-parts.svg#qsfp",
  "thumb": "assets/img/l-parts.svg#qsfp",
  "price_amount": 4930,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового SFP-10G-SR-S= с НДС 22%: bouz.ru",
  "price_ref": "https://bouz.ru/catalog/opticheskie_transivery_cisco/opticheskiy_transiver_cisco_sfp_10g_sr_s/",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html",
  "aliases": [
  "SFP-10G-SR-S=",
  "SFP-10G-SR"
  ],
  "compat": [
  {
  "group": "Платформы в каталоге",
  "ref": "cisco-n9k-93180yc-fx3",
  "note": "Порты SFP28 принимают SFP+"
  }
  ]
  },
  "cisco-sfp-25g-sr-s": {
  "img": "assets/img/l-parts.svg#qsfp",
  "thumb": "assets/img/l-parts.svg#qsfp",
  "price_amount": 14414,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового SFP-25G-SR-S с НДС 22%: ИНФОТЕХ",
  "price_ref": "https://i-teh.com/catalog/sfp_moduli/modul_opticheskiy_cisco_sfp_25g_sr_s/",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736950.html",
  "aliases": [
  "SFP-25G-SR-S="
  ],
  "compat": [
  {
  "group": "Платформы в каталоге",
  "ref": "cisco-n9k-93180yc-fx3",
  "note": ""
  },
  {
  "group": "Сетевые карты",
  "ref": "intel-e810-xxvda2",
  "note": "Порты SFP28"
  },
  {
  "group": "Сетевые карты",
  "ref": "nvidia-mcx512a-acat",
  "note": "Порты SFP28"
  }
  ]
  },
  "cisco-qsfp-100g-sr4-s": {
  "img": "assets/img/l-parts.svg#qsfp",
  "thumb": "assets/img/l-parts.svg#qsfp",
  "price_amount": 17100,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,85 от нижней рыночной цены нового (20 177 ₽, ИНФОТЕХ) — Factory Refurbished",
  "price_ref": "https://i-teh.com/catalog/sfp_moduli/modul_opticheskiy_cisco_qsfp_100g_sr4_s/",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736282.html",
  "aliases": [
  "QSFP-100G-SR4-S="
  ],
  "compat": [
  {
  "group": "Платформы в каталоге",
  "ref": "cisco-n9k-93180yc-fx3",
  "note": "Uplink QSFP28"
  },
  {
  "group": "Платформы в каталоге",
  "ref": "cisco-n9k-9336c-fx2",
  "note": ""
  },
  {
  "group": "Сетевые карты",
  "ref": "nvidia-mcx623106an",
  "note": "QSFP56/100G"
  }
  ]
  },
  "qsfp28-100g-sr4-compat": {
  "img": "assets/img/l-parts.svg#qsfp",
  "thumb": "assets/img/l-parts.svg#qsfp",
  "price_amount": 6500,
  "price_source": "estimate",
  "price_basis": "Оценка: совместимый QSFP28 SR4 (сторонний производитель)",
  "price_ref": "",
  "datasheet": "https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736282.html",
  "compat": [
  {
  "group": "Платформы в каталоге",
  "ref": "cisco-n9k-9336c-fx2",
  "note": "Подтверждается в КП"
  },
  {
  "group": "Сетевые карты",
  "ref": "nvidia-mcx623106an",
  "note": "Подтверждается в КП"
  }
  ]
  },
  "hpe-psu-800w": {
  "img": "assets/img/l-parts.svg#psu",
  "thumb": "assets/img/l-parts.svg#psu",
  "price_amount": 11360,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового 865414-B21: Apltech",
  "price_ref": "https://www.apltech.ru/tovar/30375/hpe-800w-platinum-power-supply-865414-b21",
  "datasheet": "https://www.hpe.com/us/en/collaterals/collateral.c04346217.html",
  "aliases": [
  "866730-001",
  "865409-001",
  "865412-201",
  "865412-501",
  "865412-101",
  "865414-B21#ABB"
  ],
  "compat": [
  {
  "group": "Платформы в каталоге",
  "ref": "hpe-dl360-gen11",
  "note": ""
  },
  {
  "group": "Платформы в каталоге",
  "ref": "hpe-dl380-gen11",
  "note": ""
  },
  {
  "group": "Платформы в каталоге",
  "ref": "hpe-dl380-gen10",
  "note": "Совместимость подтверждается по партномеру платформы"
  }
  ],
  "ext": [
  {
  "h": "Партномера",
  "rows": [
  [
  "Основной",
  "865414-B21"
  ],
  [
  "Альтернативные spare-номера",
  "866730-001 · 865409-001 · 865412-201 · 865412-501 · 865412-101 (по данным реселлеров; подтверждается по платформе)"
  ]
  ]
  }
  ]
  },
  "hpe-psu-1600w": {
  "img": "assets/img/l-parts.svg#psu",
  "thumb": "assets/img/l-parts.svg#psu",
  "price_amount": 16200,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,70 от нижней рыночной цены нового (23 111 ₽, Kvantech) — Seller Refurbished",
  "price_ref": "https://kvan.tech/catalog/komplektuyushchie/bloki-pitaniya/blok-pitaniya-hpe-1600w-830272-b21/",
  "datasheet": "https://www.hpe.com/us/en/collaterals/collateral.c04346217.html",
  "aliases": [
  "830272-B21=",
  "1600W Flex Slot"
  ],
  "compat": [
  {
  "group": "Платформы в каталоге",
  "ref": "hpe-dl380-gen11",
  "note": "Совместимость подтверждается по партномеру платформы"
  },
  {
  "group": "Платформы в каталоге",
  "ref": "hpe-dl380-gen10",
  "note": "Совместимость подтверждается по партномеру платформы"
  }
  ]
  },
  "broadcom-9361-8i": {
  "img": "assets/img/l-parts.svg#nic",
  "thumb": "assets/img/l-parts.svg#nic",
  "price_amount": 18600,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,55 от рыночного ориентира 33 770 ₽ (CompaREMA) — Б/у",
  "price_ref": "https://comparema.ru/",
  "datasheet": "https://docs.broadcom.com/doc/BC00-0478EN",
  "aliases": [
  "LSI00417",
  "03-25420-11B",
  "9361-8i"
  ]
  },
  "broadcom-9560-8i": {
  "img": "assets/img/l-parts.svg#nic",
  "thumb": "assets/img/l-parts.svg#nic",
  "price_amount": 83168,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового 05-50077-01 с НДС: PC Planet",
  "price_ref": "https://www.pcplanet.ru/product/323951",
  "datasheet": "https://www.broadcom.com/products/storage/raid-controllers/megaraid-9560-8i",
  "aliases": [
  "9560-8i"
  ]
  },
  "seagate-exos-x18-18tb": {
  "img": "assets/img/l-parts.svg#hdd",
  "thumb": "assets/img/l-parts.svg#hdd",
  "price_amount": 86090,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового ST18000NM000J (поштучно): price.ru, Цифрус",
  "price_ref": "https://price.ru/zhestkie-diski/seagate-st18000nm000j/",
  "datasheet": "https://www.seagate.com/www-content/datasheets/pdfs/exos-x18-DS2045-1-2007US-en_US.pdf"
  },
  "wd-ultrastar-hc550-18tb": {
  "img": "assets/img/l-parts.svg#hdd",
  "thumb": "assets/img/l-parts.svg#hdd",
  "price_amount": 67100,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,70 от цены нового (95 880 ₽, Tehpos) — Seller Refurbished",
  "price_ref": "https://tehpos.ru/moskva/wd-ultrastar-dc-hc550-18tb-wuh721818ale6l4.html",
  "datasheet": "https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/public/western-digital/product/data-center-drives/ultrastar-dc-hc500-series/data-sheet-ultrastar-dc-hc550.pdf"
  },
  "samsung-pm9a3-1t92": {
  "img": "assets/img/l-parts.svg#ssd",
  "thumb": "assets/img/l-parts.svg#ssd",
  "price_amount": 146741,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового MZQL21T9HCJR-00A07 с НДС: Юникомп",
  "price_ref": "https://unicomps.ru/product/ssd-nakopitel-servernyy-samsung-1-92-tb-vnutrenniy-ssd-2-5-u-2-chtenie-6800-mb-sek-zapis-4000-mb-sek-tlc-pm9a3-mzql21t9hcjr-00a07/"
  },
  "samsung-pm893-960g": {
  "img": "assets/img/l-parts.svg#ssd",
  "thumb": "assets/img/l-parts.svg#ssd",
  "price_amount": 35500,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,55 от нижней рыночной цены нового (64 515 ₽, bouz.ru) — Б/у",
  "price_ref": "https://bouz.ru/catalog/zhestkie_diski_ssd/nakopitel_ssd_samsung_pm893_960gb_mz7l3960hcjr_00a07/"
  },
  "samsung-ddr4-32g": {
  "img": "assets/img/l-parts.svg#dimm",
  "thumb": "assets/img/l-parts.svg#dimm",
  "price_amount": 33000,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,70 от нижней рыночной цены нового (47 146 ₽, XCOM B2B) — Seller Refurbished",
  "price_ref": "https://b2b.xcom.ru/catalog/servery_i_shd/komplektyyuschie/modyli_pamyati/"
  },
  "samsung-ddr5-32g": {
  "img": "assets/img/l-parts.svg#dimm",
  "thumb": "assets/img/l-parts.svg#dimm",
  "price_amount": 161315,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового M321R4GA3BB6-CQK (под заказ): Навигатор",
  "price_ref": "https://shop.nav-it.ru/catalogue/pamyat_3/samsung_ddr5_32gb_rdimm_4800mhz_2rx8_ecc_reg_1_1v_m321r4ga3bb6_cqk_1_year_oem/"
  },
  "nvidia-mcx512a-acat": {
  "img": "assets/img/l-parts.svg#nic",
  "thumb": "assets/img/l-parts.svg#nic",
  "price_amount": 18500,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,70 от нижней рыночной цены нового (26 460 ₽, Kvantech) — Seller Refurbished",
  "price_ref": "https://kvan.tech/catalog/komplektuyushchie/pci-moduli/setevye-adaptery/setevye-adaptery-nvidia/setevoy-adapter-nvidia-mcx512a-acat/",
  "datasheet": "https://networking-docs.nvidia.com/connectx5enhw/specifications",
  "compat": [
  {
  "group": "Трансиверы",
  "ref": "cisco-sfp-25g-sr-s",
  "note": "Порты SFP28"
  }
  ]
  },
  "nvidia-mcx623106an": {
  "img": "assets/img/l-parts.svg#nic",
  "thumb": "assets/img/l-parts.svg#nic",
  "price_amount": 82502,
  "price_source": "market",
  "price_basis": "Нижняя найденная цена нового MCX623106AN-CDAT: KNSneva",
  "price_ref": "https://www.knsneva.ru/product/setevaya-karta-mellanox-mcx623106an-cdat/",
  "datasheet": "https://networking-docs.nvidia.com/connectx6dxhw/specifications",
  "compat": [
  {
  "group": "Трансиверы",
  "ref": "cisco-qsfp-100g-sr4-s",
  "note": "Порты QSFP56 / 100G"
  },
  {
  "group": "Трансиверы",
  "ref": "qsfp28-100g-sr4-compat",
  "note": "Подтверждается в КП"
  }
  ]
  },
  "intel-e810-xxvda2": {
  "img": "assets/img/l-parts.svg#nic",
  "thumb": "assets/img/l-parts.svg#nic",
  "price_amount": 15200,
  "price_source": "estimate",
  "price_basis": "Оценка: 0,85 от нижней рыночной цены нового (17 900 ₽, ServerFlow) — Factory Refurbished",
  "price_ref": "https://serverflow.ru/catalog/komplektuyushchie/setevye-karty/intel-e810-xxvda2/",
  "datasheet": "https://cdrdv2-public.intel.com/641674/Intel%20Ethernet%20Network%20Adapter%20E810-XXVDA2%20Product%20Brief.pdf",
  "aliases": [
  "E810XXVDA2G1P5",
  "E810-XXVDA2G1P5"
  ],
  "compat": [
  {
  "group": "Трансиверы",
  "ref": "cisco-sfp-25g-sr-s",
  "note": "Порты SFP28"
  },
  {
  "group": "Трансиверы",
  "ref": "cisco-sfp-10g-sr-s",
  "note": "Скорость 10G"
  }
  ]
  }
  };
    var COMPAT_PARTS = {"NXA-PAC-650W-PI": {"title": "Блок питания Cisco Nexus 650 Вт AC, обдув port-side intake (PI)", "group": "БП"}, "NXA-PAC-650W-PE": {"title": "Блок питания Cisco Nexus 650 Вт AC, обдув port-side exhaust (PE)", "group": "БП"}, "NXA-PDC-930W-PI": {"title": "Блок питания Cisco Nexus 930 Вт DC, port-side intake (PI)", "group": "БП"}, "NXA-PDC-930W-PE": {"title": "Блок питания Cisco Nexus 930 Вт DC, port-side exhaust (PE)", "group": "БП"}, "N9K-PUV-1200W": {"title": "Блок питания Cisco N9300 1200 Вт универсальный (HVAC/HVDC, двунаправленный обдув)", "group": "БП"}, "NXA-FAN-35CFM-PI": {"title": "Вентиляторный модуль Cisco Nexus 35 CFM, port-side intake (PI)", "group": "Вентиляторы"}, "NXA-FAN-35CFM-PE": {"title": "Вентиляторный модуль Cisco Nexus 35 CFM, port-side exhaust (PE)", "group": "Вентиляторы"}, "NXK-ACC-KIT-1RU": {"title": "Комплект крепления Cisco Nexus, 4-стоечный (4-post), 1RU", "group": "Рейки"}, "NXK-ACC-KIT-2P": {"title": "Комплект крепления Cisco Nexus, 2-стоечный (2-post)", "group": "Рейки"}};
  
  PRODUCTS.forEach(function (p) { var x = EXT[p.id]; if (x) Object.keys(x).forEach(function (k) { p[k] = x[k]; }); });
  var VENDORS = ["Dell", "HPE", "Lenovo", "Huawei", "xFusion", "Supermicro", "Cisco", "NVIDIA", "Arista", "Broadcom", "Seagate", "Western Digital", "Samsung", "Intel", "Совместимые"];
  return { CONDITIONS: CONDITIONS, CONDITION_ORDER: CONDITION_ORDER, AVAILABILITY: AVAILABILITY, CATEGORIES: CATEGORIES,
    CATEGORY_ORDER: CATEGORY_ORDER, FORM_ORDER: FORM_ORDER, PRODUCTS: PRODUCTS, VENDORS: VENDORS, COMPAT_PARTS: COMPAT_PARTS, PRICE_DATE: PRICE_DATE,
    DEMO_NOTE: "Демо-каталог: модели и партномера взяты из открытых источников, а наличие и состояние — демонстрационные значения для макета, без реальных остатков и реквизитов. Цены не публикуются. Финальные позиции и наличие заполняются из прайса заказчика." };
})();
