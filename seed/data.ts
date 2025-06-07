export const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    role: "admin",
  },
  {
    name: "Manager",
    email: "manager@manager.com",
    role: "manager",
  },
  { name: "User", email: "user@user.com", role: "user" },
];

export const groups = [
  { name: "Monitors", type: "Hardware" },
  { name: "Laptops", type: "Hardware" },
  { name: "Phones", type: "Hardware" },
  { name: "Accessories", type: "Peripheral" },
  { name: "Printers", type: "Office" },
];

export const orders = [
  {
    title: "April Batch",
    description: "Initial hardware purchase",
    userEmail: "admin@admin.com",
  },
  {
    title: "May Phones",
    description: "Phones for staff",
    userEmail: "manager@manager.com",
  },
  {
    title: "June Accessories",
    description: "Peripherals for new employees",
    userEmail: "user@user.com",
  },
];

export const products = [
  {
    title: "MacBook Pro",
    type: "Laptop",
    serialNumber: "MBP-001",
    isNew: true,
    photo: "",
    specification: "M1 Max, 32GB RAM, 1TB SSD",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    priceUSD: 2500,
    priceUAH: 95000,
    defaultCurrency: "USD",
    groupName: "Laptops",
  },
  {
    title: "iPhone 14 Pro",
    type: "Phone",
    serialNumber: "IPH14PRO-001",
    isNew: true,
    photo: "",
    specification: "256GB, Deep Purple",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    priceUSD: 1300,
    priceUAH: 50000,
    defaultCurrency: "USD",
    groupName: "Phones",
  },
  {
    title: "Dell Monitor",
    type: "Monitor",
    serialNumber: "DELL-1080P",
    isNew: true,
    photo: "",
    specification: '27", IPS, 1080p',
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    priceUSD: 300,
    priceUAH: 11000,
    defaultCurrency: "UAH",
    groupName: "Monitors",
  },
  {
    title: "LG UltraFine",
    type: "Monitor",
    serialNumber: "LG-UF-4K",
    isNew: true,
    photo: "",
    specification: '32", 4K, Thunderbolt 3',
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ).toISOString(),
    priceUSD: 650,
    priceUAH: 23000,
    defaultCurrency: "USD",
    groupName: "Monitors",
  },
  {
    title: "Samsung Galaxy S23",
    type: "Phone",
    serialNumber: "SGS23-001",
    isNew: true,
    photo: "",
    specification: "256GB, Phantom Black",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    priceUSD: 1000,
    priceUAH: 40000,
    defaultCurrency: "UAH",
    groupName: "Phones",
  },
  {
    title: "Apple Magic Keyboard",
    type: "Accessory",
    serialNumber: "MAGKEY-001",
    isNew: true,
    photo: "",
    specification: "Wireless, Touch ID",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ).toISOString(),
    priceUSD: 150,
    priceUAH: 5700,
    defaultCurrency: "USD",
    groupName: "Accessories",
  },
  {
    title: "HP LaserJet Pro",
    type: "Printer",
    serialNumber: "HPLJ-001",
    isNew: true,
    photo: "",
    specification: "Mono Laser, Wi-Fi",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ).toISOString(),
    priceUSD: 280,
    priceUAH: 10500,
    defaultCurrency: "UAH",
    groupName: "Printers",
  },
  {
    title: "Epson EcoTank L3250",
    type: "Printer",
    serialNumber: "EP-L3250",
    isNew: false,
    photo: "",
    specification: "Color InkTank, Wi-Fi",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ).toISOString(),
    priceUSD: 240,
    priceUAH: 8800,
    defaultCurrency: "UAH",
    groupName: "Printers",
  },
  {
    title: "Logitech Brio 4K",
    type: "Accessory",
    serialNumber: "LOGI-BRIO",
    isNew: true,
    photo: "",
    specification: "Webcam 4K HDR",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ).toISOString(),
    priceUSD: 200,
    priceUAH: 7500,
    defaultCurrency: "USD",
    groupName: "Accessories",
  },
  {
    title: "Anker USB-C Hub",
    type: "Accessory",
    serialNumber: "ANKER-HUB",
    isNew: true,
    photo: "",
    specification: "7-in-1 USB-C Dock",
    guaranteeStart: new Date().toISOString(),
    guaranteeEnd: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ).toISOString(),
    priceUSD: 60,
    priceUAH: 2300,
    defaultCurrency: "UAH",
    groupName: "Accessories",
  },
];
