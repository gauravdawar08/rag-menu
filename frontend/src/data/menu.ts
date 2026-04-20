export interface MenuItem {
  id: string
  name: string
  description: string
  sizes: { label: string; price: number }[]
  dietary: string[]
  addOns?: { label: string; price: number }[]
  notes?: string
  popular?: boolean
}

export interface MenuSection {
  id: string
  title: string
  subtitle?: string
  items: MenuItem[]
}

export const cafeInfo = {
  name: "Brew & Bite",
  tagline: "A neighbourhood café",
  location: "Sydney, NSW",
  address: "88 Crown Street, Surry Hills",
  hours: {
    weekday: "6:30 AM — 4:00 PM",
    weekend: "7:00 AM — 5:00 PM",
  },
  phone: "+61 2 9876 5432",
  instagram: "@brewandbite.syd",
}

export const menuSections: MenuSection[] = [
  {
    id: "coffee",
    title: "Coffee",
    subtitle: "Specialty beans roasted weekly in Redfern",
    items: [
      {
        id: "coffee_001",
        name: "Flat White",
        description: "Velvety smooth espresso with microfoam milk. Our signature Sydney-style with a double shot.",
        sizes: [{ label: "REG", price: 4.8 }, { label: "LG", price: 5.5 }],
        dietary: ["V"],
        addOns: [
          { label: "Oat milk", price: 1.0 },
          { label: "Almond milk", price: 1.0 },
          { label: "Extra shot", price: 0.5 },
        ],
        popular: true,
      },
      {
        id: "coffee_002",
        name: "Cappuccino",
        description: "Classic Italian-style with equal parts espresso, steamed milk, and foam. Topped with chocolate powder.",
        sizes: [{ label: "REG", price: 4.8 }, { label: "LG", price: 5.5 }],
        dietary: ["V"],
        addOns: [
          { label: "Oat milk", price: 1.0 },
          { label: "Extra shot", price: 0.5 },
        ],
      },
      {
        id: "coffee_003",
        name: "Latte",
        description: "Smooth and creamy espresso with steamed milk and a thin layer of foam. Milder than a flat white.",
        sizes: [{ label: "REG", price: 4.8 }, { label: "LG", price: 5.5 }],
        dietary: ["V"],
        addOns: [
          { label: "Flavoured syrup", price: 0.8 },
          { label: "Oat milk", price: 1.0 },
        ],
      },
      {
        id: "coffee_004",
        name: "Mocha",
        description: "Rich espresso with steamed milk, chocolate syrup, and whipped cream. A sweet chocolate-coffee treat.",
        sizes: [{ label: "REG", price: 5.8 }, { label: "LG", price: 6.5 }],
        dietary: ["V"],
        addOns: [
          { label: "Dark chocolate", price: 0.8 },
          { label: "Extra chocolate", price: 0.5 },
        ],
      },
      {
        id: "coffee_005",
        name: "Long Black",
        description: "Double shot espresso diluted with hot water. Strong and bold Australian favourite.",
        sizes: [{ label: "REG", price: 4.5 }, { label: "LG", price: 5.0 }],
        dietary: ["VG", "DF", "GF"],
        notes: "Milk on side available free",
      },
    ],
  },
  {
    id: "cold_coffee",
    title: "Cold Coffee",
    subtitle: "Slow-steeped, low-acidity, refreshing",
    items: [
      {
        id: "coffee_006",
        name: "Cold Brew",
        description: "Smooth, low-acidity coffee steeped cold for 18 hours. Naturally sweet and refreshing.",
        sizes: [{ label: "REG", price: 6.0 }, { label: "LG", price: 7.5 }],
        dietary: ["VG", "DF", "GF"],
        addOns: [
          { label: "Plant milk", price: 1.0 },
          { label: "Vanilla syrup", price: 0.8 },
        ],
        popular: true,
      },
      {
        id: "coffee_007",
        name: "Iced Latte",
        description: "Chilled espresso with cold milk over ice. Light and refreshing.",
        sizes: [{ label: "REG", price: 5.5 }, { label: "LG", price: 6.5 }],
        dietary: ["V"],
        addOns: [
          { label: "Oat milk", price: 1.0 },
          { label: "Flavoured syrup", price: 0.8 },
        ],
      },
    ],
  },
  {
    id: "non_coffee",
    title: "Non-Coffee",
    subtitle: "Matcha, chocolate, and fresh juice",
    items: [
      {
        id: "drink_002",
        name: "Matcha Latte",
        description: "Ceremonial grade matcha green tea with steamed milk. Smooth, earthy, and energising.",
        sizes: [{ label: "REG", price: 5.8 }, { label: "LG", price: 6.8 }],
        dietary: ["V"],
        addOns: [
          { label: "Iced", price: 0.5 },
          { label: "Oat milk", price: 1.0 },
        ],
      },
      {
        id: "drink_003",
        name: "Hot Chocolate",
        description: "Rich and creamy hot chocolate with real dark chocolate. Topped with whipped cream and marshmallows.",
        sizes: [{ label: "REG", price: 5.0 }, { label: "LG", price: 6.0 }],
        dietary: ["V"],
        addOns: [{ label: "White chocolate", price: 0.5 }],
      },
      {
        id: "drink_001",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed. No added sugar, 100% pure fruit.",
        sizes: [{ label: "REG", price: 6.5 }, { label: "LG", price: 8.0 }],
        dietary: ["VG", "DF", "GF"],
      },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    subtitle: "Served all day. Because mornings are subjective.",
    items: [
      {
        id: "food_001",
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with cherry tomatoes, feta, olive oil, and lemon. Classic Aussie breakfast.",
        sizes: [{ label: "", price: 16.0 }],
        dietary: ["V"],
        addOns: [
          { label: "Poached egg", price: 3.0 },
          { label: "Bacon", price: 4.0 },
          { label: "Smoked salmon", price: 5.0 },
          { label: "GF bread", price: 3.0 },
        ],
        notes: "Vegan without feta",
        popular: true,
      },
      {
        id: "food_002",
        name: "Eggs Benedict",
        description: "Poached eggs on toasted English muffin with ham and hollandaise sauce. Rich and indulgent.",
        sizes: [{ label: "", price: 18.0 }],
        dietary: [],
        addOns: [
          { label: "Smoked salmon", price: 3.0 },
          { label: "Extra hollandaise", price: 2.0 },
        ],
        notes: "Served until 2pm",
      },
      {
        id: "food_003",
        name: "Acai Bowl",
        description: "Thick acai smoothie bowl topped with granola, fresh berries, banana, coconut, and honey.",
        sizes: [{ label: "", price: 15.0 }],
        dietary: ["V"],
        addOns: [
          { label: "Peanut butter", price: 2.0 },
          { label: "Protein powder", price: 3.0 },
          { label: "Chia seeds", price: 1.0 },
        ],
        notes: "Vegan without honey, GF without granola",
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    subtitle: "From 11am onwards",
    items: [
      {
        id: "food_004",
        name: "Chicken Caesar Wrap",
        description: "Grilled chicken, cos lettuce, parmesan, bacon, and Caesar dressing in a tortilla wrap. Hearty and satisfying.",
        sizes: [{ label: "", price: 14.0 }],
        dietary: [],
        addOns: [
          { label: "Extra chicken", price: 4.0 },
          { label: "Avocado", price: 3.0 },
          { label: "GF wrap", price: 2.0 },
        ],
      },
      {
        id: "food_005",
        name: "Falafel Wrap",
        description: "Crispy falafel with hummus, tahini, lettuce, tomato, cucumber, and pickled cabbage. Vegan and delicious.",
        sizes: [{ label: "", price: 13.0 }],
        dietary: ["VG", "V", "DF"],
        addOns: [
          { label: "Avocado", price: 3.0 },
          { label: "Halloumi", price: 4.0 },
          { label: "GF wrap", price: 2.0 },
        ],
      },
    ],
  },
  {
    id: "pastry",
    title: "Pastry & Sweet",
    subtitle: "Baked fresh daily. Until they're gone.",
    items: [
      {
        id: "food_006",
        name: "Banana Bread",
        description: "Homemade moist banana bread with walnuts. Served toasted with butter.",
        sizes: [{ label: "slice", price: 6.5 }],
        dietary: ["V"],
        addOns: [
          { label: "Nutella", price: 2.0 },
          { label: "Peanut butter", price: 2.0 },
        ],
        notes: "Contains walnuts",
      },
      {
        id: "food_007",
        name: "Blueberry Muffin",
        description: "Fluffy muffin packed with fresh blueberries. A classic sweet treat.",
        sizes: [{ label: "", price: 5.5 }],
        dietary: ["V"],
      },
      {
        id: "food_008",
        name: "Vegan Brownie",
        description: "Rich, fudgy chocolate brownie made without eggs or dairy. Dense and decadent.",
        sizes: [{ label: "", price: 6.0 }],
        dietary: ["VG", "V", "DF"],
        popular: true,
      },
    ],
  },
]

export const dietaryLegend = [
  { tag: "V", label: "Vegetarian" },
  { tag: "VG", label: "Vegan" },
  { tag: "DF", label: "Dairy free" },
  { tag: "GF", label: "Gluten free" },
  { tag: "VO", label: "Vegetarian option" },
  { tag: "VGO", label: "Vegan option" },
  { tag: "DFO", label: "Dairy free option" },
  { tag: "GFO", label: "Gluten free option" },
]
