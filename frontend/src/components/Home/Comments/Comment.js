import React from 'react';

export default function Comment(props) {
  return (
      <div>
        <h2>{props.comment.title}</h2>
        <p>{props.comment.info}</p>
        <a href={props.comment.link}>See more</a>
      </div>
  );
}
