function Post(id, content, username = null, image = null, video = null, likes = 0, createdAt = new Date(), profile = null) {
    this.id = id;
    this.content = content
    this.image = image || null
    this.video = video || null
    this.username = username ? username : "Anonymous"
    this.likes = likes
    this.createdAt = date(createdAt)
    this.profile = profile || null
}

function date(createdDate) {
    const postDate = new Date(createdDate)
    const now = new Date()
    const millisecondsAgo = now - postDate
    const secondsAgo = millisecondsAgo / 1000

    if (secondsAgo < 60) {
        return 'just now'
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (secondsAgo < 604800) {
        return 'a week ago';
    }

    const yearsAgo = now.getFullYear() - postDate.getFullYear()
    const monthsAgo = now.getMonth() - postDate.getMonth()

    if (yearsAgo > 0) {
        return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`
    } else if (monthsAgo > 0) {
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
    } else {
        return 'posted a week ago'
    }
}

function createPostElements(post) {
  const postElement = document.createElement('div')
  postElement.classList.add('post')
  postElement.setAttribute('id', `post-${post.id}`)

  if (post.profile && post.profile !== '') {
    const profileImage = document.createElement('img');
    profileImage.src = post.profile;
    profileImage.classList.add('profile-image');
    postElement.appendChild(profileImage);
  }

  const usernameElement = document.createElement('p');
  usernameElement.textContent = `${post.username}`;
  const userContent = document.createElement('div');
  userContent.classList.add('post-user-content');
  usernameElement.setAttribute('id', `post-${post.id}-username`);
  if (post.profile && post.profile !== '') {
    usernameElement.classList.add('with-profile');
  }
  postElement.appendChild(usernameElement);

  const userContentDiv = document.createElement('div')
  userContentDiv.classList.add('post-user-content')

  const contentElement = document.createElement('p')
  contentElement.textContent = `${post.content}`
  userContentDiv.appendChild(contentElement)

  postElement.appendChild(userContentDiv)

  const mediaContainer = document.createElement('div')
  mediaContainer.classList.add('post-media-container')

  if (post.image && post.image !== null) {
    const imageElement = document.createElement('img')
    imageElement.src = post.image
    imageElement.classList.add('post-image')
    mediaContainer.appendChild(imageElement)
  }

  if (post.video && post.video.includes('youtube.com')) {
    const videoContainer = document.createElement('div')
    videoContainer.classList.add('post-video')

    const videoId = getYoutubeVideoId(post.video)
    const iframeElement = createYoutubeIframe(videoId)

    videoContainer.appendChild(iframeElement)
    mediaContainer.appendChild(videoContainer)
  }

  postElement.appendChild(mediaContainer)

  const likesAndDateElement = document.createElement('p')
  likesAndDateElement.classList.add('post-likes-date')

  const likeButton = document.createElement('button')
  likeButton.textContent = 'Like'
  likeButton.classList.add('like-btn')
  likeButton.addEventListener('click', () => {
    post.likes++
    likeCount.textContent = post.likes === 1 ? '1 Like' : `${post.likes} Likes`
  })
  likesAndDateElement.appendChild(likeButton)
  const likeCount = document.createElement('span')
  likeCount.textContent = `${post.likes} Likes`
  likesAndDateElement.appendChild(likeCount)

  const dateElement = document.createElement('span')
  dateElement.textContent = `    ${date(post.createdAt)}`
  likesAndDateElement.appendChild(dateElement)

  postElement.appendChild(likesAndDateElement)

  document.getElementById('posts-container').appendChild(postElement)
}


function createYoutubeIframe(videoId) {
  const iframeElement = document.createElement('iframe')
  iframeElement.setAttribute('src', `https://www.youtube.com/embed/${videoId}`)
  iframeElement.setAttribute('allowfullscreen', '')
  iframeElement.setAttribute('frameborder', '0')
  return iframeElement;
}

function getYoutubeVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}


const mockData = [
  {
    id: 1,
    profile: 'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',// put profile link
    content: "Enjoying a delicious cup of coffee at my favorite cafe.",
    username: "CoffeeLover123",
    likes: 20,
    createdAt: "2023-12-03T18:15:00Z",
    media: {
      type: "image",
      url: "https://picsum.photos/200/300?image=1025", //gets copied as well
    },
  },
  {
    id: 2,
    profile: 'https://i.ytimg.com/vi/ljm6R3KnJew/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHaAoACoAKKAgwIABABGGUgZShlMA8=&rs=AOn4CLAgOj774DvxxGLupDdO79LV1zRAnQ',// put profile link
    content: "Exploring the beautiful hiking trails near my home.",
    username: "NatureAdventurer456",
    likes: 35,
    createdAt: "2023-12-03T15:15:00Z",
    media: {
      type: "image",
      url: "https://picsum.photos/200/300?image=1026", //gets copied
    },
  },
  {
    id: 3,
    profile: 'https://media.tenor.com/w91Pac5FR18AAAAM/troll-face.gif',// put profile link
    content:
      "Trying out a new recipe for homemade pasta and it turned out amazing!", //no photo
    username: "FoodieExpert789",
    likes: 50,
    createdAt: "2023-12-03T13:15:00Z", //no photo
    media: null,
  },
  {
    id: 4,
    profile: 'https://www.shutterstock.com/image-illustration/isolated-meme-troll-face-laughing-600w-2314883255.jpg',// put profile link
    content:
      "Just finished reading an incredible book that I highly recommend.",
    username: "BookwormExtraordinaire1011",
    likes: 40,
    createdAt: "2023-12-03T11:15:00Z", //no photo
    media: null,
  },
  {
    id: 5,
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRxjUBB4ndgLrpPeSFAs5hMVmWEasEzHtUBhUONkEnbg&s',// put profile link
    content: "Caught a stunning sunset while kayaking with friends.",
    username: "AdventureSeeker1213",
    likes: 60,
    createdAt: "2023-12-03T09:15:00Z",
    media: {
      type: "image",
      url: "https://picsum.photos/200/300?image=1029", //with photo, it isnt even A STUNNING SUNSET
    },
  },
  {
    id: 6,
    profile:'https://media.istockphoto.com/id/538665020/photo/internet-meme-why-you-no-rage-face-3d-illustration.jpg?s=612x612&w=0&k=20&c=5D_g8Jy8kqg5Op2bb4RvcH8_6y0HGPqt29TKDrEqLyM=',// put profile link
    content: "Learning a new skill playing the guitar and making progress.",
    username: "MusicalEnthusiast1415",
    likes: 25,
    createdAt: "2023-12-03T07:15:00Z",
    media: {
      type: "video",
      url: "https://www.youtube.com/watch?v=6TIymXdDqjQ", //put random yt link
    },
  },
  {
    id: 7,
    profile: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png',// put profile link
    content:
      "Spent the day volunteering at a local animal shelter and it was so rewarding.",
    username: "CompassionateHeart1617",
    likes: 45,
    createdAt: "2023-12-03T05:15:00Z",
    media: null,
  },
  {
    id: 8,
    profile: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=pjeg&auto=webp&crop=4:3',// put profile link
    content:
      "Just got back from an amazing trip to Bali and it was unforgettable.",
    username: "TravelEnthusiast1819",
    likes: 70,
    createdAt: "2023-12-03T03:15:00Z",
    media: {
      type: "image",
      url: "https://picsum.photos/200/300?image=1032",
    },
  },
  {
    id: 9,
    profile: 'https://pbs.twimg.com/media/FwZ93arakAEUfOm?format=jpg&name=large',// put profile link
    content: "Had a great time at a concert last night.",
    username: "MusicLover2021",
    likes: 30,
    createdAt: "2023-12-03T01:15:00Z",
    media: {
      type: "video",
      url: "https://www.youtube.com/watch?v=DpreH2fsHeE", // put random yt link
    },
  },
  {
    id: 10,
    profile: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2022/09/Shiba-Inu-meme-dog.jpg?w=720',// put profile link
    content: "Started a new workout routine and feeling motivated to get fit.",
    username: "FitnessEnthusiast2223",
    likes: 55,
    createdAt: "2023-12-03T20:15:00Z",
    media: null,
  },
]

const posts = mockData.map(post => {
    return new Post(
        post.id,
        post.content,
        post.username,
        post.media && post.media.type === 'image' ? post.media.url : null,
        post.media && post.media.type === 'video' ? post.media.url : null,
        post.likes,
        post.createdAt,
        post.profile 
    )
})

posts.forEach(post => createPostElements(post))
