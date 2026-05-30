import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // --- SPECIALITY TANDOOR & PLATTERS (category: tandoor) ---
  {
    id: "t-achari",
    name: "Achari Chaap",
    price: 219,
    description: "Soya sticks marinated in rich yogurt, a custom blend of in-house spices, and tangy pickle masala. Cooked in clay oven and served with Mint Chutney.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "t-afghani",
    name: "Afghani Chaap",
    price: 266,
    description: "Soya chaap chunks marinated in smooth cashew cream and light spices, roasted over glowing charcoal with onions and capsicums.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "t-chatpati",
    name: "Chatpati Chaap",
    price: 266,
    description: "Authentic Punjabi style soya chaap marinated in a dry ground pepper and spice blend, giving an appetizing tangy/chatpata kick.",
    category: "tandoor",
    veg: true,
    spicyLevel: 3
  },
  {
    id: "t-diet",
    name: "Diet Chaap",
    price: 219,
    description: "Guilt-free boiled soya chunks lightly tossed with grilled seasonal vegetables, fresh lemon squeeze, and chat masala.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-garlic-soya",
    name: "Garlic Soya Tikka",
    price: 219,
    description: "Juicy soya chunks marinated deep in yogurt garlic seasoning, slow-roasted to smoky golden perfection. Served with mint chutney.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "t-malai",
    name: "Malai Chaap",
    price: 219,
    description: "Melt-in-the-mouth soft malai chaap loaded with cardamom cream, tossed with fresh butter. An SGF absolute favorite.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "t-masala",
    name: "Masala Chaap",
    price: 219,
    description: "Traditional soft soya sticks marinated in spiced red curd, baked, and tossed with ample Amul Butter and light cream.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "t-peri",
    name: "Peri-Peri Soya Tikka",
    price: 219,
    description: "Spicy cubes of Soya marinated in dry chef special Peri-Peri African pepper rub. Roasted nicely in clay oven with capsicum.",
    category: "tandoor",
    veg: true,
    spicyLevel: 3
  },
  {
    id: "t-pudina",
    name: "Pudina Chaap",
    price: 219,
    description: "Refreshing garden mint leaf paste marinade blended with cream and roasted to a tender, smoky bite inside the tandoor.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-sgf-special",
    name: "SGF Special Chaap",
    price: 266,
    description: "Our prized recipe! Balancing sweet and fiery nodes with a mustard punch that hits your tastebuds beautifully.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "t-stuff",
    name: "Stuff Chaap",
    price: 219,
    description: "Premium soya sticks stuffed with rich cottage cheese (paneer) and chopped dry fruit nuts, cooked till golden.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-sufi",
    name: "Sufi Chaap",
    price: 219,
    description: "White paste-marinated soya slices baked nicely and loaded with pure butter and rich cream.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-garlic-paneer",
    name: "Garlic Paneer Tikka",
    price: 219,
    description: "Fresh premium cottage cheese cubes doused with ginger-garlic paste and grilled with tomato and onion petals.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "t-mushroom",
    name: "Mushroom Tikka",
    price: 219,
    description: "Select button mushrooms marinated in classic tandoori paste, brushed with melted butter and charred cleanly.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "t-paneer-tikka",
    name: "Paneer Tikka",
    price: 219,
    description: "Authentic cottage cheese cubes marinated in spiced curd with bell peppers and standard spices, charred beautifully.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "t-peri-paneer",
    name: "Peri-Peri Paneer Tikka",
    price: 219,
    description: "Chef's specialty fiery African peri-peri chili rub on succulent cottage cheese cubes.",
    category: "tandoor",
    veg: true,
    spicyLevel: 3
  },
  {
    id: "t-stuff-aloo",
    name: "Stuff Aloo",
    price: 345,
    description: "Thick potato barrels scooped out, stuffed with spiced mash and dry fruits, baked perfectly. [4 Pcs]",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-boti",
    name: "Veg Boti Tikka",
    price: 229,
    description: "Soya chunks and vegetable boti spiced inside curd marinade, roasted over charcoal.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "t-platter",
    name: "SGF Special Veg Platter",
    price: 575,
    description: "Elite feast! [2 Pcs Each] Paneer Tikka, Stuff Chaap, Stuff Aloo, Mushroom Tikka, Seekh Kebab, and Tandoori Momos.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "t-seekh",
    name: "Veg Seekh Kebab",
    price: 299,
    description: "Special minced vegetable and soya skewer kebab, packed with rich warm dry spices, clay-roasted.",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "t-dahi-kebab",
    name: "Dahi Kebabs",
    price: 337,
    description: "Silky, creamy patties made of cardamoms and hung curd, crisp outside and melting inside. [4 Pcs]",
    category: "tandoor",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "t-crispy-chaap",
    name: "Golden Crispy Chaap",
    price: 299,
    description: "Soya slices coated in our signature batter, fried to extreme crunch. Soft texture on inside.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-crispy-mush",
    name: "Golden Crispy Mushroom",
    price: 299,
    description: "Crunch-coated deep-fried fresh select mushrooms, hot and highly addictive.",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-crispy-paneer",
    name: "Golden Crispy Paneer",
    price: 299,
    description: "Cottage cheese squares crisp fried under spiced batter shell. Served with spicy dip. [6 Pcs]",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-lollipops",
    name: "Veg Lollipops",
    price: 255,
    description: "Lollipop-shaped crunchy fried vegetable skewers with strong sweet-chili notes. [3 Pcs]",
    category: "tandoor",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "t-wings",
    name: "Veg Wings",
    price: 255,
    description: "Excellent vegetarian plant-based alternative to classic wings with spiced crunchy outer shell. [3 Pcs]",
    category: "tandoor",
    veg: true,
    spicyLevel: 2
  },

  // --- RUMALI ROLLS & WRAPS (category: rolls) ---
  {
    id: "r-achari-roll",
    name: "Achari Chaap Roll",
    price: 262,
    description: "Zesty, tangy achari-stuffed soya chaap wrapped smoothly inside freshly made thin rumali flatbread.",
    category: "rolls",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "r-afghani-roll",
    name: "Afghani Chaap Roll",
    price: 255,
    description: "Mughlai style afghani soya chunks layered with rich cream, onion shreds, rolled in paper-thin rumali.",
    category: "rolls",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "r-chatpati-roll",
    name: "Chatpati Chaap Roll",
    price: 249,
    description: "Peppery, spicy chatpati tandoori chaap shredded inside fresh warm rumali with dynamic relishes.",
    category: "rolls",
    veg: true,
    spicyLevel: 3
  },
  {
    id: "r-diet-roll",
    name: "Diet Chaap Roll",
    price: 249,
    description: "High protein boiled soya chaap with onions and diet spices, layered inside simple rumali wrap.",
    category: "rolls",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "r-malai-roll",
    name: "Malai Chaap Roll",
    price: 262,
    description: "Creamy, buttery malai chaap bits tucked snugly in rumali roti with cool mint sauce.",
    category: "rolls",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "r-peri-roll",
    name: "Peri-Peri Chaap Tikka Roll",
    price: 249,
    description: "African bird's eye chili peri-peri spiced chaap cubes rolled fast in warm rumali with grilled onions.",
    category: "rolls",
    veg: true,
    spicyLevel: 3
  },
  {
    id: "r-sgf-roll",
    name: "SGF Special Roll",
    price: 249,
    description: "Our signature rolls loaded with special spiced chaap mince, unique sauces, and greens.",
    category: "rolls",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "r-stuff-roll",
    name: "Stuff Chaap Roll",
    price: 249,
    description: "Mouthwatering cheese/nut stuffed chaap roasted and chopped with relishes inside a tasty roll.",
    category: "rolls",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "r-kebab-roll",
    name: "Veg Kebab Roll",
    price: 249,
    description: "Spiced minced soya seekh kebab pieces rolled with red onions and classic green chutney.",
    category: "rolls",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "r-mushroom-roll",
    name: "Mushroom Roll",
    price: 249,
    description: "Succulent spiced button mushrooms sautéed and rolled with crunchy cabbage inside a soft flatbread.",
    category: "rolls",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "r-paneer-roll",
    name: "Paneer Tikka Roll",
    price: 249,
    description: "Classic charcoal-seared paneer tikka shreds rolled smoothly into lightweight rumali.",
    category: "rolls",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "r-peri-paneer-roll",
    name: "Peri-Peri Paneer Tikka Roll",
    price: 255,
    description: "Fiery peri-peri paneer cubes, capsicums, and hot sauces wrapped in soft fresh flatbread.",
    category: "rolls",
    veg: true,
    spicyLevel: 3
  },

  // --- HOT SELLING CHINESE (category: chinese) ---
  {
    id: "c-ch-chaap",
    name: "Chilly Chaap (Wok Finished)",
    price: 285,
    description: "Wok-tossed battered soya chunks glazed inside high-heat soy-garlic chili sauce.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-ch-mush",
    name: "Chilly Mushroom Dry",
    price: 285,
    description: "Crispy coated mushrooms tossed with diced onions, capsicums and standard Chinese sauces.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-ch-paneer",
    name: "Chilly Paneer Dry",
    price: 285,
    description: "Excellent appetizer of fried paneer chunks wok-tossed with spring onions, garlic and dark soy glaze. [6 Pcs]",
    category: "chinese",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "c-ch-potato",
    name: "Chilly Potato",
    price: 305,
    description: "Crisp potato fingers tossed in homemade red-chili schezwan mix, scallions, and sesames.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-crispy-corn",
    name: "Crispy Corns",
    price: 345,
    description: "Perfect golden fried sweet corn seeds tossed with table salts, black pepper and spring onion greens.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-crispy-spring",
    name: "Crispy Spring Roll",
    price: 255,
    description: "Golden flaky rolls stuffed with ginger-garlic seasoned cabbage, greens and soy glaze.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-honey-potato",
    name: "Honey Chilly Potato",
    price: 265,
    description: "Crisp potato wedges tossed elegantly in sweet honey glaze, red hot pepper flakes, and sesames.",
    category: "chinese",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "c-spring-rolls",
    name: "Classic Spring Rolls",
    price: 215,
    description: "Hand-rolled golden pastries packed with julienne greens, fried till airy crisp. Served with sweet chili dip.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-manchurian",
    name: "Veg Manchurian Dry",
    price: 235,
    description: "Flavorful mixed vegetable balls simmered and tossed in garlic-rich dark soy sauce. [8 Balls]",
    category: "chinese",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "c-salt-pepper",
    name: "Veg Salt & Pepper",
    price: 275,
    description: "Dynamic stir fry of crunchy golden-crusted garden vegetables tossed with freshly cracked sea salts.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  // Rice & Noodles
  {
    id: "c-garlic-rice",
    name: "Chilly Garlic Fried Rice",
    price: 205,
    description: "A fiery long grain rice prep wok-tossed with strong burnt garlic nodes and red chilis.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-hakka-rice",
    name: "Hakka Fried Rice",
    price: 215,
    description: "Authentic pan-fried Chinese rice loaded with diced carrot, beans and light white pepper seasoning.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-schezwan-rice",
    name: "Schezwan Fried Rice",
    price: 215,
    description: "Authentic long-grain rice tossed in robust red chili Schezwan paste and greens.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-sgf-rice",
    name: "SGF Special Fried Rice",
    price: 235,
    description: "Rich wok-fried basmati rice packed with unique chef special aromatics and roasted cottage cheese bits.",
    category: "chinese",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "c-singap-rice",
    name: "Singapoori Fried Rice",
    price: 215,
    description: "Singapore style rice prep stir-fried fast with sweet- spicy notes and curry oils.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-veg-rice",
    name: "Classic Veg Fried Rice",
    price: 195,
    description: "Traditional high-flame seasoned long-grain basmati tossed with dynamic garden veggies.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-garlic-noodles",
    name: "Chilly Garlic Noodles",
    price: 225,
    description: "Burnt garlic notes and dynamic crushed chili flakes wok-fired with sleek Hakka noodles.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-hakka-noodles",
    name: "Hakka Noodles",
    price: 289,
    description: "Standard thin wheat noodles stir-fried nicely with colorful pepper shreds and clean soy glaze.",
    category: "chinese",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "c-schezwan-noodles",
    name: "Schezwan Noodles",
    price: 235,
    description: "Zesty stir-fried noodles seasoned with premium sweet and fiery Schezwan chili paste.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-sgf-noodles",
    name: "SGF Special Noodles",
    price: 255,
    description: "Wok-fried noodles layered with rich dry spices, shredded cottage cheese, and signature SGF toppings.",
    category: "chinese",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "c-singapore-noodles",
    name: "Singapore Noodles",
    price: 235,
    description: "Slippery, thin strands of noodles tossed with curry powders, vegetables and standard sesame oils.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-veg-noodles",
    name: "Veg Noodles",
    price: 195,
    description: "Healthy everyday stir-fried noodles tossed with cabbage shreds, capsicum, and light seasonings.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  // Momos Specialties
  {
    id: "c-mo-chilly-paneer",
    name: "Paneer Chilly Momos",
    price: 255,
    description: "Dumplings stuffed with spiced cottage cheese, wok-glazed inside Chinese garlic-soy gravy.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-mo-fried-paneer",
    name: "Paneer Fried Momos",
    price: 195,
    description: "Golden fried crispy dumplings packed with paneer seasoning. Served with creamy mayo.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-mo-kurk-paneer",
    name: "Paneer Kurkure Momos",
    price: 257,
    description: "Crazy outer cornflake-batter crust, deep fried to golden shell. Exploding with paneer inside.",
    category: "chinese",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "c-mo-steam-paneer",
    name: "Paneer Steam Momos",
    price: 175,
    description: "Sleek steamed flour parcels stuffed with freshly spiced and shredded paneer. A light option.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-mo-afg-paneer",
    name: "Tandoori Afghani Paneer Momos",
    price: 257,
    description: "Cottage cheese momos coated under lush Mughlai cashew-butter slurry, charcoal roasted.",
    category: "chinese",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "c-mo-afg-veg",
    name: "Tandoori Afghani Veg Momos",
    price: 215,
    description: "Fine vegetable steamed momos marinated in malai cheese paste, seared in clay oven.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-mo-garlic-paneer",
    name: "Tandoori Garlic Paneer Momos",
    price: 257,
    description: "Paneer momos cooked in spicy tandoori rub with heavy garlic slices, cooked over fire.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-mo-garlic-veg",
    name: "Tandoori Garlic Veg Momos",
    price: 215,
    description: "Garlic infused clay-oven momos. High smoky aroma, paired beautifully with hot chili paste.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-mo-tandoori",
    name: "Tandoori Momos (SGF Iconic)",
    price: 230,
    description: "SGF classic! Charcoal grilled momos marinated in signature spicy red curd. Thick smoky glaze.",
    category: "chinese",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "c-mo-tandoori-paneer",
    name: "Tandoori Paneer Momos",
    price: 257,
    description: "Juicy paneer momos in authentic tikka marination roasted over clay coal grills.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-mo-chilly-veg",
    name: "Veg Chilly Momos",
    price: 215,
    description: "Crispy fried veg momos sautéed nicely in spicy garlic chili sauce and capsicum cubes.",
    category: "chinese",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "c-mo-fried-veg",
    name: "Veg Fried Momos",
    price: 176,
    description: "Classic deep-fried vegetable momos. Crunch-shelled, served with spicy garlic chutney.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "c-mo-kurk-veg",
    name: "Veg Kurkure Momos",
    price: 215,
    description: "Deep fried to a golden crisp outer coat, these have a rich crunchy shell and steaming spicy veg inside.",
    category: "chinese",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "c-mo-steam-veg",
    name: "Veg Steam Momos",
    price: 185,
    description: "Light, healthy steamed dumplings filled with spiced cabbage, onions and carrots.",
    category: "chinese",
    veg: true,
    spicyLevel: 1
  },

  // --- CONTINENTAL FEASTS (category: continental) ---
  {
    id: "p-corn",
    name: "Corn & Cheese Pizza",
    price: 235,
    description: "Sweet American golden corns paired with double stretchy mozzarella cheese over crispy crust.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "p-garden",
    name: "Garden Fresh Pizza",
    price: 295,
    description: "Gourmet crust topped with green capsicums, red onions, mushrooms, ripe tomato slices and cheese.",
    category: "continental",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "p-margarita",
    name: "Margarita Pizza",
    price: 215,
    description: "Rich traditional Italian herb-infused tomato gravy layered heavily under melted mozzarella.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "p-mexican",
    name: "Mexican Pizza",
    price: 295,
    description: "Zesty Mexican spices, spicy jalapeños, sweet corn, red onion, with dynamic toppings.",
    category: "continental",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "p-peri",
    name: "Peri Peri Pizza",
    price: 255,
    description: "Spiced peri-peri seasoned base, red paprika chunks, paneer slices, and double cheese.",
    category: "continental",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "co-bgr-aloo",
    name: "Aloo Tikki Burger",
    price: 99,
    description: "Classic Indian crispy potato patty, layered with tomato slices, dressing and toasted bun.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-bgr-paneer",
    name: "Paneer Patty Burger",
    price: 199,
    description: "Thick premium cottage cheese steak flavored under secret spice coat, layered inside soft buns.",
    category: "continental",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "co-bgr-veg",
    name: "Veg Patty Burger",
    price: 149,
    description: "Crunchy crumbed vegetable patty with fresh lettuce, onions, and standard sauce.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-sand-healthy",
    name: "Healthy Sandwich",
    price: 225,
    description: "Whole wheat crisp grilled artisan bread stuffed with low-fat dressing, cucumber, tomato and greens.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-sand-mozz",
    name: "Mozzarella Special Sandwich",
    price: 245,
    description: "Toasted bread stuffed heavily with stringy mozzarella cheese, basil pesto spread, and sliced peppers.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-sand-paneer",
    name: "Paneer Sandwich",
    price: 245,
    description: "Spiced paneer bhurji scramble and sliced onions packed in butter-grilled bread.",
    category: "continental",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "co-sand-veg",
    name: "Veggie Grilled Sandwich",
    price: 190,
    description: "Double decker toasted club sandwich loaded with sweet corn, mayonnaise and chopped veggies.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-fr-cheese",
    name: "Cheese Fries",
    price: 225,
    description: "Golden crisp high-grade salted potato fries, smothered in warm cheddar cheese sauce.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-fr-classic",
    name: "Classic Salted Fries",
    price: 165,
    description: "Deep fried golden potato wedges, lightly dusted with sea salt. Served hot.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-fr-peri",
    name: "Peri-Peri Fries",
    price: 195,
    description: "Sizzling golden potato fries tossed inside hot and tangy African peri-peri spice dust.",
    category: "continental",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "co-gb-cheese",
    name: "Cheese Grilled Garlic Bread",
    price: 185,
    description: "Artisan toasted slices baked under garlic-herb butter and loads of dynamic stringy cheese. [4 Pcs]",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-gb-stuffed",
    name: "Grilled Stuffed Garlic Bread",
    price: 195,
    description: "Oven-baked garlic bread folded and stuffed nicely with yellow corns, jalapeños, and cheese. [4 Pcs]",
    category: "continental",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "co-gb-plain",
    name: "Plain Garlic Bread",
    price: 155,
    description: "Traditional slices toasted perfectly with rich butter, pressed garlic, and dry parsley. [4 Pcs]",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-gb-art",
    name: "Stuffed Garlic Bread",
    price: 190,
    description: "Soft fresh-dough garlic rolls packed with melted mozzarella and green herbs. [4 Pcs]",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "co-ps-mix",
    name: "Mix Sauce Pasta",
    price: 275,
    description: "Perfect blend of cheesy Alfredo cream and tangy marinara herbs. Served with 2 Plain Breads.",
    category: "continental",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "co-ps-red",
    name: "Red Sauce Pasta",
    price: 299,
    description: "Penne pasta tossed in thick slow-simmered marinara plum tomatoes and chili flakes. Served with 2 Breads.",
    category: "continental",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "co-ps-white",
    name: "White Sauce Pasta",
    price: 265,
    description: "Rich, creamy milk-cheese sauce coated over tender penne with sweet corn and bell peppers. Served with 2 Breads.",
    category: "continental",
    veg: true,
    spicyLevel: 1
  },

  // --- NORTH INDIAN CURRIES (category: northindian) ---
  {
    id: "m-dal-handi",
    name: "Dal Handi",
    price: 275,
    description: "Traditional yellow lentils slow-simmered inside a clay handi, tempered under ghee and garlic.",
    category: "northindian",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "m-dal-makhani",
    name: "Dal Makhani (Signature Best Seller)",
    price: 355,
    description: "SGF legend! Black lentils simmered overnight with butter, dairy cream, and Kashmiri deghi chili.",
    category: "northindian",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "m-dal-tadka",
    name: "Dal Tadka",
    price: 265,
    description: "Comforting yellow tur dal boiled softly, finished with dynamic double mustard cumin and red hot dry chili tadka.",
    category: "northindian",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "m-aloo-jeera",
    name: "Aloo Jeera",
    price: 255,
    description: "Diced golden potatoes sautéed deeply with heavy cumin seeds, ginger threads, turmeric, and fresh cilantro leaves.",
    category: "northindian",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "m-butter-chaap",
    name: "SGF Butter Chaap",
    price: 205,
    description: "Diced soya chaap pieces cooked softly in mild, sweet, and aromatic buttery tomato-based gravy.",
    category: "northindian",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "m-chana-masala",
    name: "Peshawari Chana Masala",
    price: 185,
    description: "Soft chickpeas cooked Punjabi-style inside a thick dark coriander-onion gravy.",
    category: "northindian",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "m-kad-chaap",
    name: "Kadhai Chaap",
    price: 205,
    description: "Soya chaap pieces tossed with capsicum flakes, onion blocks, and strong hand-pounded dry coriander.",
    category: "northindian",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "m-kad-mush",
    name: "Kadhai Mushroom",
    price: 215,
    description: "Button mushrooms sautéed with bell peppers and roasted onion gravy inside standard heavy iron kadhai.",
    category: "northindian",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "m-kad-paneer",
    name: "Kadhai Paneer",
    price: 215,
    description: "Cottage cheese cubes tossed inside thick-spiced onion-tomato sauce with dynamic crushed chilies and bell peppers.",
    category: "northindian",
    veg: true,
    spicyLevel: 2,
    popular: true
  },
  {
    id: "m-keema-chaap",
    name: "Keema Chaap Curry",
    price: 215,
    description: "Minced soya granules and baby peas sautéed deeply in thick Indian gravy. Highly protein rich.",
    category: "northindian",
    veg: true,
    spicyLevel: 2
  },
  {
    id: "m-mix-veg",
    name: "Lehsuni Mix Veg",
    price: 255,
    description: "Healthy garden peas, beans, carrots, potato and paneer sautéed deeply in light semi-dry onion paste.",
    category: "northindian",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "m-mutter-mush",
    name: "Mutter Mushroom",
    price: 215,
    description: "Fresh button mushrooms and green peas slow cooked inside warm Punjabi tomato-onion curry gravy.",
    category: "northindian",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "m-mutter-paneer",
    name: "Mutter Paneer",
    price: 215,
    description: "Homestyle comfort. Cottage cheese blocks and baby peas in a light, nourishing masala curry broth.",
    category: "northindian",
    veg: true,
    spicyLevel: 1
  },
  {
    id: "m-paneer-butter",
    name: "Paneer Butter Masala",
    price: 215,
    description: "Double cream tomato gravy, loaded with soft butter-baked paneer blocks and subtle cardamom scent.",
    category: "northindian",
    veg: true,
    spicyLevel: 1,
    popular: true
  },
  {
    id: "m-paneer-lababdar",
    name: "Paneer Lababdar (Highly Recommended)",
    price: 273,
    description: "Premium rich gravy cooked cleanly with cashew paste, finished with loads of ghee, cream and grated cheese. Royal taste.",
    category: "northindian",
    veg: true,
    spicyLevel: 2,
    popular: true
  },

  // --- TANDOORI BREADS (category: breads) ---
  {
    id: "b-rot",
    name: "Tandoori Whole Wheat Roti",
    price: 18,
    description: "Whole wheat grain flatbread baked freshly inside the blazing hot clay tandoor oven.",
    category: "breads",
    veg: true
  },
  {
    id: "b-rot-but",
    name: "Butter Tandoori Roti",
    price: 25,
    description: "Fresh hot wheat roti flatbread doused instantly under premium melted white table butter.",
    category: "breads",
    veg: true
  },
  {
    id: "b-rumali",
    name: "Rumali Roti",
    price: 18,
    description: "Whisper thin, handkerchief-soft refined flour flatbread cooked skillfully over hot dome.",
    category: "breads",
    veg: true,
    popular: true
  },
  {
    id: "b-naan-but",
    name: "Butter Naan (Legendary)",
    price: 55,
    description: "Flaky, soft yeast flatbread cooked inside the clay tandoor, loaded under luxurious melted butter folds.",
    category: "breads",
    veg: true,
    popular: true
  },
  {
    id: "b-lachha",
    name: "Lachha Paratha",
    price: 55,
    description: "Wheat paratha coiled expertly inside spiral rings, baked till crispy flaky. Finished with butter.",
    category: "breads",
    veg: true
  }
];
