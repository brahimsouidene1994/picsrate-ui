export default interface PictureObject{
    _id:string | undefined | null,
    category : string| undefined | null,
    contextPic: string,
    createdAt : string,
    path: string|undefined ,
    status : boolean,
    commentsStatus : boolean|undefined | null,
    owner : string|undefined | null,
    voters : Array<string>|undefined | null
  }
  