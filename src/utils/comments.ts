// for actions.ts

/*

data we get:
[{
    reactionHash: '8143c206dc0b83a025b327bfb22b715fb1b02353',
    senderFid: 194,
    senderName: 'rish',
    senderDisplayName: 'rish',
    senderAvatarUrl: 'https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MEaRCAMdER6MKcvmlfN1-0fVxOGz6w98R8CrP_Rpzse9KZudgn95frTd0L0ZViWVklBj9fuAcJuM6tt7P-BRN0ouAR87NpzZeh2DGw',
    recipientFid: 13495,
    recipientName: 'galazio',
    recipientDisplayName: 'Stefanie',
    recipientAvatarUrl: 'https://i.imgur.com/9O5nc1p.jpg',
    recipientAddress: '0xE8E17AAF70e05FFF01aF8Bbc811c2e53b8A76180',
    actionDisplayWording: 'liked a cast by',
    actionTimestamp: '2023-09-02T14:35:39+00:00',
    day: '2023-09-02',
    pointAmount: 1,
    contentUrl: 'https://warpcast.com/galazio/0x8f8f23',
    createdAt: '2023-09-08T19:18:35.890384+00:00',
    updatedAt: '2023-09-08T19:18:35.890384+00:00',
    actionType: null,
    actionId: null
  }]

  data we want:
  [{
    avatars: [senderAvatarUrl, recipientAvatarUrl],
    by: senderName,
    to: recipientName,
    action: "liked a cast by",
    point: pointAmount,
    time: actionTimestamp
  }]


  ---


  data we 
  [{
    username: 'corbin.eth',
    userfid: 358,
    userdisplayname: 'Corbin Page',
    useravatarurl: 'https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/szIk2U62Zfaux7eK8tinvy9vCUz2EPDUYet8WDKN9_dCJmm2-JM8Fux7_Cy2ZWzE9h2g3dIL9j_ywn8iK_UZYB0sToZ1dcP0QBsmh2w',
    points: 191,
    usdcamount: 0,
    userUrl: 'https://warpcast.com/corbin.eth'
  }]

  data we want:
  [{
    name,
    rank,
    points,
    avatar
  }]
*/
