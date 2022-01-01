//CODE STRUCTURE
const instagram = require(`user-instagram`)
const Insta = require(`instagram-better-scrape`)
const InstaClient = new Insta();
const { username, password, sessionID } = require(`./config.json`)
const { target_username, target_post, target_tag } = require(`./target.json`)
const fs = require(`fs`)

const dir = './user_data'
const dir2 = './post_data'
const dir3 = './tag_data'
const dir4 = './comments_data'
const mydir = './myAccount_data'


//main code function
async function main() {

  //login
  if (!username) {
    console.log("Please give your username in config file.")
    process.exit()
  } else if (!password) {
    console.log("Please give your password in config file")
    process.exit()
  } else if (!sessionID) {
    console.log("Please give your sessionID in config file")
    process.exit()
  } else {
    await instagram.authenticate(username, password).then(console.log("Logged into account"))

    InstaClient.authBySessionId(sessionID).then(account => {

      const accData = JSON.stringify(account)

      fs.mkdir(mydir, (err) => {
        if (fs.existsSync(mydir)) {
          console.log(`....`)
        }
      });

      fs.writeFile(`myAccount_data/my_data.json`, accData, function(err) {
        if (err) return console.log(err)
      })

    })
      .catch(err => console.error(err));
  }

  //MAKING FOLDERS
  fs.mkdir(dir, (err) => {
    if (fs.existsSync(dir)) {
      return
    }
  });
  fs.mkdir(dir2, (err) => {
    if (fs.existsSync(dir2)) {
      return
    }
  });
  fs.mkdir(dir3, (err) => {
    if (fs.existsSync(dir3)) {
      return
    }
  })
  fs.mkdir(dir4, (err) => {
    if (fs.existsSync(dir4)) {
      return
    }
  })


  //FETCHING USER DATA
  if (!target_username) {
    console.log("No target username given. proceeding to other tasks")
  } else {
    instagram.getUserData(`${target_username}`).then(userData => {
      userData.getMedias()

      //bool data
      const verified_user = userData.isVerified().toString()
      const private_user = userData.isPrivate().toString()
      const businuessaccount_user = userData.isBusinessAccount().toString()
      const professionalaccount_user = userData.isProfessionalAccount().toString()
      const channel = userData.hasChannel().toString()
      const guides = userData.hasGuides().toString()
      const hidinglikes = userData.isHidingLikesAndViewsCount().toString()
      const joinedrecently = userData.hasJoinedRecently().toString()

      const user_data = (`Username: ${userData.getUsername()} \n\nBio: ${userData.getBiography()} \n\nPosts: ${userData.getPublicationsCount()}  \n\nFollowers: ${userData.getFollowersCount()} \n\nFollowing: ${userData.getFollowingCount()} \n\nName: ${userData.getFullName()} \n\nPrivate User: ${private_user} \n\nJoined Recently: ${joinedrecently} \n\nVerified User: ${verified_user} \n\nBusinuess Email: ${userData.getBusinessEmail()} \n\nBusinuess Contact: ${userData.getBusinessPhoneNumber()} \n\nBusinuess Account: ${businuessaccount_user} \n\nProfessional Account: ${professionalaccount_user} \n\nChannel Account: ${channel} \n\nGuide account: ${guides} \n\nAccount hiding likes and views: ${hidinglikes}`)

      fs.writeFile(`user_data/${target_username}_pfp.png`, `${userData.getHdProfilePicture()}`, function(err) {
        if (err) return console.log(err);
      })
      //STORING DATA IN FOLDERS
      fs.writeFile(`user_data/${target_username}_data.txt`, `${user_data}`, function(err) {
        if (err) return console.log(err);
      });

    }).catch(err => { console.log(err) })

  }



  //FETCHING POST DATA
  if (!target_post) {
    console.log("No target post given. Proceeding to other tasks")
  } else {
    instagram.getPostData(`${target_post}`).then(postData => {
      postData.getDimensions()

      //bool data
      const video = postData.isVideo().toString()
      const commentsDisabled = postData.areCommentsDisabled().toString()
      const likesDisabled = postData.areLikesAndViewsCountDisabled().toString()
      const paidPartnership = postData.isPaidPartnership().toString()
      const isAd = postData.isAd().toString()
      const hasAudio = postData.hasAudio().toString()

      //object data
      const obj_type = postData.getType()
      const type = JSON.stringify(obj_type)
      const obj_owner = postData.getOwner()
      const owner = JSON.stringify(obj_owner)

      const post_data = (`Type: ${type} \n\nShortcode: ${postData.getShortcode()} \n\nDisplay URL: ${postData.getDisplayUrl()} \n\nCaption: ${postData.getCaption()} \n\nOwner: ${owner} \n\nTagged users: ${postData.getTaggedUsers()} \n\nDate: ${postData.getDate()} \n\nLocation: ${postData.getLocation()} \n\nVideo Views: ${postData.getVideoViewsCount()} \n\nTotal Comments: ${postData.getCommentsCount()} \n\nVideo: ${video} \n\nComments Disabled: ${commentsDisabled} \n\nLikes Disabled: ${likesDisabled} \n\nPaid Partnership: ${paidPartnership} \n\nAd: ${isAd} \n\nAudio: ${hasAudio}`)

      fs.writeFile(`post_data/${target_post}_data.txt`, `${post_data}`, function(err) {
        if (err) return console.log(err);
      });
      //STORING DATA IN FOLDERS

    }).catch(err => {
      console.log(err)
    })
    
  }



  //FETCHING TAG DATA
  if (!target_tag) {
    console.log("No target tag given. proceeding to other tasks")
  } else {
  InstaClient.getHashtag(`${target_tag}`)
    .then(hashtag => {

      const posts = hashtag.posts().toString()
      const url = hashtag.URL().toString()

      const tag_data = (`Posts: ${posts} \n\nURL: ${url}`)

      if (hashtag === 429) {
        console.log(`You're being rate limited on fetching Hashtag Data. pls wait`)
      }

      fs.writeFile(`tag_data/${target_tag}_data.txt`, tag_data, function(err) {
        if (err) return console.log(err)
      })

    })
    .catch(err => console.error(err));
  }


}

main()




/*
POST DATA FUNCTIONS TO BE ADDED LATER:
Likes, Height, Width 

LINKS:
https://www.npmjs.com/package/user-instagram https://www.npmjs.com/package/instagram-scraping https://www.npmjs.com/package/instagram-better-scrape https://skylens.io/blog/how-to-find-your-instagram-session-id
*/

////////////////////////
//Made By HARDY_SLICE//
///////////////////////