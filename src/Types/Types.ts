export type DocumentType = {
  _id: any;
  _creationTime: number;
  title: string;
  owner: string;
  isPublished: boolean;
  Content_Ref: any;
  authorised: boolean;
};

export type ContentType = {
  _id: any;
  _creationTime: number;
  content: string;
  authorised: boolean;
};
export type NotAuthorisedType = {
  authorised: boolean;
};
