/**
 * Shared mock data for dashboard modules.
 * In production, this would be fetched from your backend API.
 */

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';
export type MealStatus = 'Available' | 'Low Stock' | 'Served';
export type MealVisibility = 'Published' | 'Draft';
export type MealDemand = 'High' | 'Medium' | 'Low';

export interface Meal {
  id: string;
  type: MealType;
  name: string;
  title: string;
  description: string;
  time: string;
  timeEnd: string;
  remaining: number;
  totalServings: number;
  status: MealStatus;
  visibility: MealVisibility;
  calories: number;
  chef: string;
  station: string;
  allergens: string[];
  labels: string[];
  notes: string;
  demand: MealDemand;
  image?: string;
  isPopular?: boolean;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface DailyMenu {
  date: string;
  day: string;
  meals: Meal[];
}

export interface Invoice {
  id: string;
  type: 'Rent' | 'Meals' | 'Utilities';
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  description: string;
}

export interface TenantData {
  tenantId: string;
  name: string;
  room: string;
  mealCredits: number;
  mealCreditsExpiry: string;
}

type MealSeed = Omit<Meal, 'title' | 'nutrition'>;

const createMeal = (meal: MealSeed): Meal => ({
  ...meal,
  title: meal.name,
  nutrition: {
    calories: meal.calories,
    protein: meal.type === 'Breakfast' ? '18g' : meal.type === 'Lunch' ? '32g' : '28g',
    carbs: meal.type === 'Breakfast' ? '42g' : meal.type === 'Lunch' ? '48g' : '36g',
    fat: meal.type === 'Breakfast' ? '12g' : meal.type === 'Lunch' ? '18g' : '20g',
  },
});

// Current tenant
export const CURRENT_TENANT: TenantData = {
  tenantId: 'RES-8820',
  name: 'Sarah Johnson',
  room: 'A-402',
  mealCredits: 15,
  mealCreditsExpiry: 'May 15, 2026',
};

// Today's menu aligned with the current workspace date: April 21, 2026.
export const TODAY_MENU: DailyMenu = {
  date: 'April 21, 2026',
  day: 'Tuesday',
  meals: [
    createMeal({
      id: 'MEAL-2101',
      type: 'Breakfast',
      name: 'Harvest Oat Bowl',
      description: 'Steel-cut oats, berry compote, roasted almonds, and Greek yogurt.',
      time: '07:00',
      timeEnd: '10:00',
      remaining: 44,
      totalServings: 90,
      status: 'Available',
      visibility: 'Published',
      calories: 360,
      chef: 'Chef Lina Hart',
      station: 'North Dining Hall',
      allergens: ['Milk', 'Tree Nuts'],
      labels: ['Chef Pick', 'High Fiber'],
      notes: 'Core breakfast item for early resident traffic.',
      demand: 'Medium',
      image: '/dining-hall.jpg',
      isPopular: true,
      dietary: { vegetarian: true, vegan: false, glutenFree: false },
    }),
    createMeal({
      id: 'MEAL-2102',
      type: 'Lunch',
      name: 'Lemongrass Chicken Rice Bowl',
      description: 'Grilled chicken, jasmine rice, charred vegetables, and citrus herb dressing.',
      time: '12:00',
      timeEnd: '14:30',
      remaining: 38,
      totalServings: 130,
      status: 'Available',
      visibility: 'Published',
      calories: 590,
      chef: 'Chef Adrian Cole',
      station: 'Central Service Line',
      allergens: ['Soy'],
      labels: ['Campus Favorite', 'Balanced Plate'],
      notes: 'Keep backup garnish at station 2 for midday rush.',
      demand: 'High',
      image: '/gourmet-dining.jpg',
      isPopular: true,
      dietary: { vegetarian: false, vegan: false, glutenFree: true },
    }),
    createMeal({
      id: 'MEAL-2103',
      type: 'Lunch',
      name: 'Roasted Cauliflower Tahini Plate',
      description: 'Cauliflower, freekeh, tahini drizzle, chickpeas, and herb salad.',
      time: '12:00',
      timeEnd: '14:30',
      remaining: 16,
      totalServings: 70,
      status: 'Low Stock',
      visibility: 'Published',
      calories: 430,
      chef: 'Chef Amaya Brooks',
      station: 'Wellness Counter',
      allergens: ['Sesame', 'Gluten'],
      labels: ['Vegetarian', 'Wellness'],
      notes: 'Reforecast portions if evening vegetarian demand increases.',
      demand: 'Medium',
      image: '/dining-hall.jpg',
      dietary: { vegetarian: true, vegan: true, glutenFree: false },
    }),
    createMeal({
      id: 'MEAL-2104',
      type: 'Dinner',
      name: 'Seared Salmon with Lemon Barley',
      description: 'Pan-seared salmon, barley pilaf, green beans, and dill butter.',
      time: '18:00',
      timeEnd: '20:30',
      remaining: 12,
      totalServings: 95,
      status: 'Low Stock',
      visibility: 'Published',
      calories: 610,
      chef: 'Chef Adrian Cole',
      station: 'Signature Grill',
      allergens: ['Fish', 'Milk', 'Gluten'],
      labels: ['Dinner Feature'],
      notes: 'Escalate replenishment if remaining drops below 10 portions.',
      demand: 'High',
      image: '/gourmet-dining.jpg',
      dietary: { vegetarian: false, vegan: false, glutenFree: false },
    }),
  ],
};

export const WEEKLY_MENU: DailyMenu[] = [
  TODAY_MENU,
  {
    date: 'April 22, 2026',
    day: 'Wednesday',
    meals: [
      createMeal({
        id: 'MEAL-2201',
        type: 'Breakfast',
        name: 'Scrambled Eggs and Herb Toast',
        description: 'Free-range eggs, sourdough toast, roasted tomato, and fruit cup.',
        time: '07:00',
        timeEnd: '10:00',
        remaining: 52,
        totalServings: 100,
        status: 'Available',
        visibility: 'Published',
        calories: 390,
        chef: 'Chef Lina Hart',
        station: 'North Dining Hall',
        allergens: ['Egg', 'Gluten'],
        labels: ['Protein Start'],
        notes: 'Standard breakfast volume with commuter resident overlap.',
        demand: 'Medium',
        image: '/dining-hall.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2202',
        type: 'Lunch',
        name: 'Thai Green Curry',
        description: 'Chicken green curry, jasmine rice, basil, and seasonal vegetables.',
        time: '12:00',
        timeEnd: '14:30',
        remaining: 58,
        totalServings: 140,
        status: 'Available',
        visibility: 'Published',
        calories: 540,
        chef: 'Chef Adrian Cole',
        station: 'Central Service Line',
        allergens: ['Soy'],
        labels: ['High Demand'],
        notes: 'Prep additional rice pan before 13:00 window.',
        demand: 'High',
        image: '/gourmet-dining.jpg',
        isPopular: true,
        dietary: { vegetarian: false, vegan: false, glutenFree: true },
      }),
      createMeal({
        id: 'MEAL-2203',
        type: 'Dinner',
        name: 'Pasta Primavera',
        description: 'Penne, roasted vegetables, basil cream, and parmesan finish.',
        time: '18:00',
        timeEnd: '20:00',
        remaining: 72,
        totalServings: 120,
        status: 'Available',
        visibility: 'Published',
        calories: 560,
        chef: 'Chef Amaya Brooks',
        station: 'Pasta Corner',
        allergens: ['Milk', 'Gluten'],
        labels: ['Vegetarian'],
        notes: 'Offer gluten-free alternative pan at counter.',
        demand: 'Medium',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
    ],
  },
  {
    date: 'April 23, 2026',
    day: 'Thursday',
    meals: [
      createMeal({
        id: 'MEAL-2301',
        type: 'Breakfast',
        name: 'Banana Protein Pancakes',
        description: 'Banana oat pancakes, maple drizzle, and seasonal fruit.',
        time: '07:00',
        timeEnd: '10:00',
        remaining: 46,
        totalServings: 90,
        status: 'Available',
        visibility: 'Published',
        calories: 410,
        chef: 'Chef Lina Hart',
        station: 'Bakery Bar',
        allergens: ['Egg', 'Milk', 'Gluten'],
        labels: ['Popular'],
        notes: 'Monitor syrup stock during breakfast rush.',
        demand: 'High',
        image: '/dining-hall.jpg',
        isPopular: true,
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2302',
        type: 'Lunch',
        name: 'Moroccan Chickpea Tagine',
        description: 'Slow-cooked chickpeas, apricot couscous, and herb yogurt.',
        time: '12:00',
        timeEnd: '14:30',
        remaining: 34,
        totalServings: 110,
        status: 'Available',
        visibility: 'Published',
        calories: 470,
        chef: 'Chef Amaya Brooks',
        station: 'Wellness Counter',
        allergens: ['Milk', 'Gluten'],
        labels: ['Vegetarian', 'Wellness'],
        notes: 'Keep vegan garnish separate at pickup.',
        demand: 'Medium',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2303',
        type: 'Dinner',
        name: 'Pepper Steak with Garlic Greens',
        description: 'Seared beef strips, garlic greens, and roasted potatoes.',
        time: '18:00',
        timeEnd: '20:30',
        remaining: 19,
        totalServings: 115,
        status: 'Low Stock',
        visibility: 'Published',
        calories: 640,
        chef: 'Chef Adrian Cole',
        station: 'Signature Grill',
        allergens: [],
        labels: ['Dinner Feature'],
        notes: 'Flag extra grill support for evening service.',
        demand: 'High',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: false, vegan: false, glutenFree: true },
      }),
    ],
  },
  {
    date: 'April 24, 2026',
    day: 'Friday',
    meals: [
      createMeal({
        id: 'MEAL-2401',
        type: 'Breakfast',
        name: 'Avocado Egg Muffin',
        description: 'Whole-grain muffin, egg, avocado smash, and citrus salad.',
        time: '07:00',
        timeEnd: '10:00',
        remaining: 55,
        totalServings: 95,
        status: 'Available',
        visibility: 'Published',
        calories: 370,
        chef: 'Chef Lina Hart',
        station: 'Grab and Go',
        allergens: ['Egg', 'Gluten'],
        labels: ['Fast Pickup'],
        notes: 'Designed for commuter-heavy Friday morning traffic.',
        demand: 'Medium',
        image: '/dining-hall.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2402',
        type: 'Lunch',
        name: 'Teriyaki Tofu Noodle Bowl',
        description: 'Rice noodles, teriyaki tofu, snap peas, and sesame greens.',
        time: '12:00',
        timeEnd: '14:30',
        remaining: 41,
        totalServings: 100,
        status: 'Available',
        visibility: 'Published',
        calories: 500,
        chef: 'Chef Amaya Brooks',
        station: 'Wellness Counter',
        allergens: ['Soy', 'Sesame'],
        labels: ['Vegan'],
        notes: 'Suitable for late lunch hold service.',
        demand: 'Medium',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: true, vegan: true, glutenFree: true },
      }),
      createMeal({
        id: 'MEAL-2403',
        type: 'Dinner',
        name: 'Citrus Roast Chicken',
        description: 'Roast chicken, quinoa tabbouleh, and glazed carrots.',
        time: '18:00',
        timeEnd: '20:30',
        remaining: 68,
        totalServings: 120,
        status: 'Available',
        visibility: 'Published',
        calories: 600,
        chef: 'Chef Adrian Cole',
        station: 'Central Service Line',
        allergens: [],
        labels: ['Weekend Launch'],
        notes: 'Expected steady evening traffic from on-campus residents.',
        demand: 'High',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: false, vegan: false, glutenFree: true },
      }),
    ],
  },
  {
    date: 'April 25, 2026',
    day: 'Saturday',
    meals: [
      createMeal({
        id: 'MEAL-2501',
        type: 'Breakfast',
        name: 'Brunch French Toast',
        description: 'Brioche French toast, berry compote, and vanilla yogurt.',
        time: '08:00',
        timeEnd: '11:00',
        remaining: 29,
        totalServings: 85,
        status: 'Available',
        visibility: 'Published',
        calories: 450,
        chef: 'Chef Lina Hart',
        station: 'Weekend Brunch Bar',
        allergens: ['Egg', 'Milk', 'Gluten'],
        labels: ['Weekend Special'],
        notes: 'Watch dairy usage against brunch uplift.',
        demand: 'High',
        image: '/dining-hall.jpg',
        isPopular: true,
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2502',
        type: 'Lunch',
        name: 'Mediterranean Chicken Pita',
        description: 'Grilled chicken, pita, cucumber salad, and garlic yogurt.',
        time: '12:00',
        timeEnd: '14:00',
        remaining: 63,
        totalServings: 115,
        status: 'Available',
        visibility: 'Published',
        calories: 530,
        chef: 'Chef Adrian Cole',
        station: 'Courtyard Station',
        allergens: ['Milk', 'Gluten'],
        labels: ['Outdoor Service'],
        notes: 'Bundle with side salad at service point.',
        demand: 'Medium',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: false, vegan: false, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2503',
        type: 'Dinner',
        name: 'Mushroom Risotto',
        description: 'Arborio rice, wild mushrooms, parmesan, and herb oil.',
        time: '18:00',
        timeEnd: '20:00',
        remaining: 11,
        totalServings: 75,
        status: 'Low Stock',
        visibility: 'Published',
        calories: 520,
        chef: 'Chef Amaya Brooks',
        station: 'Chef Feature Station',
        allergens: ['Milk'],
        labels: ['Vegetarian', 'Chef Feature'],
        notes: 'Portion carefully to preserve final service window.',
        demand: 'High',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: true },
      }),
    ],
  },
  {
    date: 'April 26, 2026',
    day: 'Sunday',
    meals: [
      createMeal({
        id: 'MEAL-2601',
        type: 'Breakfast',
        name: 'Garden Frittata',
        description: 'Oven-baked frittata, roasted potatoes, and citrus fruit.',
        time: '08:00',
        timeEnd: '11:00',
        remaining: 36,
        totalServings: 80,
        status: 'Available',
        visibility: 'Published',
        calories: 340,
        chef: 'Chef Lina Hart',
        station: 'North Dining Hall',
        allergens: ['Egg', 'Milk'],
        labels: ['Weekend Brunch'],
        notes: 'Stable output, no intervention expected.',
        demand: 'Low',
        image: '/dining-hall.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: true },
      }),
      createMeal({
        id: 'MEAL-2602',
        type: 'Lunch',
        name: 'Roast Vegetable Grain Bowl',
        description: 'Farro, roast vegetables, hummus, and herb vinaigrette.',
        time: '12:00',
        timeEnd: '14:00',
        remaining: 49,
        totalServings: 95,
        status: 'Available',
        visibility: 'Published',
        calories: 460,
        chef: 'Chef Amaya Brooks',
        station: 'Wellness Counter',
        allergens: ['Gluten', 'Sesame'],
        labels: ['Plant Forward'],
        notes: 'Pairs with low weekend resident turnout.',
        demand: 'Low',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: true, vegan: true, glutenFree: false },
      }),
      createMeal({
        id: 'MEAL-2603',
        type: 'Dinner',
        name: 'Slow-Braised Beef Stew',
        description: 'Braised beef, root vegetables, and warm dinner roll.',
        time: '18:00',
        timeEnd: '20:00',
        remaining: 0,
        totalServings: 110,
        status: 'Served',
        visibility: 'Published',
        calories: 650,
        chef: 'Chef Adrian Cole',
        station: 'Signature Grill',
        allergens: ['Gluten'],
        labels: ['Closed Service'],
        notes: 'Service completed. Archive after review.',
        demand: 'High',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: false, vegan: false, glutenFree: false },
      }),
    ],
  },
  {
    date: 'April 27, 2026',
    day: 'Monday',
    meals: [
      createMeal({
        id: 'MEAL-2701',
        type: 'Breakfast',
        name: 'Blueberry Chia Parfait',
        description: 'Layered yogurt parfait with chia, granola, and blueberries.',
        time: '07:00',
        timeEnd: '10:00',
        remaining: 61,
        totalServings: 100,
        status: 'Available',
        visibility: 'Draft',
        calories: 330,
        chef: 'Chef Lina Hart',
        station: 'Grab and Go',
        allergens: ['Milk', 'Tree Nuts'],
        labels: ['Draft Menu'],
        notes: 'Awaiting final procurement confirmation for berry stock.',
        demand: 'Medium',
        image: '/dining-hall.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: true },
      }),
      createMeal({
        id: 'MEAL-2702',
        type: 'Lunch',
        name: 'Korean Beef Rice Bowl',
        description: 'Marinated beef, steamed rice, pickled vegetables, and sesame greens.',
        time: '12:00',
        timeEnd: '14:30',
        remaining: 74,
        totalServings: 130,
        status: 'Available',
        visibility: 'Draft',
        calories: 610,
        chef: 'Chef Adrian Cole',
        station: 'Central Service Line',
        allergens: ['Soy', 'Sesame'],
        labels: ['Draft Menu'],
        notes: 'Pending final sign-off on spice level communication.',
        demand: 'High',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: false, vegan: false, glutenFree: true },
      }),
      createMeal({
        id: 'MEAL-2703',
        type: 'Dinner',
        name: 'Spinach Ricotta Lasagna',
        description: 'Vegetable lasagna, basil tomato sauce, and side salad.',
        time: '18:00',
        timeEnd: '20:00',
        remaining: 66,
        totalServings: 105,
        status: 'Available',
        visibility: 'Draft',
        calories: 580,
        chef: 'Chef Amaya Brooks',
        station: 'Pasta Corner',
        allergens: ['Milk', 'Gluten'],
        labels: ['Draft Menu', 'Vegetarian'],
        notes: 'Requires Monday publish approval from admin.',
        demand: 'Medium',
        image: '/gourmet-dining.jpg',
        dietary: { vegetarian: true, vegan: false, glutenFree: false },
      }),
    ],
  },
];

// Recent invoices
export const INVOICES: Invoice[] = [
  {
    id: 'INV-2026-0420',
    type: 'Rent',
    date: 'April 20, 2026',
    dueDate: 'May 1, 2026',
    amount: 1200,
    status: 'Pending',
    description: 'Monthly rent - Room A-402',
  },
  {
    id: 'INV-2026-0415',
    type: 'Meals',
    date: 'April 15, 2026',
    dueDate: 'April 25, 2026',
    amount: 125,
    status: 'Pending',
    description: 'Meal plan charges (April 1-15)',
  },
  {
    id: 'INV-2026-0410',
    type: 'Utilities',
    date: 'April 10, 2026',
    dueDate: 'April 20, 2026',
    amount: 45.5,
    status: 'Paid',
    paidDate: 'April 18, 2026',
    description: 'Water & electricity usage',
  },
  {
    id: 'INV-2026-0401',
    type: 'Rent',
    date: 'April 1, 2026',
    dueDate: 'April 15, 2026',
    amount: 1200,
    status: 'Paid',
    paidDate: 'April 12, 2026',
    description: 'Monthly rent - Room A-402',
  },
  {
    id: 'INV-2026-0320',
    type: 'Meals',
    date: 'March 20, 2026',
    dueDate: 'April 5, 2026',
    amount: 125,
    status: 'Paid',
    paidDate: 'April 3, 2026',
    description: 'Meal plan charges (March 16-31)',
  },
];

// Financial summary
export const FINANCIAL_SUMMARY = {
  totalOwed: 1370.5,
  paidYTD: 2570,
  pendingCount: 2,
  reservedMeals: 1,
};
