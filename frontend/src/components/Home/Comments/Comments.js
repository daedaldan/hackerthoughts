import React from 'react';

import Comment from './Comment.js';

export default function Comments(props) {
  if (props.comments.length > 0) {
    const commentsList = props.comments.map((commentItem) =>
      <Comment comment={commentItem}/>
    );

    return (
      <div>
        <h1>Here are some comments we recommend.</h1>
        {commentsList}
      </div>
    );
  } else {
    return (
      <div>
        <p>There are no comments matching your interests right now!
          Please type in more interests, or come back another time to try again.</p>
      </div>
    );
  }
}
