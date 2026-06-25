const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const dotenv = require('dotenv')
const connectDB = require('./config/db')
const Product = require('./models/Product')

dotenv.config()
connectDB()

const products = [
  { name: "Wireless Headphones", price: 2999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", category: "Electronics", description: "High quality wireless headphones with noise cancellation.", stock: 25 },
  { name: "Smart Watch", price: 4999, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80", category: "Electronics", description: "Smart watch with heart rate monitor and GPS.", stock: 20 },
  { name: "Bluetooth Speaker", price: 3299, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80", category: "Electronics", description: "Portable bluetooth speaker with 360 degree sound.", stock: 30 },
  { name: "Laptop Sleeve", price: 899, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&q=80", category: "Electronics", description: "Premium laptop sleeve with extra padding.", stock: 40 },
  { name: "Rose Gold Watch", price: 5999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", category: "Watches", description: "Elegant rose gold watch with leather strap.", stock: 15 },
  { name: "Luxury Diamond Watch", price: 12999, image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=300&q=80", category: "Watches", description: "Luxury diamond studded watch for special occasions.", stock: 10 },
  { name: "Elegant Silver Watch", price: 7499, image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=300&q=80", category: "Watches", description: "Classic silver watch with stainless steel strap.", stock: 18 },
  { name: "Floral Rose Perfume", price: 3499, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=300&q=80", category: "Perfumes", description: "Romantic floral rose perfume with hints of jasmine.", stock: 35 },
  { name: "Luxury Oud Perfume", price: 5999, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&q=80", category: "Perfumes", description: "Rich and luxurious oud perfume with oriental notes.", stock: 22 },
  { name: "Sweet Vanilla Mist", price: 2499, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80", category: "Perfumes", description: "Light and sweet vanilla body mist.", stock: 28 },
  { name: "Matte Lipstick Set", price: 1299, image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=300&q=80", category: "Makeup", description: "Set of 6 matte lipsticks in beautiful shades.", stock: 50 },
  { name: "Foundation Kit", price: 2199, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80", category: "Makeup", description: "Full coverage foundation kit with primer.", stock: 32 },
  { name: "Eyeshadow Palette", price: 1799, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80", category: "Makeup", description: "24 shade eyeshadow palette with matte and shimmer.", stock: 27 },
  { name: "Highlighter & Blush", price: 999, image: "https://images.unsplash.com/photo-1596462502278-27bfdc348?w=300&q=80", category: "Makeup", description: "Duo highlighter and blush palette.", stock: 38 },
  { name: "Floral Maxi Dress", price: 3999, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80", category: "Clothes", description: "Beautiful floral maxi dress for summer.", stock: 20 },
  { name: "Casual Kurti", price: 1499, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80", category: "Clothes", description: "Comfortable casual kurti in pure cotton.", stock: 45 },
  { name: "Party Wear Dress", price: 5499, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80", category: "Clothes", description: "Stunning party wear dress with embellishments.", stock: 12 },
  { name: "Cozy Sweater", price: 2299, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80", category: "Clothes", description: "Super soft sweater for winter evenings.", stock: 24 },
  { name: "Pink Tote Bag", price: 2999, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&q=80", category: "Bags", description: "Spacious pink tote bag with inner pockets.", stock: 19 },
  { name: "Leather Handbag", price: 4999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80", category: "Bags", description: "Premium leather handbag with gold hardware.", stock: 14 },
  { name: "Mini Crossbody Bag", price: 1999, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80", category: "Bags", description: "Cute mini crossbody bag for essentials.", stock: 30 },
  { name: "Backpack", price: 2499, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", category: "Bags", description: "Stylish backpack with laptop compartment.", stock: 26 },
  { name: "Running Shoes", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", category: "Fashion", description: "Lightweight running shoes with memory foam.", stock: 33 },
  { name: "Sunglasses", price: 1499, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", category: "Fashion", description: "UV400 protection polarized sunglasses.", stock: 41 },
  { name: "Water Bottle", price: 599, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80", category: "Accessories", description: "Stainless steel insulated water bottle.", stock: 55 },
]

const importData = async () => {
  try {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('✅ Data Imported Successfully!')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    console.log('🗑️ Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}