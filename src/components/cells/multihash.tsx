import React, { Fragment } from 'react';
import DOMPurify from 'dompurify';
import 'twin.macro';

interface MultihashCellProps {
  value: string;
  formattedValue: string;
  rawValue: string;
}

export function MultihashCell(props: MultihashCellProps) {
  return (
    <Fragment>
      <a href={`ipfs://${props.rawValue}`} target="_blank">
        <div
          tw="truncate"
          title={props.rawValue}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.formattedValue),
          }}
        />
      </a>
    </Fragment>
  );
}
