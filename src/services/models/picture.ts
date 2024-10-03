export default interface PictureObject{
    _id:string |undefined | null,
    category : string|undefined | null,
    contextPic: string|undefined | null,
    createdAt : string,
    path: string|undefined ,
    status : boolean|undefined | null,
    commentsStatus : boolean|undefined | null,
    owner : string|undefined | null,
    voters : Array<string>|undefined | null
  }
  