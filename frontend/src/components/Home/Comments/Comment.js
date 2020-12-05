import React from 'react';

export default function Comment(props) {
  return (
      <div>
        <h2>{props.comment.title}</h2>
        <div dangerouslySetInnerHTML={{__html: props.comment.comment}}></div>
        <a href={props.comment.link}>See more</a>
      </div>
  );
}
