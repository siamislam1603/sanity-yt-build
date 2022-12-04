export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{type: 'post'}],
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'text',
      },
      {
        name: 'approved',
        title: 'Approved',
        type: 'boolean',
        description:"Comment's won't show on the site without approval."
      },
    ],
  }
  