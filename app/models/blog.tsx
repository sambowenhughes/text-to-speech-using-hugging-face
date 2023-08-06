interface CreateBlogRequest{
    model:string,
    title:string,
    tone:string
}

interface Blog{
    meta:{
        model:string,
        tone:string,
    }
    title:string,
    content:string
}