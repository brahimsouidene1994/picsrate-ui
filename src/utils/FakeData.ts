import CommentObject from "../services/models/comment"
import { CATEGORY } from "../services/models/contants/Category"
import PictureObject from "../services/models/picture"
import img00 from "../assets/images/006.jpg"
import img01 from "../assets/images/005.jpg"
import img02 from "../assets/images/004.jpg"
import img03 from "../assets/images/001.jpg"
import img04 from "../assets/images/003.jpg"
export const FakeVotes: Array<CommentObject> = [
    {
        pictureId: '',
        message: 'Beautiful',
        voteOne: 9,
        voteTwo: 6,
        voteThree: 8,
    },
    {
        pictureId: '',
        message: 'nice picture',
        voteOne: 7,
        voteTwo: 4,
        voteThree: 8,
    },
    {
        pictureId: '',
        message: 'looks attractive',
        voteOne: 8,
        voteTwo: 6,
        voteThree: 4,
    },
    {
        pictureId: '',
        message: 'good one',
        voteOne: 4,
        voteTwo: 9,
        voteThree: 7,
    },
    {
        pictureId: '',
        message: 'Perfect picture',
        voteOne: 7,
        voteTwo: 4,
        voteThree: 8,
    },
    {
        pictureId: '',
        message: 'nice glasses',
        voteOne: 6,
        voteTwo: 9,
        voteThree: 8,
    },
    {
        pictureId: '',
        message: 'fabulous',
        voteOne: 9,
        voteTwo: 8,
        voteThree: 7,
    }, 

]

export const fakeTests: Array<PictureObject> = [
    {
        _id: '1',
        category: CATEGORY.BUSINESS,
        contextPic: 'CV',
        createdAt: '2023-08-01',
        path: img00,
        status: true,
        commentsStatus: true,
        owner: 'user123',
        voters: ['user234', 'user345', 'user456']
    },
    {
        _id: '2',
        category: CATEGORY.SOCIAL,
        contextPic: 'Facebook',
        createdAt: '2023-08-02',
        path: img01,
        status: false,
        commentsStatus: false,
        owner: 'user234',
        voters: ['user123', 'user567']
    },
    {
        _id: '3',
        category: CATEGORY.DATING,
        contextPic: 'Tinder',
        createdAt: '2023-08-03',
        path: img04,
        status: true,
        commentsStatus: true,
        owner: 'user345',
        voters: ['user123', 'user567']
    },
    {
        _id: '4',
        category: CATEGORY.SOCIAL,
        contextPic: 'Instagram',
        createdAt: '2023-08-04',
        path: img02,
        status: false,
        commentsStatus: null,
        owner: 'user456',
        voters: ['user123']
    },
    {
        _id: '5',
        category: CATEGORY.BUSINESS,
        contextPic: 'Work Interview',
        createdAt: '2023-08-05',
        path: img03,
        status: true,
        commentsStatus: undefined,
        owner: null,
        voters: ['user234', 'user345', 'user567', 'user678']
    }
];