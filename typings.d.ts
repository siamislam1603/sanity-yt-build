export interface Post{
    _id:string;
    _createdAt:string;
    title:string;
    author:{
        name:string;
        image:string;
    };
    description:string;
    mainImage:{
        asset:{
            url:string;
        };
    };
    slug:{
        current:string;
    }
    body:[object];
    comment:[Comment];
}

export interface Comment{
    _id:string,
    _createdAt:string,
    comment:string,
    email:string,
    name:string,
}