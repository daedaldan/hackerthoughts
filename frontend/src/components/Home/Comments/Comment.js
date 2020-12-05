import React from 'react';

export default function Comment(props) {
  return (
      <div>
        <h2>{props.comment.title}</h2>
        {/* comment info retrieved from RSS feed is already in HTML format, so props.comment.comment is
            directly set into div element */}
        <div dangerouslySetInnerHTML={{__html: props.comment.comment}}></div>
        <a href={props.comment.link}>See more</a>
      </div>
  );
}
