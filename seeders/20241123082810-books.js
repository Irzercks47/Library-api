'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [
      {
        book_name: "To Kill a Mockingbird",
        summary: "A novel about the moral growth of a young girl in the racially charged South.",
        date_published: "1960-07-11",
        author: "Harper Lee",
        book_cover: "https://example.com/to-kill-a-mockingbird.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "1984",
        summary: "A dystopian story of a totalitarian regime that employs surveillance and manipulation.",
        date_published: "1949-06-08",
        author: "George Orwell",
        book_cover: "https://example.com/1984.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "1984 test",
        summary: "A dystopian story of a totalitarian regime that employs surveillance and manipulation.",
        date_published: "1949-06-08",
        author: "George Orwell",
        book_cover: "https://example.com/1984.jpg",
        stock: 10,
        is_deleted: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
      {
        book_name: "Pride and Prejudice",
        summary: "A classic romance about love and societal expectations in 19th-century England.",
        date_published: "1813-01-28",
        author: "Jane Austen",
        book_cover: "https://example.com/pride-and-prejudice.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Great Gatsby",
        summary: "A critique of the American Dream through the tragic story of Jay Gatsby.",
        date_published: "1925-04-10",
        author: "F. Scott Fitzgerald",
        book_cover: "https://example.com/the-great-gatsby.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Moby Dick",
        summary: "The epic tale of Captain Ahab's obsession with hunting the white whale.",
        date_published: "1851-10-18",
        author: "Herman Melville",
        book_cover: "https://example.com/moby-dick.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Catcher in the Rye",
        summary: "A young man navigates alienation and identity in 1950s New York.",
        date_published: "1951-07-16",
        author: "J.D. Salinger",
        book_cover: "https://example.com/the-catcher-in-the-rye.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Hobbit",
        summary: "The adventures of Bilbo Baggins in Middle-earth, leading to the discovery of the One Ring.",
        date_published: "1937-09-21",
        author: "J.R.R. Tolkien",
        book_cover: "https://example.com/the-hobbit.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Hobbit test",
        summary: "The adventures of Bilbo Baggins in Middle-earth, leading to the discovery of the One Ring.",
        date_published: "1937-09-21",
        author: "J.R.R. Tolkien",
        book_cover: "https://example.com/the-hobbit.jpg",
        stock: 10,
        is_deleted: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
      {
        book_name: "Fahrenheit 451",
        summary: "A dystopian future where books are banned, and firemen burn them.",
        date_published: "1953-10-19",
        author: "Ray Bradbury",
        book_cover: "https://example.com/fahrenheit-451.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Jane Eyre",
        summary: "A governess falls in love with her employer, uncovering a dark secret in his past.",
        date_published: "1847-10-16",
        author: "Charlotte Brontë",
        book_cover: "https://example.com/jane-eyre.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Brave New World",
        summary: "A future society where individuality is suppressed in favor of conformity.",
        date_published: "1932-08-01",
        author: "Aldous Huxley",
        book_cover: "https://example.com/brave-new-world.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Wuthering Heights",
        summary: "A tale of passion and revenge on the moors of England.",
        date_published: "1847-12-01",
        author: "Emily Brontë",
        book_cover: "https://example.com/wuthering-heights.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Alchemist",
        summary: "A young shepherd's journey in search of treasure and personal growth.",
        date_published: "1988-04-01",
        author: "Paulo Coelho",
        book_cover: "https://example.com/the-alchemist.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Crime and Punishment",
        summary: "A psychological exploration of morality and guilt through the actions of a murderer.",
        date_published: "1866-01-01",
        author: "Fyodor Dostoevsky",
        book_cover: "https://example.com/crime-and-punishment.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "War and Peace",
        summary: "An epic novel about the lives of individuals during Napoleon's invasion of Russia.",
        date_published: "1869-01-01",
        author: "Leo Tolstoy",
        book_cover: "https://example.com/war-and-peace.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Picture of Dorian Gray",
        summary: "A man sells his soul for eternal youth while his portrait ages.",
        date_published: "1890-06-20",
        author: "Oscar Wilde",
        book_cover: "https://example.com/the-picture-of-dorian-gray.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Animal Farm",
        summary: "An allegorical novella reflecting events leading up to the Russian Revolution.",
        date_published: "1945-08-17",
        author: "George Orwell",
        book_cover: "https://example.com/animal-farm.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Road",
        summary: "A father and son's journey through a post-apocalyptic world.",
        date_published: "2006-09-26",
        author: "Cormac McCarthy",
        book_cover: "https://example.com/the-road.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Dracula",
        summary: "A Gothic horror novel about the vampire Count Dracula's attempt to move to England.",
        date_published: "1897-05-26",
        author: "Bram Stoker",
        book_cover: "https://example.com/dracula.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Divine Comedy",
        summary: "An epic poem detailing the journey through Hell, Purgatory, and Paradise.",
        date_published: "1320-01-01",
        author: "Dante Alighieri",
        book_cover: "https://example.com/the-divine-comedy.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Frankenstein",
        summary: "A story about a scientist who creates a sapient creature.",
        date_published: "1818-01-01",
        author: "Mary Shelley",
        book_cover: "https://example.com/frankenstein.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Fault in Our Stars",
        summary: "A story of two teenagers who fall in love while battling cancer.",
        date_published: "2012-01-10",
        author: "John Green",
        book_cover: "https://example.com/the-fault-in-our-stars.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Percy Jackson & The Olympians: The Lightning Thief",
        summary: "A young boy discovers he is a demigod and embarks on a dangerous quest.",
        date_published: "2005-06-28",
        author: "Rick Riordan",
        book_cover: "https://example.com/percy-jackson.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Maze Runner",
        summary: "A group of teens wake up in a mysterious maze with no memory of their past.",
        date_published: "2009-10-06",
        author: "James Dashner",
        book_cover: "https://example.com/the-maze-runner.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Hunger Games",
        summary: "A girl volunteers to take her sister's place in a deadly televised competition.",
        date_published: "2008-09-14",
        author: "Suzanne Collins",
        book_cover: "https://example.com/the-hunger-games.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Divergent",
        summary: "In a divided society, a girl discovers she doesn't fit into any one faction.",
        date_published: "2011-04-25",
        author: "Veronica Roth",
        book_cover: "https://example.com/divergent.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Book Thief",
        summary: "The story of a young girl who finds solace in stealing books during WWII.",
        date_published: "2005-03-14",
        author: "Markus Zusak",
        book_cover: "https://example.com/the-book-thief.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Giver",
        summary: "A boy discovers the dark secrets of his seemingly utopian society.",
        date_published: "1993-04-26",
        author: "Lois Lowry",
        book_cover: "https://example.com/the-giver.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Twilight",
        summary: "A teenage girl falls in love with a vampire.",
        date_published: "2005-10-05",
        author: "Stephenie Meyer",
        book_cover: "https://example.com/twilight.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "A Game of Thrones",
        summary: "Noble families vie for control of the Seven Kingdoms of Westeros.",
        date_published: "1996-08-06",
        author: "George R.R. Martin",
        book_cover: "https://example.com/a-game-of-thrones.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Name of the Wind",
        summary: "A gifted boy grows into a powerful magician while telling his story.",
        date_published: "2007-03-27",
        author: "Patrick Rothfuss",
        book_cover: "https://example.com/the-name-of-the-wind.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Eragon",
        summary: "A farm boy discovers he is destined to become a Dragon Rider.",
        date_published: "2002-06-25",
        author: "Christopher Paolini",
        book_cover: "https://example.com/eragon.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Lord of the Rings: The Fellowship of the Ring",
        summary: "A hobbit embarks on a quest to destroy a powerful ring.",
        date_published: "1954-07-29",
        author: "J.R.R. Tolkien",
        book_cover: "https://example.com/the-fellowship-of-the-ring.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Golden Compass",
        summary: "A girl journeys to the North to rescue her kidnapped friend.",
        date_published: "1995-07-16",
        author: "Philip Pullman",
        book_cover: "https://example.com/the-golden-compass.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Artemis Fowl",
        summary: "A young criminal mastermind kidnaps a fairy for ransom.",
        date_published: "2001-04-26",
        author: "Eoin Colfer",
        book_cover: "https://example.com/artemis-fowl.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Shadow of the Wind",
        summary: "A boy discovers a mysterious book and uncovers its secrets.",
        date_published: "2001-06-05",
        author: "Carlos Ruiz Zafón",
        book_cover: "https://example.com/the-shadow-of-the-wind.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Life of Pi",
        summary: "A boy survives a shipwreck and shares a lifeboat with a Bengal tiger.",
        date_published: "2001-09-11",
        author: "Yann Martel",
        book_cover: "https://example.com/life-of-pi.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Fault in Our Stars",
        summary: "A story of two teenagers who fall in love while battling cancer.",
        date_published: "2012-01-10",
        author: "John Green",
        book_cover: "https://example.com/the-fault-in-our-stars.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "Percy Jackson & The Olympians: The Lightning Thief",
        summary: "A young boy discovers he is a demigod and embarks on a dangerous quest.",
        date_published: "2005-06-28",
        author: "Rick Riordan",
        book_cover: "https://example.com/percy-jackson.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Lord of the Rings: The Fellowship of the Ring",
        summary: "A hobbit embarks on a quest to destroy a powerful ring.",
        date_published: "1954-07-29",
        author: "J.R.R. Tolkien",
        book_cover: "https://example.com/the-fellowship-of-the-ring.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Golden Compass",
        summary: "A girl journeys to the North to rescue her kidnapped friend.",
        date_published: "1995-07-16",
        author: "Philip Pullman",
        book_cover: "https://example.com/the-golden-compass.jpg",
        stock: 10,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: '0000-00-00',
      },
      {
        book_name: "The Golden Compass test",
        summary: "A girl journeys to the North to rescue her kidnapped friend.",
        date_published: "1995-07-16",
        author: "Philip Pullman",
        book_cover: "https://example.com/the-golden-compass.jpg",
        stock: 10,
        is_deleted: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
