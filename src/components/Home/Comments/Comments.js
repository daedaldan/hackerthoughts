import React from 'react';

import Comment from './Comment.js';

export default function Comments(props) {
  if (props.comments.length > 0) {
    // create list of user's recommended comments and populate it with Comment components
    let commentsList = props.comments.map((commentItem, index) =>
      <Comment comment={commentItem} key={index}/>
    );


    // show comments
    return (
      <div>
        <h1>Here are some comments we recommend.</h1>
        {commentsList}
      </div>
    );
  } else {
    // if user currently has no comments, or comments have not been retrieved yet, show text instead
    return (
      <div>
        <p>There are no comments matching your interests right now!
          Please type in more interests, or come back another time to try again.</p>
      </div>
    );
  }
}
