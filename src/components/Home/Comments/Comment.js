import React from 'react';

import { Card } from 'antd';

export default function Comment(props) {
  return (
      <div className="comment">
        <Card title={props.comment.title}>
          {/* comment info retrieved from RSS feed is already in HTML format, so props.comment.comment is
              directly set into div element */}
          <div dangerouslySetInnerHTML={{__html: props.comment.comment}}></div>
          <a href={props.comment.link}>See more</a>
        </Card>
      </div>
  );
}
