// seedingData.js is a script that seeds the database with initial data for testing purposes.
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import DogModel from './models/Dog.js';
import PhotoModel from './models/Photo.js';
import UserModel from './models/User.js';

const dogNames = [
  'Milo',
  'Pico',
  'Tori',
  'Yzma',
  'Leo',
  'Baily',
  'Curlie',
  'Burrito',
  'Bear',
  'Huru',
  'Doa',
  'Ruby',
  'Bagel',
  'Tako',
  'Yoi'
];

const dogDob = [
  '2023-7-12',
  '2021-12-4',
  '2021-4-20',
  '2023-3-21',
  '2023-5-22',
  '2017-3-24',
  '2023-7-20',
  '2018-12-11',
  '2020-11-22',
  '2023-3-8',
  '2022-2-19',
  '2021-3-6',
  '2020-7-4',
  '2021-8-20',
  '2019-3-3'
];

const dogWeight = [
  '5',
  '4.2',
  '3.5',
  '20',
  '24',
  '28',
  '3.8',
  '6',
  '4.2',
  '3.6',
  '3.8',
  '3.2',
  '4.5',
  '4.9',
  '6'
];

const dogBreeds = [
  'Maltease',
  'Golden Retriever',
  'Poodle',
  'Bichon Frise',
  'Shiba Inu',
  'Maltease',
  'Golden Retriever',
  'Poodle',
  'Bichon Frise',
  'Shiba Inu',
  'Maltease',
  'Golden Retriever',
  'Poodle',
  'Bichon Frise',
  'Shiba Inu'
];

const dogBios = [
  `I love long walks in the park, especially when the crisp autumn air rustles through the trees and the leaves crunch under my paws. Exploring new scents and sights is a favorite pastime of mine, and I always greet fellow park-goers with a friendly tail wag and a sniff of curiosity.`,
  `I enjoy playing fetch, the thrill of the chase as I bound after the ball and the satisfaction of returning it to my beloved human's hand. It's not just about the game; it's about the bond we share through this simple yet exhilarating activity, where teamwork and trust reign supreme.`,
  `I am a champion at belly rubs, melting into a state of bliss as soon as fingers find their way to my soft fur. The rhythmic motion of gentle scratches under my chin and behind my ears sends waves of contentment through my body, and I'll happily sprawl out for hours of indulgence.`,
  `I have a passion for treats, each morsel a delightful reward for good behavior or a tasty incentive for learning new tricks. From crunchy biscuits to savory jerky, my eyes light up at the sight of a treat-filled hand, and I'll eagerly perform for the chance to earn a delicious reward.`,
  `I am always up for an adventure, whether it's a hike through rugged terrain, a road trip to unknown destinations, or simply exploring the backyard for hidden treasures. With boundless curiosity and a thirst for discovery, every moment is an opportunity for excitement and exploration.`,
  `I am a cuddle expert, specializing in providing warmth, comfort, and unwavering companionship. Nestling close to my favorite humans, I offer soft sighs of contentment and gentle nuzzles, creating a haven of love and affection that soothes the soul and warms the heart.`,
  `I have a nose for sniffing out fun, detecting the faintest whiff of excitement and eagerly following it wherever it leads. Whether it's a game of hide-and-seek, a tantalizing scent trail in the breeze, or the promise of a new adventure just around the corner, I'm always ready to explore.`,
  `I am a loyal companion, standing by my human's side through thick and thin, offering unwavering support and unconditional love. With a wag of my tail and a soulful gaze, I express my devotion in every moment, enriching their life with boundless joy and unwavering loyalty.`,
  `I am a master at catching frisbees, soaring through the air with grace and agility to snatch the flying disc with precision and skill. Each catch is a triumph of athleticism and coordination, showcasing my natural talent and boundless enthusiasm for playful pursuits.`,
  `I am a professional squirrel chaser, eyes locked on target as I bound across the yard with determination and focus. Though the elusive critters often outsmart me with their clever maneuvers, I never tire of the chase, finding joy in the thrill of the hunt and the excitement of the pursuit.`,
  `I am a water-loving dog, happiest splashing through puddles, romping on sandy shores, or diving into cool, refreshing lakes and streams. The sensation of water against my fur is pure bliss, and I'll eagerly paddle and play for hours on end, reveling in the joy of aquatic adventures.`,
  `I am a ball of energy, radiating enthusiasm and vitality in everything I do. Whether it's zooming around the backyard in a whirlwind of motion or greeting each day with a boundless zest for life, I approach every moment with unbridled energy and infectious exuberance.`,
  `I am a gentle giant, towering in stature yet tender in spirit, with a heart as big as my impressive frame. Despite my size, I move with grace and gentleness, offering a reassuring presence and a comforting embrace to all who seek solace in my company.`,
  `I am a mischief maker, delighting in the art of playful antics and mischievous escapades. From stealing socks to unravelling toilet paper, my boundless curiosity and playful spirit keep life interesting and entertaining, adding a touch of laughter and lightheartedness to every day.`,
  `I am a social butterfly, fluttering from friend to friend with charm and charisma, spreading joy and laughter wherever I go. Whether it's greeting familiar faces at the dog park or making new friends on neighborhood walks, I thrive in the company of others, basking in the warmth of companionship and camaraderie.`
];

async function setupData() {
  try {
    // Create users
    const users = await UserModel.create([
      {
        aboutMe: "I'm a dog enthusiast!",
        username: 'doglover1',
        password: await bcrypt.hash('password1', 12),
        email: 'doglover1@example.com',
        address: '34 Princes Street, Auckland CBD, Auckland 1010, New Zealand',
        latitude: -36.8520062,
        longitude: 174.7686103,
        phone: '123-456-7890',
        photoProfile: ''
      },
      {
        aboutMe: 'Dogs are my life!',
        username: 'puppyfanatic',
        password: await bcrypt.hash('password2', 12),
        email: 'puppyfanatic@example.com',
        address: 'Grafton, Auckland 1023, New Zealand',
        latitude: -36.8617676,
        longitude: 174.7696216,
        phone: '987-654-3210',
        photoProfile: ''
      },
      {
        aboutMe: 'Dog person through and through!',
        username: 'caninelover',
        password: await bcrypt.hash('password3', 12),
        email: 'caninelover@example.com',
        address: 'Building 109/5 Alfred Street, Auckland CBD, Auckland 1010, New Zealand',
        latitude: -36.8512138,
        longitude: 174.7693122,
        phone: '555-123-4567',
        photoProfile: ''
      },
      {
        aboutMe: 'All dogs, all the time!',
        username: 'woofwoof',
        password: await bcrypt.hash('password4', 12),
        email: 'woofwoof@example.com',
        address: '314-390 Khyber Pass Road, Newmarket, Auckland 1023, New Zealand',
        latitude: -36.8659909,
        longitude: 174.773442,
        phone: '555-987-6543',
        photoProfile: ''
      },
      {
        aboutMe: 'Dog lover extraordinaire!',
        username: 'barkbuddy',
        password: await bcrypt.hash('password5', 12),
        email: 'barkbuddy@example.com',
        address: 'The Clock Tower 22 Princes Street, Auckland CBD, Auckland 1010, New Zealand',
        latitude: -36.8503035,
        longitude: 174.7694042,
        phone: '555-246-1357',
        photoProfile: ''
      }
    ]);

    // Create dogs for each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const dogs = [];
      for (let j = 0; j < 3; j++) {
        const dog = await DogModel.create({
          name: dogNames[i * 3 + j],
          breed: dogBreeds[i * 3 + j],
          dob: dogDob[i * 3 + j],
          owner: user._id,
          gender: j % 2 === 0 ? 'Male' : 'Female',
          weight: dogWeight[i * 3 + j],
          bio: dogBios[i * 3 + j],
          neutered: j % 2 === 0 ? true : false,
          profilePicture: `images/dogs/dog${i * 3 + (j + 1)}_photo1.jpg`
        });
        dogs.push(dog);
      }

      // Create photos for each dog
      for (let k = 0; k < dogs.length; k++) {
        const dog = dogs[k];
        for (let l = 0; l < 7; l++) {
          await PhotoModel.create({
            dog: dog._id,
            url: `images/dogs/dog${k + 1}_photo${l + 1}.jpg`
          });
        }
      }
    }

    console.log('Initial data setup completed.');
  } catch (error) {
    console.error('Error setting up initial data:', error);
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/732-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB.');

  try {
    // Clear existing data
    await DogModel.deleteMany();
    await UserModel.deleteMany();
    await PhotoModel.deleteMany();

    // Add new data
    await setupData();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
