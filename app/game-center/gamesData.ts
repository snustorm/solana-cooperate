// gameData.ts
export interface Game {
    id: number;
    name: string;
    tag: string;
    image: string;
    description: string;
    author: string;
  }
  
  // gameData.ts
export interface Game {
    id: number;
    name: string;
    tag: string;
    image: string;
    description: string;
    author: string;
    token: string,
  }
  
  const gameData: Game[] = [
    {
      id: 1,
      name: 'Black :Wukong',
      tag: 'Beta',
      image: '/fig/Fig1.jpg',
      description: 'A mythical action RPG based on the legend of Sun Wukong with challenging combat and stunning visuals. Step into the shoes of the legendary Monkey King as you explore a beautifully crafted world full of mysteries and danger. Battle against formidable enemies using Sun Wukong\'s unique powers and martial arts skills. Experience a story rich in Chinese mythology and folklore, while uncovering hidden secrets that will shape the fate of the land. With dynamic combat and breathtaking visuals, "Black :Wukong" is an epic journey that pushes the limits of next-gen gaming.',
      author: '3N4X7A7kFBT76P5M73R7KH93H9JF5PL3', // Random public key
      token: 'BW',
    },
    {
      id: 2,
      name: 'Super Mario',
      tag: 'Beta',
      image: '/fig/Fig2.jpg',
      description: 'Join Mario in his classic platforming adventures through colorful worlds to rescue Princess Peach. As the heroic plumber, you’ll run, jump, and stomp on enemies to overcome challenging levels filled with traps and surprises. Traverse iconic landscapes like Mushroom Kingdom, facing off against familiar foes like Goombas and Bowser\'s minions. Collect coins and power-ups to unlock new abilities and secret areas. Whether it’s jumping over lava pits, swimming through underwater caverns, or riding Yoshi, the journey is packed with fun. "Super Mario" is a timeless adventure for players of all ages that has defined the platforming genre.',
      author: '1D6F8F7bM2R8A3Z4D9P8D6K8L7G9Z2O9',
      token: 'SMT'
    },
    {
      id: 3,
      name: 'Pokémon',
      tag: 'Beta',
      image: '/fig/Fig3.jpg',
      description: 'Embark on a journey to become a Pokémon Master by catching and training Pokémon across various regions. Set out as a Pokémon Trainer, and explore lush forests, arid deserts, and icy mountains while encountering a variety of Pokémon species. Engage in turn-based battles against wild Pokémon, rivals, and Gym Leaders, building a team that reflects your strategy. Uncover the mysteries of ancient Pokémon legends, challenge the Elite Four, and thwart the plans of villainous teams. The adventure continues with trading and battling with friends, as you strive to catch \'em all and complete the Pokédex. Pokémon is a world full of endless discovery, friendship, and competition.',
      author: '7Y2H9Q3T4P8L6M5J8W4D7X6F2P3O5H1L',
      token: 'PKT'
    },
    {
      id: 4,
      name: 'Naraka',
      tag: 'Beta',
      image: '/fig/Fig4.jpg',
      description: 'An epic battle royale game with melee combat and stunning acrobatics set in ancient China. Engage in fast-paced, high-octane combat as you wield legendary weapons and execute parkour moves to outmaneuver your enemies. The game blends martial arts with supernatural powers, allowing players to unleash devastating abilities in the heat of battle. Explore a vast, open-world map with dynamic environments, from towering mountains to tranquil temples, all while fighting to be the last warrior standing. Naraka offers a thrilling, competitive experience that combines strategic depth with breathtaking visuals and fluid, cinematic action. Customize your hero with new skins, weapons, and abilities to dominate the battlefield.',
      author: '9U5D4M6C8T3J9Y2B7R5V8N4P6L1W2K5H',
      token: 'NKK'
    },
    {
      id: 5,
      name: 'Frost Punk 2',
      tag: 'Beta',
      image: '/fig/frostpunk.png',
      description: 'A city-building survival game where players must manage resources and make tough decisions to keep their people alive in a frozen world. As the leader of the last city on Earth, you are responsible for the survival of your citizens in a harsh, frozen wasteland. Manage coal, food, and heat while balancing the needs of a desperate population. Implement laws and make moral decisions that will affect the future of your society. Will you choose to be a benevolent leader or a ruthless dictator? Expand your city’s infrastructure, research new technologies, and explore the frozen tundra in search of vital resources. "Frost Punk 2" challenges you to maintain hope in the face of extinction, where every decision counts.',
      author: '8B3N6K2T1P7X4W3J9D2M5V4L1R6Q9Z8P',
      token: 'FPT'
    },
    {
      id: 6,
      name: 'Planet Coaster',
      tag: 'Alpha',
      image: '/fig/planet_coaster.png',
      description: 'Design, build, and manage the theme park of your dreams with Planet Coaster’s rich simulation tools. Create roller coasters with insane drops and loops, or craft relaxing boat rides with a scenic view. You have full control over the park\'s layout, from custom ride designs to shops, paths, and decorations. Keep your guests happy by providing them with food, entertainment, and thrilling rides, while also balancing the park’s finances. Share your creations with other players online, and discover incredible parks from the community. Planet Coaster is not just about building; it’s about imagination and creativity, where the only limit is your mind.',
      author: '6P9Q2F1J7D3R8W6V4T5M2L9X1B7K3O8N',
      token: 'PCT'
    },
    {
      id: 7,
      name: 'Final Fantasy',
      tag: 'Beta',
      image: '/fig/fantasy.png',
      description: 'Explore fantastical realms filled with magic, monsters, and legendary heroes in this iconic RPG franchise. Embark on a grand adventure that spans across multiple worlds, each filled with unique characters, complex stories, and powerful magic. Join the fight against ancient evils threatening the very fabric of reality, as you build a party of diverse heroes. Engage in epic turn-based battles, summon mystical creatures, and harness powerful spells to defeat your enemies. Final Fantasy’s rich narratives and unforgettable soundtracks create an experience that has captivated players for generations. It’s a saga where friendship, love, and sacrifice define the path to victory.',
      author: '2D6J8M3B9F4W7Y2T5P6X1R8Q3K9V5L1M',
      token: 'FFT'
    },
    {
      id: 8,
      name: 'Cyberpunk',
      tag: 'Alpha',
      image: '/fig/cyberpunk.png',
      description: 'A futuristic open-world RPG set in Night City, where players navigate a dystopian world filled with technology and intrigue. Take on the role of V, a mercenary with cybernetic enhancements, as you explore the sprawling city and uncover dark secrets. Engage in high-tech combat using futuristic weapons and cybernetic abilities, while customizing your character\'s skills, appearance, and playstyle. The game’s immersive world is packed with dynamic characters, intense missions, and moral choices that affect the story’s outcome. Dive deep into the seedy underworld of Night City, where every decision could lead to fame, fortune, or betrayal. "Cyberpunk" offers an unparalleled open-world experience, blending technology, narrative, and player choice.',
      author: '5F3R6T9B1M7N4L2J8W9P3Q2K6V8D1H4O',
      token: 'CPT'
    },
  ];
  
  export default gameData;